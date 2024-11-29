from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
# Custom user model
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

# Menu model
class Menu(models.Model):
    CATEGORY_CHOICES = [
        ('main_course', 'Main Course'),
        ('beverage', 'Beverage'),
        ('salad', 'Salad'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='main_course')
    image = models.ImageField(upload_to='menu_images/', blank=True, null=True)  # Add this line
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

# Feedback model
class Feedback(models.Model):
    menu_item = models.ForeignKey(Menu, related_name='feedbacks', on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name='feedbacks', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])  # Rating between 1 and 5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.menu_item.name} by {self.user.email}"

# Order model (you need this one as well)
class Order(models.Model):
    user = models.ForeignKey(CustomUser, related_name='orders', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.ManyToManyField(Menu, blank=True)
    feedback = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user.email}"
