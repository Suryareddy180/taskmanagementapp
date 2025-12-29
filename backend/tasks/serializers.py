"""
Serializers for the Task model.
"""
from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for Task model with camelCase field mapping for frontend compatibility.
    """
    
    # Map snake_case to camelCase for frontend
    dueDate = serializers.DateField(source='due_date')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'priority',
            'category',
            'dueDate',
            'completed',
            'createdAt',
            'updatedAt',
        ]
        read_only_fields = ['id', 'createdAt', 'updatedAt']
    
    def to_representation(self, instance):
        """
        Convert the instance to a dictionary for serialization.
        Ensures dates are formatted correctly for the frontend.
        """
        data = super().to_representation(instance)
        # Format dueDate as YYYY-MM-DD string
        if data.get('dueDate'):
            data['dueDate'] = str(data['dueDate'])
        # Format createdAt as ISO string
        if data.get('createdAt'):
            data['createdAt'] = instance.created_at.isoformat()
        return data


class TaskCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating tasks.
    Accepts camelCase input from frontend.
    """
    
    dueDate = serializers.DateField(source='due_date')
    
    class Meta:
        model = Task
        fields = [
            'title',
            'description',
            'priority',
            'category',
            'dueDate',
            'completed',
        ]
    
    def validate_priority(self, value):
        """Ensure priority is one of the valid choices."""
        valid_priorities = ['low', 'medium', 'high']
        if value not in valid_priorities:
            raise serializers.ValidationError(
                f"Priority must be one of: {', '.join(valid_priorities)}"
            )
        return value
