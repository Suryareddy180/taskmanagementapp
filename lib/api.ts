/**
 * API utility functions for task management
 * Handles all backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskCreateUpdate {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string;
  completed: boolean;
}

/**
 * Fetch all tasks from the backend
 */
export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

/**
 * Create a new task
 */
export async function createTask(task: TaskCreateUpdate): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Update an existing task
 */
export async function updateTask(id: string, task: TaskCreateUpdate): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Delete a task
 */
export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskComplete(id: string): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle task: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling task:', error);
    throw error;
  }
}

/**
 * Get all unique categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get task statistics
 */
export async function fetchTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/stats/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}
