from django.db import models
from django.contrib.auth.models import User  # Import the User model

# Product model
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()

    def __str__(self):
        return self.name

# Order model with a foreign key to User
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Associate order with a user
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.user.username} for {self.product.name} on {self.created_at}"
