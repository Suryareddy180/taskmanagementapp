"use client"

import type { Task } from "./dashboard"
import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: Task[]
  onSelectTask: (task: Task) => void
  onToggleComplete: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function TaskList({ tasks, onSelectTask, onToggleComplete, onDeleteTask }: TaskListProps) {
  // Sort tasks: incomplete first, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onSelect={onSelectTask}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}
