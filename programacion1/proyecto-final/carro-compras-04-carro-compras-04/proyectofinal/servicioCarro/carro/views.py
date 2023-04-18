from typing import Generic
from django.http import response
from django.shortcuts import render
from rest_framework import viewsets, generics
from django.contrib.auth import authenticate, login
from .serializers import CarroComprasSerializer, ProductoCarroSerializer, ProductosVendidosSerializer, VentasSerializer
from .models import CarroCompras, ProductoCarro, ProductosVendidos, Ventas
from url_filter.integrations.drf import DjangoFilterBackend

from carro import serializers

# Create your views here.
class CarroComprasView(viewsets.ModelViewSet):
    serializer_class = CarroComprasSerializer
    queryset = CarroCompras.objects.all()


class VentasView(viewsets.ModelViewSet):
    serializer_class = VentasSerializer
    queryset = Ventas.objects.all()


class ProductoCarroView(viewsets.ModelViewSet):
    serializer_class = ProductoCarroSerializer
    queryset = ProductoCarro.objects.all()


class ProductosVendidosView(viewsets.ModelViewSet):
    serializer_class = ProductosVendidosSerializer
    queryset = ProductosVendidos.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['idVenta']

class ProductoCarroPartView(viewsets.ModelViewSet):
    serializer_class = ProductoCarroSerializer
    queryset = ProductoCarro.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['idCarro']

class CarroUsuarioView(viewsets.ModelViewSet):
    serializer_class = CarroComprasSerializer
    queryset = CarroCompras.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['idUsuario']

class VentasCarroView(viewsets.ModelViewSet):
    serializer_class = VentasSerializer
    queryset = Ventas.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['idCarro']

class GetIdProdView(viewsets.ModelViewSet):
    serializer_class = ProductoCarroSerializer
    queryset = ProductoCarro.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['idProducto']
