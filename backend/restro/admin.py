from django.contrib import admin
from .models import CustomUser, Order, Feedback, Menu
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin

# Register CustomUser
@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    
    list_display = ('email', 'username', 'is_staff', 'is_active')  # Moved here
    search_fields = ('email', 'username')  # Moved here

# Register Menu model (assuming you want to manage items)
@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'image')  # Added 'image' field
    search_fields = ('name', 'category')

# Register Order model with custom display options
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at', 'total_price')
    list_filter = ('created_at', 'user')
    search_fields = ('user__email', 'id')

# Register Feedback model with custom display options
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('menu_item', 'user', 'rating', 'comment', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('menu_item__name', 'user__email', 'comment')
