from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        #Clave/ Valor
        ('administrador','Administrador'),
        ('encargado','Encargado'),
        ('cliente','Cliente'),
        
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='cliente')

    def __str__(self):
        return f'{self.username} ({self.role})'