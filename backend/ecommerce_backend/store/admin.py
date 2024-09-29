from django import forms
from django.contrib import admin
from .models import Product, Order, MarketList, MarketListItem

class ProductAdminForm(forms.ModelForm):
    label = forms.ChoiceField(choices=[])

    class Meta:
        model = Product
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'category' in self.data:
            category = self.data['category']
            self.fields['label'].choices = [(label, label) for label in Product.LABEL_CHOICES.get(category, [])]
        elif self.instance.pk:
            self.fields['label'].choices = [(label, label) for label in Product.LABEL_CHOICES.get(self.instance.category, [])]

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ('name', 'category', 'label', 'price')
    list_filter = ('category',)

    class Media:
        js = ('admin/js/product_admin.js',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Order)
admin.site.register(MarketList)
admin.site.register(MarketListItem)