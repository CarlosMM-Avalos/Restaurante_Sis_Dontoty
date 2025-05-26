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