from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models, transaction
from matches.serializers import MatchSerializer
from rest_framework import serializers
from teams.serializers import TeamSerializer
from users.serializers import UserSerializer

from .models import Prediction

User = get_user_model()
Team = apps.get_model("teams", "Team")
Match = apps.get_model("matches", "Match")


class PredictionAllInfoSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    teamName = serializers.CharField(write_only=True)

    match = MatchSerializer(read_only=True)
    matchNum = serializers.CharField(write_only=True)

    user = UserSerializer(read_only=True)

    class Meta:
        model = Prediction
        fields = "__all__"

    def validate_matchNum(self, value):
        match = Match.objects.get_object_or_none(num=value)
        if not match:
            raise serializers.ValidationError("Invalid Match value")
        return match

    def validate_teamName(self, value):
        team = Team.objects.get_object_or_none(shortname=value)
        if not team:
            raise serializers.ValidationError("Invalid Team value")
        return team

    def validate_amount(self, value):
        if not value or not isinstance(value, int) or int(value) <= 0:
            raise serializers.ValidationError("Invalid Amount")
        return value

    def validate(self, attrs):
        user = self.context.get("request").user
        match = attrs.get("matchNum", None)
        team = attrs.get("teamName", None)
        amount = attrs.get("amount")
        prediction = Prediction.objects.filter(user=user, match=match).exists()

        if team not in match.teams:
            raise serializers.ValidationError({"team": "Invalid Team"})

        # Updating prediction
        if self.instance:
            if self.instance.user != user:
                raise serializers.ValidationError({"user": "Not authorized"})

            # After match started
            if match.started:
                raise serializers.ValidationError(
                    "Cutoff passed for prediction")

            # Amount should be increased
            if self.instance.team == team and amount <= self.instance.amount:
                raise serializers.ValidationError(
                    {"amount": f"Minimum stake required: {self.instance.amount+1}"}
                )

            # For team change amount should be doubled
            if self.instance.team != team and amount < self.instance.amount * 2:
                raise serializers.ValidationError(
                    {"amount": f"Minimum stake required: {self.instance.amount * 2}"}
                )
        else:
            # First time prediction after cutoff
            if match.entry_cutoff_passed:
                raise serializers.ValidationError(
                    "Cutoff passed for prediction")

            # Adding prediction when already present
            if prediction:
                raise serializers.ValidationError("Prediction already present")

        # Not minimum amount
        if amount < match.min_bet:
            raise serializers.ValidationError(
                {"amount": f"Minimum stake for match: {match.min_bet}"}
            )

        return attrs

    def create(self, validated_data):
        user = self.context.get('request').user
        match = validated_data.pop('matchNum', None)
        team = validated_data.pop('teamName', None)
        validated_data.pop('double', None)
        instance = Prediction.objects.create(
            user=user, match=match, team=team, **validated_data)
        return instance

    def update(self, instance, validated_data):
        validated_data.pop('matchNum', None)
        team = validated_data.pop('teamName', None)
        validated_data.pop('double', None)

        if team:
            instance.team = team

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class PredictionDoubleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ('double',)

    @transaction.atomic
    def update(self, instance, validated_data):
        match = instance.match
        user = instance.user

        if not match.started:
            raise serializers.ValidationError(
                'Cannot play double before match starts')

        if match.double_cutoff_passed:
            raise serializers.ValidationError(
                'Cutoff passed for double play')

        if match.double:
            raise serializers.ValidationError(
                'Double already exists for this match')

        if match.type != settings.LEAGUE:
            raise serializers.ValidationError(
                'Double only applicable for league matches')

        if user.doubles <= 0:
            raise serializers.ValidationError(
                'No more double cards left')

        instance.double = True
        instance.amount = models.F('amount') * 2
        instance.save()

        match.double = True
        match.save()

        user.doubles = models.F('doubles') - 1
        user.save()

        return instance
