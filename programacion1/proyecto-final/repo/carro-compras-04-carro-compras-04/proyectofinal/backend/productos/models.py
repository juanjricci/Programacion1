from django.db import models

# Create your models here.

class Distribuidor(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    estado = models.BooleanField(default=False)

    def __str__(self):
        # return str(self.pk)
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    cantidadVendido = models.IntegerField()
    estado = models.BooleanField(default=False)
    distribuidor = models.ForeignKey(Distribuidor, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)