from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PreparacionesViewSet,MenuDelDiaView, CrearPedidoView, MenuItemViewSet, ListarActualizarPedidosView

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet, basename='menu-items')


urlpatterns = [
    path('', include(router.urls)),
    path('menu-del-dia/', MenuDelDiaView.as_view(), name='menu-del-dia'),
    path('crear-pedido/', CrearPedidoView.as_view(), name='crear-pedido'),
    #path('menu-items/', MenuItemViewSet.as_view(), name='menu-items'),
    path('pedidos/', ListarActualizarPedidosView.as_view(), name='listar-actualizar-pedidos'),
    path('pedidos/<int:pk>/', ListarActualizarPedidosView.as_view(), name='actualizar-pedido'),
    
]
