from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, MarketList, MarketListItem



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image']


# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = '__all__'


# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = '__all__'
#         read_only_fields = ['user']

#     def create(self, validated_data):
#         user = self.context['request'].user
#         return Order.objects.create(user=user, **validated_data)


class MarketListItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = MarketListItem
        fields = ['id', 'product_name', 'quantity', 'price']

class MarketListSerializer(serializers.ModelSerializer):
    items = MarketListItemSerializer(many=True, read_only=True)

    class Meta:
        model = MarketList
        fields = ['id', 'date', 'total_amount', 'total_items', 'items']