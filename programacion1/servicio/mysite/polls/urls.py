from django.urls import path
from .views import questions_list, questions_detail

urlpatterns = [
    path('', questions_list),
    path('<int:pk>/', questions_detail),
]
