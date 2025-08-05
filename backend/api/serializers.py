from rest_framework import serializers
from .models import Preparaciones,MenuItem, Pedido, PedidoItem

class PreparacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preparaciones
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class PedidoItemSerializer(serializers.ModelSerializer):
    menu_item_nombre = serializers.CharField(source='menu_item.nombre', read_only=True)

    class Meta:
        model = PedidoItem
        fields = ['id', 'menu_item', 'menu_item_nombre', 'cantidad']

class PedidoSerializer(serializers.ModelSerializer):
    estado_display = serializers.SerializerMethodField()
    cliente_nombre = serializers.SerializerMethodField()
    fecha_formateada = serializers.SerializerMethodField()

    items = PedidoItemSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'cliente', 'cliente_nombre', 'estado', 'estado_display', 'fecha', 'fecha_formateada', 'items']
        read_only_fields = ['cliente', 'fecha']

    def get_estado_display(self, obj):
        return obj.get_estado_display()

    def get_cliente_nombre(self, obj):
        return obj.cliente.username

    def get_fecha_formateada(self, obj):
        return obj.fecha.strftime("%d-%m-%Y %H:%M")

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        pedido = Pedido.objects.create(cliente=self.context['request'].user)
        for item_data in items_data:
            PedidoItem.objects.create(pedido=pedido, **item_data)
        return pedido