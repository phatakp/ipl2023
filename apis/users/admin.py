from django.contrib import admin

from .models import UserAccount


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "name", "is_site_admin",
                    "amount", "winner", "doubles", "stats")
