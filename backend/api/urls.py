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
    ActualizarPedidoView,
    ActualizarDisponibilidadView,
    ResumenDiarioPedidos,
    ResumenEstadosPedidosView,
    UsuarioAdminListCreateView,
    UsuarioAdminRetrieveUpdateDestroyView,
    ListCreateUsersView, RetrieveUpdateDestroyUserView,)

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
    path('menu-items/<int:pk>/disponibilidad/', ActualizarDisponibilidadView.as_view(), name='actualizar-disponibilidad'),
    path('resumen-diario/', ResumenDiarioPedidos.as_view(), name='resumen-diario'),
    path('resumen-pedidos-estados/', ResumenEstadosPedidosView.as_view(), name='resumen-estados'),
    path('admin/usuarios/', UsuarioAdminListCreateView.as_view(), name='admin-usuarios'),
    path('admin/usuarios/<int:pk>/', UsuarioAdminRetrieveUpdateDestroyView.as_view(), name='admin-usuarios-detalle'),
    path('users/', ListCreateUsersView.as_view(), name='listar-usuarios'),
    path('users/<int:pk>/', RetrieveUpdateDestroyUserView.as_view(), name='editar-usuario'),


    
]
