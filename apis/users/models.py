from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserAccountManager


def default_user_stats():
    return {"played": 0, "won": 0, "lost": 0, "draw": 0}


class UserAccount(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(_("name"), max_length=100)
    is_site_admin = models.BooleanField(_("site admin"), default=False)
    winner = models.ForeignKey(
        "teams.Team", related_name="winner_team", on_delete=models.CASCADE,
        blank=True, null=True
    )
    doubles = models.PositiveSmallIntegerField(_("doubles"), default=5)
    amount = models.FloatField(_("amount"), default=0.00)
    stats = models.JSONField(default=default_user_stats)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserAccountManager()

    class Meta:
        ordering = ('-amount', 'name')

    def __str__(self) -> str:
        return self.name.title()

    def update_as_winner(self, amount, final=False):
        self.amount += amount
        if not final:
            self.stats['played'] += 1
            self.stats['won'] += 1
        self.save()

    def update_as_loser(self, amount, final=False):
        self.amount -= amount
        if not final:
            self.stats['played'] += 1
            self.stats['lost'] += 1
        self.save()

    def update_as_draw(self):
        self.stats['played'] += 1
        self.stats['draw'] += 1
        self.save()

    @property
    def form(self):
        played = list(
            self.user_predictions.exclude(
                models.Q(match__isnull=True) |
                models.Q(match__status="scheduled")
            )
            .order_by("-match__num")
            .values_list("status", flat=True)[:3]
        )

        played_cnt = len(played)
        if played_cnt < 3:
            for i in range(3 - played_cnt):
                played += ["scheduled"]

        return played

    @property
    def rank(self):
        users = UserAccount.objects.exclude(is_staff=True)
        return (*users,).index(self) + 1
