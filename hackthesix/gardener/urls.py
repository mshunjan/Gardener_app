from django.urls import path
from . import views

urlpatterns = [
    path('', views.trefle, name='trefle'),
    path('', views.base, name='base'),
    path('', views.gardener, name='gardener'),
]