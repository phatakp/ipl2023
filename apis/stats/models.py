from django.conf import settings
from django.db import models

from .managers import *

# Create your models here.


class MatchHistory(models.Model):
    date = models.DateField()
    team1 = models.ForeignKey("teams.Team",
                              on_delete=models.CASCADE,
                              related_name="homeHistory", db_index=True)
    team2 = models.ForeignKey("teams.Team",
                              on_delete=models.CASCADE,
                              related_name="awayHistory", db_index=True)
    winner = models.ForeignKey("teams.Team",
                               on_delete=models.CASCADE,
                               related_name="winnerHistory",
                               blank=True, null=True, db_index=True)
    bat_first = models.ForeignKey("teams.Team",
                                  on_delete=models.CASCADE,
                                  related_name="bat_first",
                                  blank=True, null=True, db_index=True)
    type = models.CharField(max_length=20,
                            choices=[(s, s.capitalize())
                                     for s in settings.STATS_MATCH_TYPES],
                            default=settings.LEAGUE)
    status = models.CharField(max_length=20,
                              choices=[(s, s.capitalize())
                                       for s in settings.MATCH_STATUS if s != settings.SCHEDULED],
                              default=settings.COMPLETED)
    win_type = models.CharField(max_length=10,
                                choices=[(s, s.capitalize())
                                         for s in settings.WIN_TYPES],
                                blank=True, null=True)
    win_margin = models.PositiveIntegerField(blank=True, null=True)

    objects = MatchHistoryManager()

    def __str__(self) -> str:
        return self.slug

    @property
    def result(self):
        if self.status == settings.COMPLETED:
            if self.win_type == settings.SUPEROVER:
                return f"{self.winner.longname} won by Super Over"
            else:
                return f"{self.winner.longname} won by {self.win_margin} {self.win_type}"
        else:
            return f"Match {self.get_status_display()}"

    @property
    def slug(self):
        return f"{str(self.team1)}vs{str(self.team2)}-{self.date}"

    @property
    def teams(self):
        return (self.team1, self.team2)

    class Meta:
        ordering = ('-date',)


class TeamStats(models.Model):
    team1 = models.ForeignKey("teams.Team",
                              on_delete=models.CASCADE,
                              related_name="homeStats", db_index=True)
    team2 = models.ForeignKey("teams.Team",
                              on_delete=models.CASCADE,
                              related_name="awayStats",
                              null=True, db_index=True)
    stats = models.JSONField(null=True, blank=True)

    objects = TeamStatsManager()

    class Meta:
        unique_together = ('team1', 'team2')
        verbose_name_plural = "TeamStats"

    def __str__(self) -> str:
        if self.team2:
            return f"{str(self.team1)}-vs-{str(self.team2)}"
        else:
            return f"{str(self.team1)}-all"

    @property
    def played(self):
        if self.team2:
            return MatchHistory.objects.filter(models.Q(team1=self.team1, team2=self.team2) |
                                               models.Q(team1=self.team2, team2=self.team1)).count()
        else:
            return MatchHistory.objects.filter(models.Q(team1=self.team1) |
                                               models.Q(team2=self.team1)).count()
