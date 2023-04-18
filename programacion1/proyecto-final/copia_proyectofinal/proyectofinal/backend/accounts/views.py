from django.shortcuts import render
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from rest_framework import viewsets

# Create your views here.
class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()