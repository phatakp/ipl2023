import datetime as dt

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken as RefreshTokenModel
from rest_framework_simplejwt.views import TokenViewBase

from . import serializers


class TokenViewBaseWithCookie(TokenViewBase):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        resp = Response(serializer.validated_data, status=status.HTTP_200_OK)

        # TODO: this should probably be pulled from the token exp
        expiration = dt.datetime.utcnow() + jwt_settings.REFRESH_TOKEN_LIFETIME

        resp.set_cookie(
            settings.JWT_COOKIE_NAME,
            serializer.validated_data["refresh"],
            expires=expiration,
            secure=settings.JWT_COOKIE_SECURE,
            httponly=True,
            samesite=settings.JWT_COOKIE_SAMESITE,
        )

        return resp


class RefreshTokenView(TokenViewBaseWithCookie):
    serializer_class = serializers.TokenRefreshSerializer


class LoginView(TokenViewBaseWithCookie):
    serializer_class = serializers.TokenObtainPairSerializer


class LogoutView(APIView):
    def post(self, *args, **kwargs):
        resp = Response({})
        token = self.request.COOKIES.get(settings.JWT_COOKIE_NAME)
        refresh = RefreshTokenModel(token)
        refresh.blacklist()
        resp.delete_cookie(settings.JWT_COOKIE_NAME)
        return resp


class RegisterView(generics.CreateAPIView):
    serializer_class = serializers.UserAllInfoSerializer
    permission_classes = (permissions.AllowAny,)


class UserListView(generics.ListAPIView):
    serializer_class = serializers.UserAllInfoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.exclude(is_staff=True)


class LoadUserView(generics.RetrieveAPIView):
    serializer_class = serializers.UserAllInfoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.exclude(is_staff=True)

    def get_object(self):
        return self.request.user


class UserChgPwdView(generics.UpdateAPIView):
    serializer_class = serializers.ChgPwdSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.exclude(is_staff=True)

    def get_object(self):
        return self.request.user


class UserResetPwdView(generics.UpdateAPIView):
    serializer_class = serializers.ResetPwdSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.exclude(is_staff=True)
    lookup_field = 'id'


class UserValidateEmailView(generics.RetrieveAPIView):
    serializer_class = serializers.UserValidateEmailSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.exclude(is_staff=True)
    lookup_field = 'email'


class UserUpdateAmountView(generics.UpdateAPIView):
    serializer_class = serializers.UserUpdateAmountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.exclude(is_staff=True)
    lookup_field = 'email'


class UserWinnerUpdateView(generics.UpdateAPIView):
    serializer_class = serializers.UserWinnerUpdateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.exclude(is_staff=True)

    def get_object(self):
        return self.request.user
