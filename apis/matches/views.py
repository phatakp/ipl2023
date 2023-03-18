from rest_framework import permissions
from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     RetrieveUpdateAPIView)
from rest_framework.response import Response

from .helpers.probability import calc_win_prob
from .models import Match
from .permissions import IsIPLAdminorReadOnly
from .serializers import MatchAllInfoSerializer, MatchUpdateSerializer


# Create your views here.
class MatchListView(ListAPIView):
    model = Match
    serializer_class = MatchAllInfoSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Match.objects.all()


class MatchRetrieveUpdateView(RetrieveUpdateAPIView):
    model = Match
    permission_classes = [IsIPLAdminorReadOnly]
    queryset = Match.objects.all()
    lookup_field = "num"

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return MatchAllInfoSerializer
        return MatchUpdateSerializer


class MatchWinProbabilityView(RetrieveAPIView):
    model = Match
    permission_classes = [permissions.AllowAny]
    queryset = Match.objects.all()
    lookup_field = "num"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        prob = calc_win_prob(instance)
        return Response(prob)
