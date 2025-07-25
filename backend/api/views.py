from django.shortcuts import render
from rest_framework import viewsets,generics, permissions
from .models import Preparaciones,MenuItem, Pedido
from .serializers import PreparacionesSerializer,MenuItemSerializer, PedidoSerializer

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
