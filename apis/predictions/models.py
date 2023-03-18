from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from .managers import PredictionManager

User = get_user_model()

# Create your models here.


class Prediction(models.Model):
    match = models.ForeignKey(
        "matches.Match",
        related_name="match_predictions",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        User, related_name="user_predictions", on_delete=models.CASCADE
    )
    team = models.ForeignKey(
        "teams.Team",
        related_name="team_predictions",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    amount = models.PositiveSmallIntegerField(default=50)
    result = models.FloatField(default=0.00)
    status = models.CharField(
        max_length=10,
        choices=[(p, p.capitalize())
                 for p in settings.PREDICTION_STATUS_TYPES],
        default=settings.PLACED,
        db_index=True,
    )
    create_upd_time = models.DateTimeField(auto_now=True)
    double = models.BooleanField(default=False)
    updated = models.BooleanField(default=False, db_index=True)
    objects = PredictionManager()

    def __str__(self) -> str:
        return str(self.match)

    class Meta:
        unique_together = ("match", "user")
        ordering = (
            "match",
            "create_upd_time",
        )
