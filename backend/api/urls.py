from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PreparacionesViewSet,
    MenuDelDiaView, 
    CrearPedidoView,
    MenuItemViewSet,
    
    MisPedidosView,
    CancelarPedidoView,
    HistorialPedidosView,
    HistorialPedidosClienteView,
    ListarPedidosView,
    ActualizarPedidoView)

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet, basename='menu-items')


urlpatterns = [
    path('', include(router.urls)),
    path('menu-del-dia/', MenuDelDiaView.as_view(), name='menu-del-dia'),
    path('crear-pedido/', CrearPedidoView.as_view(), name='crear-pedido'),    
  
    path('mis-pedidos/', MisPedidosView.as_view(), name='mis-pedidos'),
    path('cancelar-pedido/<int:pk>/', CancelarPedidoView.as_view(), name='cancelar-pedido'),
    path('historial-pedidos/', HistorialPedidosView.as_view(), name='historial-pedidos'),
    path('crear-pedido/', CrearPedidoView.as_view(), name='crear-pedido'),
    path('mis-pedidos/', HistorialPedidosClienteView.as_view(), name='historial-pedidos'),
    path('pedidos/', ListarPedidosView.as_view(), name='listar-pedidos'),
    path('pedidos/<int:pk>/', ActualizarPedidoView.as_view(), name='actualizar-pedido'),



    
]
