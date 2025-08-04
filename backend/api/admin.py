from django.contrib import admin
from .models import MenuItem, Pedido
# Register your models here.

admin.site.register(MenuItem)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'item', 'estado', 'fecha')  # campos que quieras mostrar

admin.site.register(Pedido, PedidoAdmin)
