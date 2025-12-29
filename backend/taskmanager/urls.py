"""
URL configuration for taskmanager project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health_check(request):
    """Health check endpoint for Railway deployment."""
    return JsonResponse({'status': 'healthy', 'service': 'Task Management API'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),
    path('health/', health_check, name='health_check'),
    path('', health_check, name='root'),
]
