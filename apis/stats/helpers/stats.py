from django.apps import apps
from django.conf import settings

MatchHistory = apps.get_model('stats', 'MatchHistory')
TeamStats = apps.get_model('stats', 'TeamStats')
history = MatchHistory.objects.filter(status=settings.COMPLETED)


def update_stats(team1, team2=None, update=False):
    result = list()
    stats = get_stats(team1, team2)

    if update:
        TeamStats.objects.filter(team1=team1, team2=team2).update(stats=stats)
    else:
        result.append(TeamStats(team1=team1,
                                team2=team2,
                                stats=stats)
                      )
    return result


def get_stats(team1, team2=None):
    stats = dict()
    if not team2:
        home = history.filter(team1=team1)
        away = history.filter(team2=team1)
    else:
        home = history.filter(team1=team1, team2=team2)
        away = history.filter(team1=team2, team2=team1)
    all = home | away
    batFirst = all.filter(bat_first=team1)
    knockout = all.filter(type=settings.KNOCKOUT)
    last10 = all.order_by('-date')[:10]

    all_wins = all.filter(winner=team1)
    home_wins = home.filter(winner=team1)
    away_wins = away.filter(winner=team1)
    batFirst_wins = batFirst.filter(winner=team1)
    knockout_wins = knockout.filter(winner=team1)
    last10_wins = [match for match in last10 if match.winner == team1]

    stats.update(
        {
            settings.ALL: get_winpct(all_wins, all),
            settings.HOME: get_winpct(home_wins, home),
            settings.AWAY: get_winpct(away_wins, away),
            settings.BATFIRST: get_winpct(batFirst_wins, batFirst),
            settings.KNOCKOUT: get_winpct(knockout_wins, knockout),
            settings.LAST10: get_winpct(last10_wins, last10),
        })

    return stats


def get_winpct(wins, total):
    try:
        tot = total.count()
        win = wins.count()
    except:
        tot = len(total)
        win = len(wins)

    try:
        winpct = win/tot
    except:
        winpct = 0
    return winpct
