from django.conf import settings
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    UpdateAPIView,
)
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from .models import Prediction
from .permissions import IsOwnerorAuthenticatedOnly
from .serializers import PredictionAllInfoSerializer, PredictionDoubleSerializer


# Create your views here.
class PredictionListCreateView(ListCreateAPIView):
    model = Prediction
    serializer_class = PredictionAllInfoSerializer
    permission_classes = [IsOwnerorAuthenticatedOnly]

    def get_serializer_context(self):
        self.request.data['user'] = self.request.user
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(data={"type": "client_error",
                                  "errors": [{"code": "",
                                             "detail": "Not Authorized",
                                              "attr": ""}]},
                            status=HTTP_401_UNAUTHORIZED)
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(data={"type": "client_error",
                                  "errors": [{"code": "",
                                             "detail": "Not Authorized",
                                              "attr": ""}]},
                            status=HTTP_401_UNAUTHORIZED)
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        qs = Prediction.objects.all()
        try:
            matchNum = self.request.query_params.get("match")
            if matchNum:
                qs = qs.filter(match__num=matchNum)
                return qs
            else:
                raise ValueError
        except ValueError:
            return qs.filter(user=self.request.user)


# Create your views here.


class PredictionForMatchForUserView(RetrieveAPIView):
    model = Prediction
    serializer_class = PredictionAllInfoSerializer
    permission_classes = [IsOwnerorAuthenticatedOnly]

    def get_object(self):
        try:
            matchNum = self.kwargs.get("match")
            if matchNum:
                return Prediction.objects.get_object_or_none(match__num=matchNum,
                                                             user=self.request.user,
                                                             status=settings.PLACED)
            else:
                raise ValueError
        except ValueError:
            return None


class PredictionModifyView(RetrieveUpdateAPIView):
    model = Prediction
    serializer_class = PredictionAllInfoSerializer
    permission_classes = [IsOwnerorAuthenticatedOnly]
    lookup_field = 'id'

    def get_queryset(self):
        return Prediction.objects.filter(user=self.request.user)


class PredictionDoubleView(UpdateAPIView):
    model = Prediction
    serializer_class = PredictionDoubleSerializer
    permission_classes = [IsOwnerorAuthenticatedOnly]
    lookup_field = 'id'

    def get_queryset(self):
        return Prediction.objects.filter(user=self.request.user)
