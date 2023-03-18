from django.apps import apps
from django.conf import settings
from django.db import transaction
from rest_framework import serializers
from teams.serializers import TeamSerializer

from .helpers.defaulters import add_default_bets
from .helpers.history import insert_to_history
from .helpers.settlement import settle_bets
from .helpers.teams import update_teams
from .models import Match

Team = apps.get_model("teams", "Team")


class MatchSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()
    slug = serializers.ReadOnlyField()

    class Meta:
        model = Match
        fields = ("id", "team1", "team2", "num", "status", "slug")


class MatchAllInfoSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()
    winner = TeamSerializer()
    bat_first = TeamSerializer()
    result = serializers.ReadOnlyField()
    slug = serializers.ReadOnlyField()
    scheduled = serializers.ReadOnlyField()
    started = serializers.ReadOnlyField()
    entry_cutoff_passed = serializers.ReadOnlyField()
    double_cutoff_passed = serializers.ReadOnlyField()
    form = serializers.ReadOnlyField()

    class Meta:
        model = Match
        fields = "__all__"


class MatchUpdateSerializer(serializers.ModelSerializer):
    bat_first = TeamSerializer(read_only=True)
    bfirst = serializers.CharField(
        write_only=True, required=False, allow_blank=True)

    winner = TeamSerializer(read_only=True)
    wTeam = serializers.CharField(
        write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Match
        fields = ("bfirst", "bat_first", "t1score",
                  "t2score", "wTeam", "winner", "status")
        extra_kwargs = {
            "bfirst": {"required": False},
            "t1score": {"required": False},
            "t2score": {"required": False},
            "wTeam": {"required": False},
            "status": {"required": False},
        }

    def validate_bfirst(self, value):
        if value:
            team = Team.objects.get_object_or_none(shortname=value)
            if team not in self.instance.teams:
                raise serializers.ValidationError("Invalid Batting first team")
            else:
                return team

    def validate_wTeam(self, value):
        if value:
            team = Team.objects.get_object_or_none(shortname=value)
            if team not in self.instance.teams:
                raise serializers.ValidationError("Invalid Winner team")
            else:
                return team

    def validate_status(self, value):
        if value:
            if value not in settings.MATCH_STATUS:
                raise serializers.ValidationError("Invalid Status")
            return value

    def validate_score(self, score, team):
        if score:
            if 'runs' not in score.keys():
                raise serializers.ValidationError(
                    f"Team {team} Score - missing runs")
            if 'wickets' not in score.keys():
                raise serializers.ValidationError(
                    f"Team {team} Score - missing wickets")
            if 'overs' not in score.keys():
                raise serializers.ValidationError(
                    f"Team {team} Score - missing overs")
            if len(score.keys()) != 3:
                raise serializers.ValidationError(
                    f"Invalid Team {team} Score. Extra details")

            for key, value in score.items():
                if key == 'runs' and not isinstance(value, int):
                    raise serializers.ValidationError(
                        f"Invalid Team {team} Score runs")
                if key == 'wickets' and (not isinstance(value, int) or not 0 <= value <= 10):
                    raise serializers.ValidationError(
                        f"Invalid Team {team} Score wickets")
                if key == 'overs' and (not (isinstance(value, int) or isinstance(value, float)) or not 0 <= value <= 20):
                    raise serializers.ValidationError(
                        f"Invalid Team {team} Score overs")
            return score

    def validate_t1score(self, value):
        return self.validate_score(value, team=1)

    def validate_t2score(self, value):
        return self.validate_score(value, team=2)

    def all_details_present(self, attrs, completed=False):
        bat_first = attrs.get("bfirst", self.instance.bat_first)
        t1score = attrs.get("t1score", self.instance.t1score)
        t2score = attrs.get("t2score", self.instance.t2score)
        winner = attrs.get("wTeam", self.instance.winner)
        status = attrs.get("status", self.instance.status)
        return status == settings.COMPLETED and winner and bat_first and t1score and t2score

    def validate(self, attrs):
        winner = attrs.get("wTeam", self.instance.winner)
        status = attrs.get("status", self.instance.status)

        if winner and self.instance.status == settings.COMPLETED:
            raise serializers.ValidationError(
                {"winner": "Winner already updated"})

        if (winner or status == settings.COMPLETED) and not self.all_details_present(attrs):
            raise serializers.ValidationError(
                "Match cannot be completed without all details")

        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        wTeam = validated_data.pop('wTeam', None)
        bfirst = validated_data.pop('bfirst', None)
        status = validated_data.get('status', None)

        for field, value in validated_data.items():
            setattr(instance, field, value)

        if wTeam:
            instance.winner = wTeam

        if bfirst:
            instance.bat_first = bfirst

        instance.save()

        if bfirst or status:
            add_default_bets(instance)

        if instance.status != settings.SCHEDULED:
            settle_bets(instance)
            insert_to_history(instance)
            if instance.type == settings.LEAGUE:
                update_teams(instance)

        return instance
