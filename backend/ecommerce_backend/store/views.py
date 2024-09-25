from django.db.models import Q
from django.http import JsonResponse

from rest_framework import generics, serializers, viewsets, status, permissions
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.exceptions import NotFound


from .models import Product, Order
from .serializers import ProductSerializer, UserSerializer, ProductSearchSerializer

from django.contrib.auth.models import User


from .models import MarketList, MarketListItem
from .serializers import MarketListSerializer, MarketListItemSerializer



from .utils import get_braintree_gateway



# payment/utils.py or directly in views.py




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image']

class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSearchSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', None)
        queryset = Product.objects.all()
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )
        return queryset

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def destroy(self, request, *args, **pk):
        product = self.get_object()
        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return self.queryset.filter(user=self.request.user)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User created successfully', 'user_id': user.id}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'  # This specifies which field to use for lookup, by default it's 'pk'

    def get(self, request, *args, **kwargs):
        try:
            user = self.get_object()  # This fetches the user based on 'id'
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise NotFound({"error": "User not found"})
        








class MarketListView(generics.ListCreateAPIView):
    serializer_class = MarketListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MarketList.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        market_list = serializer.save(user=self.request.user)
        item_data = self.request.data.get('items', [])
        for item in item_data:
            MarketListItem.objects.create(
                market_list=market_list,
                product=item.get('product'),
                quantity=item.get('quantity'),
                price=item.get('price')
            )

class MarketListDetailView(generics.RetrieveAPIView):
    serializer_class = MarketListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MarketList.objects.filter(user=self.request.user)

class LastMarketListView(generics.RetrieveAPIView):
    serializer_class = MarketListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return MarketList.objects.filter(user=self.request.user).order_by('-date').first()
    







def create_payment(request):
    gateway = get_braintree_gateway()
    amount = "10.00"  # Set this dynamically based on cart contents or user input

    if request.method == "POST":
        nonce = request.POST.get('payment_method_nonce')
        result = gateway.transaction.sale({
            "amount": amount,
            "payment_method_nonce": nonce,
            "options": {
                "submit_for_settlement": True
            }
        })

        if result.is_success:
            return JsonResponse({"success": True, "transaction": {"id": result.transaction.id, "amount": result.transaction.amount}})
        else:
            return JsonResponse({"success": False, "error": result.message})

    else:
        client_token = gateway.client_token.generate()
        return JsonResponse({"client_token": client_token})    