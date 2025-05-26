from django.shortcuts import render
from rest_framework import viewsets
from .models import Preparaciones
from .serializers import PreparacionesSerializer

# Create your views here.

class PreparacionesViewSet(viewsets.ModelViewSet):
    queryset = Preparaciones.objects.all()
    serializer_class = PreparacionesSerializer