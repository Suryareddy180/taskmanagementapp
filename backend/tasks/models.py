"""
Task model for the task management application.
"""
import uuid
from django.db import models


class Task(models.Model):
    """
    Task model representing a single task in the task management system.
    """
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text='Unique identifier for the task'
    )
    title = models.CharField(
        max_length=255,
        help_text='Title of the task'
    )
    description = models.TextField(
        blank=True,
        default='',
        help_text='Detailed description of the task'
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text='Priority level of the task'
    )
    category = models.CharField(
        max_length=100,
        blank=True,
        default='',
        help_text='Category or tag for the task'
    )
    due_date = models.DateField(
        help_text='Due date for the task'
    )
    completed = models.BooleanField(
        default=False,
        help_text='Whether the task is completed'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text='Timestamp when the task was created'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text='Timestamp when the task was last updated'
    )
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
    
    def __str__(self):
        return f"{self.title} ({self.priority})"
