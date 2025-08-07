from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User


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
    

User = get_user_model()

class MenuItem(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    disponible_hoy = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('en_preparacion', 'En preparación'),
        ('listo', 'Listo para entregar'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ]
    cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    #se elimino el campo item
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20,choices=ESTADOS , default='pendiente',) 

    def __str__(self):
        items = ", ".join(
        [f"{pi.menu_item.nombre} x{pi.cantidad}" for pi in self.items.all()]
        )
        return f"Pedido de {self.cliente.username} - {items}"
    
class PedidoItem(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.menu_item.nombre} x {self.cantidad}'
