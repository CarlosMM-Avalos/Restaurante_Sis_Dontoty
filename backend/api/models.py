from django.db import models

# Create your models here.

class Preparaciones(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio  = models.IntegerField(default=False)
    #faltan campos por agregar
    '''- restaurant_id (FK)
    - name
    - description
    - price
    - image_url
    - category_id (FK)
    - preparation_time (en minutos)
    - is_available (boolean)
    - is_vegetarian (boolean)
    - is_spicy (boolean)'''
    
    def __str__(self):
        return self.nombre
    





from django.contrib.auth import get_user_model

User = get_user_model()

class MenuItem(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    disponible_hoy = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, default='pendiente')  # pendiente / en cocina / listo / entregado

    def __str__(self):
        return f"{self.cliente.username} pidió {self.item.nombre}"
