from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import TeamManager

# Create your models here.


class Team(models.Model):
    longname = models.CharField(_("longname"), max_length=100, unique=True)
    shortname = models.CharField(_("shortname"), max_length=5, unique=True)
    active = models.BooleanField(_("active"))
    played = models.PositiveSmallIntegerField(_("played"), default=0)
    won = models.PositiveSmallIntegerField(_("won"), default=0)
    lost = models.PositiveSmallIntegerField(_("lost"), default=0)
    draw = models.PositiveSmallIntegerField(_("draw"), default=0)
    points = models.PositiveSmallIntegerField(
        _("points"), default=0, db_index=True)
    nrr = models.FloatField(_("nrr"), default=0, max_length=5, db_index=True)
    objects = TeamManager()

    def __str__(self) -> str:
        return self.shortname.upper()

    class Meta:
        ordering = ('-points', '-nrr', 'shortname')

    def update_as_winner(self, nrr):
        self.played += 1
        self.won += 1
        self.points += 2
        self.nrr += nrr
        self.save()

    def update_as_loser(self, nrr):
        self.played += 1
        self.lost += 1
        self.nrr += nrr
        self.save()

    def update_as_draw(self):
        self.played = models.F('played') + 1
        self.draw = models.F('draw') + 1
        self.points = models.F('points') + 1
        self.save(update_fields=['played', 'draw', 'points'])

    @property
    def form(self):
        matches = self.team1_matches.all() | self.team2_matches.all()
        teamFilter = models.Q(team1=self) | models.Q(team2=self)
        played = list(
            matches.distinct()
            .filter(teamFilter)
            .exclude(status="scheduled")
            .order_by("-num")[:5]
        )
        scheduled = list(
            matches.distinct()
            .filter(teamFilter)
            .filter(status="scheduled")
            .order_by("num")[:5]
        )

        played_cnt = len(played)
        if played_cnt < 5:
            played += scheduled[: 5 - played_cnt]

        result = [
            {
                "team": match.team1.shortname if match.team1 != self else match.team2.shortname,
                "winner": match.winner.shortname if match.winner else None,
            }
            for match in played
        ]
        return result
