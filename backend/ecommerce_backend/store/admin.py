from django.contrib import admin
from .models import Product, Order, MarketList, MarketListItem

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(MarketList)
admin.site.register(MarketListItem)