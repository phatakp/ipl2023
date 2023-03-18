from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()
Prediction = apps.get_model('predictions', 'Prediction')


def is_default_bets_present(match):
    users_count = User.objects.exclude(is_staff=True).count()
    bet_placed_count = Prediction.objects.filter(match=match).count()
    return users_count != bet_placed_count


def add_default_bets(match):
    if is_default_bets_present(match):
        for user in User.objects.exclude(is_staff=True):
            if no_valid_bet_for_match(user, match):
                Prediction.objects.create(user=user, match=match,
                                          amount=match.min_bet,
                                          status=settings.DEFAULT
                                          )


def no_valid_bet_for_match(user, match):
    return not Prediction.objects.filter(user=user,
                                         match=match,
                                         status=settings.PLACED).exists()
