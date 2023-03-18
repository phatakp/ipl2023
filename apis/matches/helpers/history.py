from django.apps import apps
from django.conf import settings

from apis.stats.helpers.stats import update_stats

MatchHistory = apps.get_model('stats', "MatchHistory")


def insert_to_history(match):
    type = settings.KNOCKOUT if match.type != settings.LEAGUE else match.type
    win_type = win_margin = None
    if match.completed:
        [*ext, win_margin, win_type] = match.result.split()
        if win_margin == 'Super':
            win_type = settings.SUPEROVER
            win_margin = None
    MatchHistory.objects.create(date=match.date.date(),
                                team1=match.team1,
                                team2=match.team2,
                                type=type,
                                winner=match.winner,
                                status=match.status,
                                bat_first=match.bat_first,
                                win_margin=win_margin,
                                win_type=win_type)
    update_stats(team1=match.team1, update=True)
    update_stats(team1=match.team2, update=True)
    update_stats(team1=match.team1, team2=match.team2, update=True)
    update_stats(team1=match.team2, team2=match.team1, update=True)
