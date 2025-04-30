from django.db import models
from accounts.models import Person


class Pet(models.Model):
    SPECIES_CHOICES = [
        ("dog", "Dog"),
        ("cat", "Cat"),
        ("other", "Other"),
    ]

    owner = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="pets")
    friends = models.ManyToManyField(
        "self", through="Friendship", symmetrical=False, related_name="friend_of"
    )
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=20, choices=SPECIES_CHOICES, default="dog")
    breed = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    bio = models.TextField(blank=True)
    profile_pic = models.ImageField(upload_to="pet_profiles/", blank=True, null=True)

    def __str__(self):
        return (
            f"{self.name} ({self.owner.user.username}) ({self.get_species_display()})"
        )

    @property
    def friends_list(self):
        return self.friends.filter(
            friendships_received__status="accepted"
        ) | self.friends.filter(friendships_initiated__status="accepted")

    @property
    def sent_friend_requests(self):
        return Friendship.objects.filter(from_pet=self, status="pending")

    @property
    def received_friend_requests(self):
        return Friendship.objects.filter(to_pet=self, status="pending")


class Friendship(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    from_pet = models.ForeignKey(
        Pet, related_name="friendships_initiated", on_delete=models.CASCADE
    )
    to_pet = models.ForeignKey(
        Pet, related_name="friendships_received", on_delete=models.CASCADE
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("from_pet", "to_pet")

    def __str__(self):
        return f"{self.from_pet.name} → {self.to_pet.name} [{self.status}]"
