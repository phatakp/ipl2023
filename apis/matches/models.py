from datetime import timedelta

import pytz
from django.conf import settings
from django.db import models
from django.utils import timezone

from .managers import MatchManager


# Create your models here.
class Match(models.Model):
    num = models.PositiveSmallIntegerField()
    date = models.DateTimeField()
    type = models.CharField(
        max_length=20,
        choices=[(m, m.capitalize()) for m in settings.MATCH_TYPES],
        default=settings.LEAGUE,
    )
    team1 = models.ForeignKey(
        "teams.Team",
        related_name="team1_matches",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    team2 = models.ForeignKey(
        "teams.Team",
        related_name="team2_matches",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    venue = models.CharField(max_length=200)
    min_bet = models.PositiveSmallIntegerField(
        default=settings.MATCH_MIN_STAKE)
    status = models.CharField(
        max_length=20,
        choices=[(s, s.capitalize()) for s in settings.MATCH_STATUS],
        default=settings.SCHEDULED,
        db_index=True,
    )
    bat_first = models.ForeignKey(
        "teams.Team",
        related_name="bat_first_teams",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    winner = models.ForeignKey(
        "teams.Team",
        related_name="winner_teams",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    t1score = models.JSONField(null=True, blank=True)
    t2score = models.JSONField(null=True, blank=True)
    double = models.BooleanField(default=False)

    objects = MatchManager()

    class Meta:
        verbose_name_plural = "Matches"
        ordering = ("num",)

    def __str__(self) -> str:
        return self.slug

    @property
    def teams(self):
        return (self.team1, self.team2)

    @property
    def scheduled(self):
        return self.status == settings.SCHEDULED

    @property
    def completed(self):
        return self.status == settings.COMPLETED

    @property
    def abandoned(self):
        return self.status == settings.ABANDONED

    @property
    def started(self):
        return timezone.localtime() >= timezone.localtime(self.date, pytz.timezone(settings.TIME_ZONE))

    @property
    def entry_cutoff_passed(self):
        return timezone.localtime() >= timezone.localtime(self.date, pytz.timezone(settings.TIME_ZONE)) - timedelta(minutes=30)

    @property
    def double_cutoff_passed(self):
        return timezone.localtime() >= timezone.localtime(self.date, pytz.timezone(settings.TIME_ZONE)) + timedelta(minutes=60)

    @property
    def slug(self):
        if self.team1 and self.team2:
            return f"{str(self.team1)}vs{str(self.team2)}-{self.get_type_display()}"
        else:
            return f"TBCvsTBC-{self.get_type_display()}"

    @property
    def form(self):
        return {'team1': self.team1.form,
                'team2': self.team2.form}

    @property
    def result(self):
        if (
            not self.scheduled
            and self.bat_first
            and self.winner
            and self.t1score
            and self.t2score
        ):
            t1score = self.t1score
            t2score = self.t2score

            if t1score["runs"] == t2score["runs"]:
                return f"{self.winner.longname} won by Super Over"

            if self.winner == self.bat_first:
                return f"{self.winner.longname} won by {abs(t1score['runs']-t2score['runs'])} runs"
            else:
                if self.winner == self.team1:
                    return f"{self.winner.longname} won by {abs(10-t1score['wickets'])} wickets"
                else:
                    return f"{self.winner.longname} won by {abs(10-t2score['wickets'])} wickets"
        elif self.scheduled and self.started:
            return "Match in Progress"
        else:
            return f"Match {self.get_status_display()}"
