from django.contrib import admin

from .models import Match


# Register your models here.
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_filter = ("team1", "team2", "type", "status")

    def __init__(self, model, admin_site):
        self.list_display = [field.name for field in model._meta.fields]
        super().__init__(model, admin_site)
