from django.db import models
from django.db.models.signals import post_save, pre_save


class MatchManager(models.Manager):
    def bulk_create(self, objs, **kwargs):
        for i in objs:
            pre_save.send(i.__class__, instance=i)
        a = super().bulk_create(objs, **kwargs)
        for i in objs:
            post_save.send(i.__class__, instance=i, created=True)
        return a

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .select_related("team1", "team2", "winner", "bat_first")
        )

    def get_object_or_none(self, *args, **kwargs):
        try:
            obj = super().get(*args, **kwargs)
            return obj
        except:
            return None
