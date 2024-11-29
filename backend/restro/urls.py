from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # User Authentication URLs
    path('register/', UserRegisterAPIView.as_view(), name='register-user'),
    path('login/', UserLoginAPIView.as_view(), name='login-user'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout-user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    path('user/', UserInfoAPIView.as_view(), name='user-info'),
    
    # Menu URLs
    path('menu/', MenuListCreateAPIView.as_view(), name='menu-list-create'),
    path('menu/<int:pk>/', MenuDetailAPIView.as_view(), name='menu-detail'),
    
    # Feedback URLs
    path('feedback/', FeedbackListCreateAPIView.as_view(), name='feedback-list-create'),
    path('feedback/<int:pk>/', FeedbackDetailAPIView.as_view(), name='feedback-detail'),
    
    # Order URLs
    path('order/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('order/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('order/update/<int:pk>/', OrderUpdateAPIView.as_view(), name='order-update'),  # Optional, for updating order
]


from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)