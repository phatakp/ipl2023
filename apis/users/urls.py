from django.urls import path

from .views import (LoadUserView, LoginView, LogoutView, RefreshTokenView,
                    RegisterView, UserChgPwdView, UserListView,
                    UserResetPwdView, UserUpdateAmountView,
                    UserValidateEmailView, UserWinnerUpdateView)

app_name = "users"

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/refresh/", RefreshTokenView.as_view(), name="refresh_token"),
    path("token/logout/", LogoutView.as_view(), name="logout"),
    path("token/", LoginView.as_view(), name="login"),
    path("users/", UserListView.as_view(), name="users_list"),
    path("user/", LoadUserView.as_view(), name="user_detail"),
    path('change-password/', UserChgPwdView.as_view()),
    path('reset-password/<int:id>/', UserResetPwdView.as_view()),
    path('validate/<str:email>/', UserValidateEmailView.as_view()),
    path('change-winner/', UserWinnerUpdateView.as_view()),
    path('update-balance/<int:id>/', UserUpdateAmountView.as_view()),
    path('change-winner/', UserWinnerUpdateView.as_view()),
    path('paid/<str:email>/', UserUpdateAmountView.as_view()),
]
