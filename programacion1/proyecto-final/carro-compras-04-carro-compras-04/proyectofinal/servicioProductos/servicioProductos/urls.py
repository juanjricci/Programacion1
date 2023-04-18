"""servicioProductos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from productos import service, views


router = routers.DefaultRouter()
router.register(r'productos', views.ProductoView, 'productos')
router.register(r'productos-activos', views.ProductosActivosView, 'productos-activos')
router.register(r'distribuidores', views.DistribuidorView, 'distribuidores')
router.register(r'distribuidor', views.ProductosDistribuidorView, 'distribuidor')
router.register(r'distribuidores-activos', views.DistribuidoresActivos, 'distribuidores-activos')
router.register(r'producto', views.ProductoIndividualView, 'producto')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('prueba/', service.CartItemViews)
]
