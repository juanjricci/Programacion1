from django.contrib import admin
from .models import CarroCompras, ProductosVendidos, ProductoCarro, Ventas

# Register your models here.
class ProductosVendidosAdmin(admin.ModelAdmin):
    list_display = ('id', 'idProducto', 'nombre', 'descripcion', 'cantidad', 'precio', 'idVenta')

class VentasAdmin(admin.ModelAdmin):
    list_display = ('id', 'fechaVenta', 'precioTotal', 'idCarro')

class CarroComprasAdmin(admin.ModelAdmin):
    list_display = ('id', 'idUsuario')

class ProductoCarroAdmin(admin.ModelAdmin):
    list_display = ('id', 'idProducto', 'nombre', 'descripcion', 'cantidad', 'precio', 'idCarro')

admin.site.register(ProductoCarro, ProductoCarroAdmin)
admin.site.register(Ventas, VentasAdmin)
admin.site.register(CarroCompras, CarroComprasAdmin)
admin.site.register(ProductosVendidos, ProductosVendidosAdmin)