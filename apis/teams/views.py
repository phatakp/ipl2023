from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .models import Team
from .serializers import *


# Create your views here.
class TeamListCreateView(ListAPIView):
    model = Team
    serializer_class = TeamAllInfoSerializer
    permission_classes = [AllowAny]
    queryset = Team.objects.filter(active=True)


class TeamDetailView(RetrieveAPIView):
    model = Team
    serializer_class = TeamAllInfoSerializer
    permission_classes = [AllowAny]
    queryset = Team.objects.filter(active=True)
    lookup_field = "shortname"
