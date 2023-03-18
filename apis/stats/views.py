
from django.apps import apps
from django.db.models import Q
from rest_framework import generics, permissions

from .models import MatchHistory, TeamStats
from .serializers import MatchHistorySerializer, TeamStatsSerializer

Match = apps.get_model('matches', "Match")

# Create your views here.


class TeamStatsListView(generics.ListAPIView):
    model = TeamStats
    permission_classes = [permissions.AllowAny]
    serializer_class = TeamStatsSerializer

    def get_queryset(self):
        match = Match.objects.get_object_or_none(
            num=self.kwargs.get('matchNum'))
        return TeamStats.objects \
            .filter(
                Q(team1=match.team1, team2=match.team2) |
                Q(team1=match.team1, team2__isnull=True) |
                Q(team1=match.team2, team2=match.team1) |
                Q(team1=match.team2, team2__isnull=True))


class MatchHistoryListView(generics.ListAPIView):
    model = MatchHistory
    permission_classes = [permissions.AllowAny]
    serializer_class = MatchHistorySerializer

    def get_queryset(self):
        return MatchHistory.objects \
            .filter(
                Q(team1__shortname=self.kwargs.get('team1'), team2__shortname=self.kwargs.get('team2')) |
                Q(team1__shortname=self.kwargs.get('team2'), team2__shortname=self.kwargs.get('team1'))).order_by('-date')[:5]
