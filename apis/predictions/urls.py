from django.urls import path

from .views import (PredictionDoubleView, PredictionForMatchForUserView,
                    PredictionListCreateView, PredictionModifyView)

app_name = "predictions"

urlpatterns = [
    path("double/<int:id>/", PredictionDoubleView.as_view(),
         name="prediction_double"),
    path("user/<int:match>/", PredictionForMatchForUserView.as_view(),
         name="prediction_detail"),
    path("<int:id>/", PredictionModifyView.as_view(), name="prediction_update"),
    path("", PredictionListCreateView.as_view(), name="prediction_list"),

]
