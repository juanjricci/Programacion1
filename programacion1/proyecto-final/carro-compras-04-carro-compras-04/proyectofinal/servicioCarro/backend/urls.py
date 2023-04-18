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
from carro import views, service


router = routers.DefaultRouter()
router.register(r'carro', views.CarroComprasView, 'carro')
router.register(r'ventas', views.VentasView, 'ventas')
router.register(r'producto-carro', views.ProductoCarroView, 'producto-carro')
router.register(r'productos-vendidos', views.ProductosVendidosView, 'productos-vendidos')
router.register(r'usuarios', UsersView, 'usuarios')
router.register(r'prodcarro', views.ProductoCarroPartView, 'prodcarro')
router.register(r'carro-usuario', views.CarroUsuarioView, 'carro-usuario')
router.register(r'ventas-carro', views.VentasCarroView, 'ventas-carro')
router.register(r'get-idprod', views.GetIdProdView, 'get-idprod')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('accounts.urls')),
    path('actualizar-cantidad/<int:idProducto>/', service.actualizarCantidad),
]