from django.contrib import admin

from .models import Prediction


# Register your models here.
@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_filter = ("user", "match")

    def __init__(self, model, admin_site):
        self.list_display = [field.name for field in model._meta.fields]
        super().__init__(model, admin_site)
