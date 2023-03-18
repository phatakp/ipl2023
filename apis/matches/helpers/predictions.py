from django.conf import settings
from django.db.models import F, Sum


def update_prediction(instance, amt, win=True, final=False):
    instance.result = F('result') + amt if win else F('result')-amt
    instance.status = settings.WON if win else settings.LOST
    instance.save(update_fields=['result', 'status'])
    if win:
        instance.user.update_as_winner(amt, final)
    else:
        instance.user.update_as_loser(amt, final)


def update_winning_predictions(bets, total_win_amt, total_lost_amt, final=False):
    for bet in bets:
        amt = (bet.amount/total_win_amt) * total_lost_amt
        update_prediction(bet, amt, win=True, final=final)


def update_losing_predictions(bets, final=False):
    for bet in bets:
        update_prediction(bet, bet.amount, win=False, final=final)


def update_no_result_predictions(bets):
    for bet in bets:
        bet.status = settings.NORESULT
        bet.save(update_fields=['status'])
        bet.user.update_as_draw()


def update_defaulters(match_bets, final=False):
    defaulters = match_bets.filter(status=settings.DEFAULT)
    non_defaulters = match_bets.exclude(status=settings.DEFAULT)

    # Get total win amount and total loss amount
    total_win_amt = non_defaulters.aggregate(amt=Sum('amount'))['amt']
    total_lost_amt = defaulters.aggregate(amt=Sum('amount'))['amt']

    update_winning_predictions(non_defaulters,
                               total_win_amt,
                               total_lost_amt,
                               final)
    update_losing_predictions(defaulters, final)
