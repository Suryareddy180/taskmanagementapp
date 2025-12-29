"""
Admin configuration for Task model.
"""
from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """Admin interface for Task model."""
    
    list_display = [
        'title',
        'priority',
        'category',
        'due_date',
        'completed',
        'created_at',
    ]
    list_filter = [
        'priority',
        'completed',
        'category',
        'created_at',
    ]
    search_fields = [
        'title',
        'description',
        'category',
    ]
    ordering = ['-created_at']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Task Information', {
            'fields': ('title', 'description', 'category')
        }),
        ('Status', {
            'fields': ('priority', 'completed', 'due_date')
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
