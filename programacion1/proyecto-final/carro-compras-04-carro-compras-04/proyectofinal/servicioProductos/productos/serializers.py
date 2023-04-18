from rest_framework import serializers
from .models import Producto, Distribuidor

class ProductoSerializer(serializers.ModelSerializer):

    #id = serializers.ReadOnlyField()

    class Meta:
        model = Producto
        fields = ('id', 'nombre', 'descripcion', 'precio', 'cantidadVendido', 'estado', 'distribuidor')

class DistribuidorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distribuidor
        fields = ('id', 'nombre', 'descripcion', 'estado')