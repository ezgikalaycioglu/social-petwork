from rest_framework import viewsets, permissions
from .models import Pet
from .serializers import PetSerializer


class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pet.objects.filter(owner__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.person)
