from django.apps import apps

Team = apps.get_model('teams', "Team")


def update_teams(match):
    team1 = match.team1
    team2 = match.team2

    if match.winner:
        t1runs, t1balls = prepare_score(**match.t1score)
        t2runs, t2balls = prepare_score(**match.t2score)

        t1nrr = ((t1runs/t1balls) - (t2runs/t2balls))*6
        t2nrr = t1nrr * -1

        if team1 == match.winner:
            team1.update_as_winner(t1nrr)
            team2.update_as_loser(t2nrr)
        else:
            team1.update_as_loser(t1nrr)
            team2.update_as_winner(t2nrr)

    else:
        for team in (team1, team2):
            team.update_as_draw()


def prepare_score(runs, wickets, overs):
    balls = int(((overs*10) // 10) * 6 + ((overs*10) % 10))
    new_balls = balls if wickets < 10 else 120
    return runs, new_balls
