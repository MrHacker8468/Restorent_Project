# serializers.py
from .models import CustomUser, Menu, Feedback, Order
from rest_framework import serializers
from django.contrib.auth import authenticate

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class UserRegisterSerializer(serializers.ModelSerializer):
    password_1 = serializers.CharField(write_only=True)
    password_2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password_1', 'password_2')
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password_1'] != attrs['password_2']:
            raise serializers.ValidationError("Passwords do not match")
        
        password = attrs.get('password_1', "")
        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password_1')
        validated_data.pop('password_2')
        return CustomUser.objects.create_user(**validated_data, password=password)

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=255)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid email or password")

class MenuSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)  # Add image field

    class Meta:
        model = Menu
        fields = ('id', 'name', 'description', 'price', 'category', 'created_at', 'image')  # Include image in the fields

# Feedback Serializer
class FeedbackSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)  # Show user details as nested data
    menu_item = MenuSerializer(read_only=True)  # Show menu item details as nested data

    class Meta:
        model = Feedback
        fields = ('id', 'user', 'menu_item', 'rating', 'comment', 'created_at')

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)  # Show user details as nested data
    items = MenuSerializer(many=True, read_only=True)  # Show items in the order as nested data
    feedback = FeedbackSerializer(many=True, read_only=True)  # Show feedback for the order

    class Meta:
        model = Order
        fields = ('id', 'user', 'created_at', 'total_price', 'items', 'feedback')
