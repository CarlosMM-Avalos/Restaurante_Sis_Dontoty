from rest_framework import serializers
from .models import Preparaciones

class PreparacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preparaciones
        fields = '__all__'

