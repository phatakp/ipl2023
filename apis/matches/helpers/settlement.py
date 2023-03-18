from django.apps import apps
from django.conf import settings
from django.db import models

from .predictions import (update_defaulters, update_losing_predictions,
                          update_no_result_predictions, update_prediction,
                          update_winning_predictions)

Prediction = apps.get_model('predictions', 'Prediction')


def settle_bets(match):
    match_bets = bets_for_match(match)

    if match.winner:
        update_completed(match_bets, match.winner)
    else:
        update_abandoned(match_bets)

    # Double bet present
    if match.double:
        process_double_prediction(match_bets)

    if match.type == settings.FINAL:
        process_final_winner_predictions(match)


def bets_for_match(match):
    return Prediction.objects.filter(match=match)


def ipl_final_bets():
    return Prediction.objects.filter(match__isnull=True)


def process_double_prediction(match_bets):
    double_bet = match_bets.filter(double=True).first()
    total = 0
    if double_bet.status == settings.WON:
        for instance in match_bets.filter(status=settings.LOST):
            update_prediction(instance, instance.amount,
                              win=False, final=True)
            total += instance.amount
        if total > 0:
            update_prediction(double_bet, total, win=True,
                              final=True)


def process_final_winner_predictions(match):
    final_bets = ipl_final_bets()

    if match.winner:
        update_completed(final_bets, match.winner, final=True)
    else:
        update_abandoned(final_bets, final=True)


def update_completed(match_bets, winner, final=False):
    winning_bets = match_bets.filter(team=winner)
    losing_bets = match_bets.exclude(team=winner)
    defaulters = match_bets.filter(status=settings.DEFAULT)

    # Get total win amount and total loss amount
    total_win_amt = winning_bets.aggregate(amt=models.Sum('amount'))['amt']
    total_lost_amt = losing_bets.aggregate(amt=models.Sum('amount'))['amt']

    # If both winners and losers
    if total_win_amt and total_lost_amt:
        update_winning_predictions(
            winning_bets, total_win_amt, total_lost_amt, final)
        update_losing_predictions(losing_bets, final)

    # If defaulters
    elif total_lost_amt and defaulters:
        update_defaulters(match_bets, final)

    # All bets on same team
    else:
        update_no_result_predictions(match_bets)


def update_abandoned(match_bets, final=False):
    defaulters = match_bets.filter(status=settings.DEFAULT)

    if defaulters:
        update_defaulters(match_bets, final)
    else:
        update_no_result_predictions(match_bets)
