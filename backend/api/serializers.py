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

    estado_display = serializers.SerializerMethodField()
    item_nombre = serializers.SerializerMethodField()
    cliente_nombre = serializers.SerializerMethodField()
    fecha_formateada = serializers.SerializerMethodField()

    class Meta:
        model = Pedido
        fields = '__all__'
        read_only_fields = ['cliente','fecha']

    def get_estado_display(self, obj):
        return obj.get_estado_display()
    
    def get_item_nombre(self, obj):
        return obj.item.nombre
    
    def get_cliente_nombre(self, obj):
        return obj.cliente.username    

    def get_fecha_formateada(self, obj):
        return obj.fecha.strftime("%d-%m-%Y %H:%M")


