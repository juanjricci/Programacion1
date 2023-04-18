"STEP 1"
mkdir django-todo-react
cd django-todo-react
*activar venv*
django-admin startproject backend
cd backend
python manage.py startapp todo
python manage.py migrate
python manage.py runserver 
*navegar a http://localhost:8000*
# ahora debo registrar la nueva app
(backend/settings.py)
INSTALLED_APPS = [
    ...
    'todo',
]
(todo/models.py)
from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

# migro los modelos
python manage.py makemigrations todo
# aplico los cambios a la DB
python manage.py migrate todo
(todo/admin.py)
from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
python manage.py createsuperuser # sigo los pasos para crear el superuser
python manage.py runserver
http://localhost:8000/admin
"STEP 2 - SETIING UP THE APIs"
pip install djangorestframework django-cors-headers
(backend/settings.py)
INSTALLED_APPS = [
    ...
    'corsheaders',
    'rest_framework',
    'todo',
]
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
]
# lo sgte va al final de ese archivo
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000'
]
# ahora creo los serializers
crear (todo/serializers.py)
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')
# ahora creo las views
(todo/views.py)
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

(backend/urls.py)
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
python manage.py runserver
*http://localhost:8000/api/todos*

