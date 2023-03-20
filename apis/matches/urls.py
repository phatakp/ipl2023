from django.urls import path

from .views import (MatchListCreateView, MatchRetrieveUpdateView,
                    MatchWinProbabilityView)

app_name = "matches"

urlpatterns = [
    path("probability/<int:num>/",
         MatchWinProbabilityView.as_view(), name="match_win_prob"),
    path("<int:num>/", MatchRetrieveUpdateView.as_view(), name="match_update"),
    path("", MatchListCreateView.as_view(), name="match_listcreate"),
]
