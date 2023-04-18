from django.db.models import fields
from rest_framework import serializers
from .models import CarroCompras, ProductoCarro, Ventas, ProductosVendidos


class CarroComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarroCompras
        fields = ('id', 'idUsuario')

class ProductosVendidosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductosVendidos
        fields = ('id', 'idProducto', 'nombre', 'descripcion', 'cantidad', 'precio', 'idVenta')

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = ('id', 'fechaVenta', 'precioTotal', 'idCarro')

class ProductoCarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoCarro
        fields = ('id', 'idProducto', 'nombre', 'descripcion', 'cantidad', 'precio', 'idCarro')

class CantidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoCarro
        fields = ('idProducto', 'cantidad')