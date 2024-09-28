from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

# Product model
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Kachabajar', 'Kachabajar'),
        ('Home Care', 'Home Care'),
        ('Frozen Foods', 'Frozen Foods'),
        ('Dairy', 'Dairy'),
        ('Fruits', 'Fruits'),
        ('Snacks', 'Snacks'),
        ('Tea & Coffee', 'Tea & Coffee'),
        ('Personal Care', 'Personal Care'),
        ('Sauce & Pickles', 'Sauce & Pickles'),
    ]

    LABEL_CHOICES = {
        'Kachabajar': ['Fish', 'Vegetables', 'Meat', 'Rice', 'Spices & Mixes', 'Cooking Oil & Ghee', 'Eggs', 'Atta/Maida', 'Salt & Sugar', 'Daal/Chhola', 'Baking Needs', 'Shemai/Suji'],
        'Home Care': ['Cleaning Products', 'Tissue & Napkins'],
        'Frozen Foods': ['Yogurt', 'Cheese & Paneer', 'Butter & Sour cream', 'Borhani/Laban/Lassi', 'Liquid & UHT Milk/Chocolate Milk', 'Powder Milk & Cream'],
        'Dairy': ['Yogurt', 'Cheese & Paneer', 'Butter & Sour cream', 'Borhani/Laban/Lassi', 'Liquid & UHT Milk/Chocolate Milk', 'Powder Milk & Cream'],
        'Fruits': ['Dry Fruits', 'Regular Fruits'],
        'Snacks': ['Chips & Crackers', 'Nuts', 'Instant Food', 'Breakfast Cereals', 'Biscuits', 'Noodles & Pasta', 'Bread & Buns'],
        'Tea & Coffee': ['Tea', 'Coffee'],
        'Personal Care': ['Bath & Body'],
        'Sauce & Pickles': ['Salad Dressings', 'Pickle', 'Honey', 'Jam & Jelly', 'Sauce', 'Spreads & Mayonnaise'],
    }

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    label = models.CharField(max_length=50)
    image = models.URLField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    numReviews = models.IntegerField(default=0)
    countInStock = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if self.category in self.LABEL_CHOICES:
            if self.label not in self.LABEL_CHOICES[self.category]:
                raise ValidationError({'label': f'Invalid label for category {self.category}'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

# Order model with a foreign key to User
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.user.username} for {self.product.name} on {self.created_at}"

class MarketList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_items = models.IntegerField()

    def __str__(self):
        return f"Market List for {self.user.username} on {self.date}"

class MarketListItem(models.Model):
    market_list = models.ForeignKey(MarketList, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.market_list}"
