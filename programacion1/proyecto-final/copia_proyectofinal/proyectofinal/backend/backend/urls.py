"""backend URL Configuration
​
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts.views import UsersView
from rest_framework import routers
from productos import views
from carro.views import CarroComprasView, CarroUsuarioView, ProductoCarroPartView, ProductoCarroView, ProductosVendidosView, VentasCarroView, VentasView

router = routers.DefaultRouter()
router.register(r'productos', views.ProductoView, 'productos')
router.register(r'distribuidores', views.DistribuidorView, 'distribuidores')
router.register(r'carro', CarroComprasView, 'carro')
router.register(r'ventas', VentasView, 'ventas')
router.register(r'producto-carro', ProductoCarroView, 'producto-carro')
router.register(r'productos-vendidos', ProductosVendidosView, 'productos-vendidos')
router.register(r'usuarios', UsersView, 'usuarios')
router.register(r'prodcarro', ProductoCarroPartView, 'prodcarro')
router.register(r'productos-activos', views.ProductosActivosView, 'productos-activos')
router.register(r'carro-usuario', CarroUsuarioView, 'carro-usuario')
router.register(r'ventas-carro', VentasCarroView, 'ventas-carro')
router.register(r'distribuidor', views.ProductosDistribuidorView, 'distribuidor')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('accounts.urls')),
]