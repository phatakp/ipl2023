
from django.apps import apps
from django.conf import settings

TeamStats = apps.get_model('stats', 'TeamStats')

home_weights = {
    settings.ALL: 1,
    settings.HOME: 1.5,
    settings.AWAY: 1,
    settings.BATFIRST: 1,
    settings.KNOCKOUT: 1,
    settings.LAST10: 2,
}
home_batfirst_weights = {
    settings.ALL: 1,
    settings.HOME: 1.5,
    settings.AWAY: 1,
    settings.BATFIRST: 1.5,
    settings.KNOCKOUT: 1,
    settings.LAST10: 2,
}
home_knockout_weights = {
    settings.ALL: 1,
    settings.HOME: 1.5,
    settings.AWAY: 1,
    settings.BATFIRST: 1,
    settings.KNOCKOUT: 2,
    settings.LAST10: 2,
}
home_batfirst_knockout_weights = {
    settings.ALL: 1,
    settings.HOME: 1.5,
    settings.AWAY: 1,
    settings.BATFIRST: 1.5,
    settings.KNOCKOUT: 2,
    settings.LAST10: 2,
}

away_weights = {
    settings.ALL: 1,
    settings.HOME: 1,
    settings.AWAY: 1.5,
    settings.BATFIRST: 1,
    settings.KNOCKOUT: 1,
    settings.LAST10: 2,
}
away_knockout_weights = {
    settings.ALL: 1,
    settings.HOME: 1,
    settings.AWAY: 1.5,
    settings.BATFIRST: 1,
    settings.KNOCKOUT: 2,
    settings.LAST10: 2,
}
away_batfirst_weights = {
    settings.ALL: 1,
    settings.HOME: 1,
    settings.AWAY: 1.5,
    settings.BATFIRST: 1.5,
    settings.KNOCKOUT: 1,
    settings.LAST10: 2,
}
away_batfirst_knockout_weights = {
    settings.ALL: 1,
    settings.HOME: 1,
    settings.AWAY: 1.5,
    settings.BATFIRST: 1.5,
    settings.KNOCKOUT: 2,
    settings.LAST10: 2,
}


def calc_prob(teamstats, weights):
    prod = 0
    total = 0
    for key, value in teamstats.items():
        prod += value * weights[key]
        total += weights[key]
    return round(prod/total, 2)


def get_prob_for_team(teamstats, home=False, batfirst=False, knockout=False):
    if home and batfirst and knockout:
        return calc_prob(teamstats, weights=home_batfirst_knockout_weights)
    elif home and batfirst:
        return calc_prob(teamstats, weights=home_batfirst_weights)
    elif home and knockout:
        return calc_prob(teamstats, weights=home_knockout_weights)
    elif batfirst and knockout:
        return calc_prob(teamstats, weights=away_batfirst_knockout_weights)
    elif batfirst:
        return calc_prob(teamstats, weights=away_batfirst_weights)
    elif knockout:
        return calc_prob(teamstats, weights=away_knockout_weights)
    elif home:
        return calc_prob(teamstats, weights=home_weights)
    else:
        return calc_prob(teamstats, weights=away_weights)


def calc_win_prob(match):
    [team1, team2] = match.teams

    t1all = TeamStats.objects.filter(team1=team1, team2__isnull=True) \
        .values_list('stats', flat=True).first()
    t1vst2 = TeamStats.objects.filter(team1=team1, team2=team2) \
        .values_list('stats', flat=True).first()
    t2all = TeamStats.objects.filter(team1=team2, team2__isnull=True) \
        .values_list('stats', flat=True).first()
    t2vst1 = TeamStats.objects.filter(team1=team2, team2=team1) \
        .values_list('stats', flat=True).first()

    prob1 = get_prob_for_team(t1all,
                              home=True,
                              batfirst=team1 == match.bat_first,
                              knockout=match.type != settings.LEAGUE)
    prob2 = get_prob_for_team(t2all,
                              home=False,
                              batfirst=team2 == match.bat_first,
                              knockout=match.type != settings.LEAGUE)
    prob21 = get_prob_for_team(t2vst1,
                               home=False,
                               batfirst=team2 == match.bat_first,
                               knockout=match.type != settings.LEAGUE)
    prob12 = get_prob_for_team(t1vst2,
                               home=True,
                               batfirst=team1 == match.bat_first,
                               knockout=match.type != settings.LEAGUE)

    t1prob = int(100*((prob1 + 2*prob12)/3))
    t2prob = int(100*((prob2 + 2*prob21)/3))
    if t1prob + t2prob == 100:
        return {'team1': t1prob, 'team2': t2prob}
    else:
        return {'team1': t1prob, 'team2': 100-t1prob}
