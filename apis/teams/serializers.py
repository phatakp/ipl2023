from rest_framework import serializers

from .models import Team


class TeamAllInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ("id", "longname", "shortname",)
