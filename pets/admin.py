from django.contrib import admin

from pets.models import Pet, Friendship

# Register your models here.

admin.site.register(Pet)
admin.site.register(Friendship)
