from django.shortcuts import render
from rest_framework import viewsets,generics, permissions
from .models import Preparaciones,MenuItem, Pedido
from .serializers import PreparacionesSerializer,MenuItemSerializer, PedidoSerializer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Count
from .models import PedidoItem
from collections import defaultdict



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


class ListarPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['encargado', 'administrador']:
            return Pedido.objects.all().order_by('-fecha')
        return Pedido.objects.none()
    

class ActualizarPedidoView(generics.UpdateAPIView):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    

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


class CrearPedidoView(generics.CreateAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)


class HistorialPedidosClienteView(generics.ListAPIView):

    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(cliente=self.request.user).order_by('-fecha')
    

class ActualizarDisponibilidadView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            menu_item = MenuItem.objects.get(pk=pk)
            disponible = request.data.get("disponible_hoy")

            if disponible is not None:
                menu_item.disponible_hoy = disponible
                menu_item.save()
                return Response({"message": "Disponibilidad actualizada"}, status=status.HTTP_200_OK)

            return Response({"error": "Falta el campo 'disponible_hoy'"}, status=status.HTTP_400_BAD_REQUEST)

        except MenuItem.DoesNotExist:
            return Response({"error": "Plato no encontrado"}, status=status.HTTP_404_NOT_FOUND)


class ResumenDiarioPedidos(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumen = defaultdict(lambda: {"total_pedidos": 0, "platos": defaultdict(int)})

        items = PedidoItem.objects.select_related('pedido', 'menu_item')

        for item in items:
            fecha = item.pedido.fecha.date().isoformat()
            resumen[fecha]["total_pedidos"] += 1
            resumen[fecha]["platos"][item.menu_item.nombre] += item.cantidad

        respuesta = []
        for fecha, data in resumen.items():
            platos = data["platos"]
            plato_mas_pedido = max(platos, key=platos.get)
            respuesta.append({
                "fecha": fecha,
                "total_pedidos": data["total_pedidos"],
                "plato_mas_pedido": plato_mas_pedido,
                "total_por_plato": platos
            })

            

        return Response(respuesta)
    

class ResumenEstadosPedidosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumen = Pedido.objects.values('estado').annotate(total=Count('id'))
        return Response(resumen)