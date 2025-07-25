from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PreparacionesViewSet,MenuDelDiaView, CrearPedidoView

router = DefaultRouter()
router.register(r'preparaciones', PreparacionesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('menu-del-dia/', MenuDelDiaView.as_view(), name='menu-del-dia'),
    path('crear-pedido/', CrearPedidoView.as_view(), name='crear-pedido'),
]
