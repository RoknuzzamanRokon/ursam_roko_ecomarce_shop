from django.db.models import Q
from rest_framework import generics, serializers, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, Order
from .serializers import ProductSerializer, UserSerializer, ProductSearchSerializer
from rest_framework import generics
from .models import User
from rest_framework.exceptions import NotFound


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