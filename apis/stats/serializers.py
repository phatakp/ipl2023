from rest_framework import serializers
from teams.serializers import TeamSerializer

from .models import MatchHistory, TeamStats


class MatchHistorySerializer(serializers.ModelSerializer):
    team1 = TeamSerializer(many=False, read_only=True)
    team2 = TeamSerializer(many=False, read_only=True)
    winner = TeamSerializer(many=False, read_only=True)
    bat_first = TeamSerializer(many=False, read_only=True)
    slug = serializers.ReadOnlyField()
    result = serializers.ReadOnlyField()

    class Meta:
        model = MatchHistory
        fields = '__all__'


class TeamStatsSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer(many=False, read_only=True)
    team2 = TeamSerializer(many=False, read_only=True)
    played = serializers.ReadOnlyField()

    class Meta:
        model = TeamStats
        fields = '__all__'
