from django.urls import path

from .views import *

app_name = "teams"

urlpatterns = [
    path("<str:shortname>/", TeamDetailView.as_view(), name="team_detail"),
    path("", TeamListCreateView.as_view(), name="team_list"),
]
