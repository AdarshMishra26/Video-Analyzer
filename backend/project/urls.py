# backend/project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('transcript_bot.urls')),  # Include transcript_bot app URLs
]
