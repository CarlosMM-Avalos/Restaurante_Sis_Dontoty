from rest_framework import serializers
from .models import Preparaciones,MenuItem, Pedido

class PreparacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preparaciones
        fields = '__all__'




class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
        read_only_fields = ['cliente']


