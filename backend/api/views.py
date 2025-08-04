from django.shortcuts import render
from rest_framework import viewsets,generics, permissions
from .models import Preparaciones,MenuItem, Pedido
from .serializers import PreparacionesSerializer,MenuItemSerializer, PedidoSerializer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.

class PreparacionesViewSet(viewsets.ModelViewSet):
    queryset = Preparaciones.objects.all()
    serializer_class = PreparacionesSerializer


class MenuDelDiaView(generics.ListAPIView):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.filter(disponible_hoy=True)
    permission_classes = [permissions.AllowAny]

class CrearPedidoView(generics.CreateAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated]


class ListarActualizarPedidosView(generics.ListCreateAPIView, generics.UpdateAPIView):
    queryset = Pedido.objects.all().order_by('-fecha')
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'encargado' or 'administrador':
            return Pedido.objects.all().order_by('-fecha')
        return Pedido.objects.none()
    

class MisPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(cliente=self.request.user)
    


class CancelarPedidoView(generics.UpdateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Solo permite acceder a sus propios pedidos
        return Pedido.objects.filter(cliente=self.request.user)
    

class HistorialPedidosView(generics.ListAPIView):
    queryset = Pedido.objects.all().order_by('-fecha')
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fecha', 'cliente','estado'] 
