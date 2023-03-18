from django.contrib import admin

from .models import MatchHistory, TeamStats

# Register your models here.


@admin.register(MatchHistory)
class MatchHistoryAdmin(admin.ModelAdmin):
    list_display = ('date', 'type', 'team1',
                    'team2', 'status', 'winner', 'bat_first',
                    'win_type', 'win_margin')
    list_filter = ('type', 'status', 'team1', 'team2',
                   'bat_first', 'winner')


@admin.register(TeamStats)
class TeamStatsAdmin(admin.ModelAdmin):
    list_display = ('team1', 'team2', 'stats')
    list_filter = ('team1', 'team2',)
