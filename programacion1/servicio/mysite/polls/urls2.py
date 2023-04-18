from django.urls import path
from .views import choices_list, choices_detail

urlpatterns = [
    path('', choices_list),
    path('<int:pk>/', choices_detail),
]