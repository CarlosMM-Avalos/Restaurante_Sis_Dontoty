from django.contrib import admin
from .models import MenuItem, Pedido, PedidoItem
# Register your models here.

admin.site.register(MenuItem)

class PedidoItemInline(admin.TabularInline):
    model = PedidoItem
    extra = 0

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente',  'estado', 'fecha')  # campos que quieras mostrar
    inlines = [PedidoItemInline]


admin.site.register(Pedido, PedidoAdmin)