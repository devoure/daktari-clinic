from django.urls import path
from . import views
from .views import prediction_create

urlpatterns = [
        path('prediction/create', views.prediction_create),
        ]
