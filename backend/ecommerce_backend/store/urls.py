from django.urls import path, include
from rest_framework import routers
from .views import register_user, ProductSearchView, ProductViewSet, UserDetailView, MarketListView, MarketListDetailView, LastMarketListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
# router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('market-lists/', MarketListView.as_view(), name='market-list'),
    path('market-lists/<int:pk>/', MarketListDetailView.as_view(), name='market-list-detail'),
    path('market-lists/last/', LastMarketListView.as_view(), name='last-market-list'),
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),  # Updated to use CBV


]
