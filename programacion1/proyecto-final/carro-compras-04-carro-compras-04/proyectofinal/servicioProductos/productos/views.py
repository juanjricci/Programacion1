from django.shortcuts import render
from .models import Producto, Distribuidor
from rest_framework import viewsets
from .serializers import DistribuidorSerializer, ProductoSerializer
from url_filter.integrations.drf import DjangoFilterBackend

# Create your views here.
class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class DistribuidorView(viewsets.ModelViewSet):
    serializer_class = DistribuidorSerializer
    queryset = Distribuidor.objects.all()

class ProductosActivosView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['estado']

class ProductosDistribuidorView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['distribuidor']

class DistribuidoresActivos(viewsets.ModelViewSet):
    serializer_class = DistribuidorSerializer
    queryset = Distribuidor.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['estado']

class ProductoIndividualView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id']
