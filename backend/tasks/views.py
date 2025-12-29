"""
API views for Task CRUD operations.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer, TaskCreateUpdateSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Task CRUD operations.
    
    Endpoints:
    - GET /api/tasks/ - List all tasks
    - POST /api/tasks/ - Create a new task
    - GET /api/tasks/{id}/ - Retrieve a specific task
    - PUT /api/tasks/{id}/ - Update a task
    - PATCH /api/tasks/{id}/ - Partial update a task
    - DELETE /api/tasks/{id}/ - Delete a task
    - PATCH /api/tasks/{id}/toggle/ - Toggle task completion status
    """
    
    queryset = Task.objects.all()
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action in ['create', 'update', 'partial_update']:
            return TaskCreateUpdateSerializer
        return TaskSerializer
    
    def list(self, request):
        """
        List all tasks, optionally filtered by query parameters.
        
        Query Parameters:
        - priority: Filter by priority (low, medium, high)
        - category: Filter by category
        - completed: Filter by completion status (true/false)
        - search: Search in title and description
        """
        queryset = self.get_queryset()
        
        # Filter by priority
        priority = request.query_params.get('priority')
        if priority and priority != 'all':
            queryset = queryset.filter(priority=priority)
        
        # Filter by category
        category = request.query_params.get('category')
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        
        # Filter by completion status
        completed = request.query_params.get('completed')
        if completed is not None:
            queryset = queryset.filter(completed=completed.lower() == 'true')
        
        # Search in title and description
        search = request.query_params.get('search')
        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        """Create a new task."""
        serializer = TaskCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(
                TaskSerializer(task).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """Update an existing task."""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = TaskCreateUpdateSerializer(task, data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(TaskSerializer(task).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk=None):
        """Partial update of a task."""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = TaskCreateUpdateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            task = serializer.save()
            return Response(TaskSerializer(task).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['patch'])
    def toggle(self, request, pk=None):
        """Toggle the completion status of a task."""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        task.completed = not task.completed
        task.save()
        return Response(TaskSerializer(task).data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all unique categories."""
        categories = Task.objects.exclude(
            category=''
        ).values_list('category', flat=True).distinct()
        return Response(list(categories))
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get task statistics."""
        total = Task.objects.count()
        completed = Task.objects.filter(completed=True).count()
        pending = total - completed
        
        # Count by priority
        high_priority = Task.objects.filter(priority='high', completed=False).count()
        medium_priority = Task.objects.filter(priority='medium', completed=False).count()
        low_priority = Task.objects.filter(priority='low', completed=False).count()
        
        return Response({
            'total': total,
            'completed': completed,
            'pending': pending,
            'byPriority': {
                'high': high_priority,
                'medium': medium_priority,
                'low': low_priority,
            }
        })
