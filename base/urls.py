# base/urls.py
from django.urls import path
from . import views

app_name = 'base' 

urlpatterns = [
    path('', views.base, name='index'), 
    path('messages/', views.message_list, name='message_list'),
]