from django.shortcuts import render
from rest_framework import viewsets,generics, permissions
from .models import Preparaciones,MenuItem, Pedido
from .serializers import PreparacionesSerializer,MenuItemSerializer, PedidoSerializer
from rest_framework.permissions import IsAuthenticated
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

        
#BORRAR
# class MenuItemCreateListView(generics.ListCreateAPIView):
#      queryset = MenuItem.objects.all()
#      serializer_class = MenuItemSerializer
#      permission_classes = [IsAuthenticated]


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
    

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer