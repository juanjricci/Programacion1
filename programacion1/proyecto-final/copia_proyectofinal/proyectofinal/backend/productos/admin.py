from django.contrib import admin
from .models import Producto, Distribuidor

# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion', 'precio', 'cantidadVendido', 'estado', 'distribuidor')

class DistribuidorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion', 'estado')

admin.site.register(Producto, ProductoAdmin)
admin.site.register(Distribuidor, DistribuidorAdmin)