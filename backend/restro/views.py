from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

# User Authentication Views
class UserRegisterAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['token'] = {
            'refresh': str(token),
            'access': str(token.access_token)
        }
        return Response(data, status=status.HTTP_201_CREATED)
    
class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # You can directly serialize the user here
        user_data = CustomUserSerializer(user).data
        token = RefreshToken.for_user(user)
        user_data['token'] = {
            'refresh': str(token),
            'access': str(token.access_token)
        }
        return Response(user_data, status=status.HTTP_200_OK)
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh', None)
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid or already blacklisted token"}, status=status.HTTP_400_BAD_REQUEST)

        
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer
    
    def get_object(self):
        return self.request.user

# Menu Views
class MenuListCreateAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MenuSerializer
    
    def get_queryset(self):
        return Menu.objects.all()  # You can add filtering or ordering logic here if needed
    
    def perform_create(self, serializer):
        serializer.save()  # You can add custom logic to save menu items

class MenuDetailAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()

# Feedback Views
class FeedbackListCreateAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FeedbackSerializer
    
    def get_queryset(self):
        return Feedback.objects.all()  # You could filter by `menu_item` or `user` if needed
    
    def perform_create(self, serializer):
        serializer.save()  # You can add custom logic to save feedback

class FeedbackDetailAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

# Order Views
class OrderListCreateAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')  # Ordering by creation time
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Save the order with the logged-in user

class OrderDetailAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

# Optional: Update Order Status or other fields (if needed)
class OrderUpdateAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
