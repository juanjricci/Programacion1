from django.contrib.auth.models import User
from django.db import models
from django.db.models.deletion import CASCADE
#from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class CarroCompras(models.Model):
    idUsuario = models.ForeignKey(User, on_delete=CASCADE)

    def __str__(self):
        return str(self.pk)

class Ventas(models.Model):
    fechaVenta = models.CharField(max_length=100)
    precioTotal = models.DecimalField(max_digits=6, decimal_places=2)
    idCarro = models.ForeignKey(CarroCompras, on_delete=CASCADE)

    def __str__(self):
        return str(self.pk)

class ProductosVendidos(models.Model):
    idProducto = models.IntegerField()
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    idVenta = models.ForeignKey(Ventas, on_delete=CASCADE)

    def __str__(self):
        return str(self.pk)

class ProductoCarro(models.Model):
    idProducto = models.IntegerField()
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    cantidad = models.IntegerField(default=1)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    idCarro = models.ForeignKey(CarroCompras, on_delete=CASCADE)

    def __str__(self):
        return str(self.pk)
