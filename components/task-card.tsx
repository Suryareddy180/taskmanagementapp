"use client"

import type { Task } from "./dashboard"

interface TaskCardProps {
  task: Task
  onSelect: (task: Task) => void
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onSelect, onToggleComplete, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10",
      medium: "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-amber-500/10",
      high: "bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-rose-500/10",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const getDaysLeft = () => {
    const daysLeft = Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysLeft
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer group ${
        task.completed
          ? "bg-slate-900/60 border-slate-700/40 hover:border-slate-600/60"
          : "bg-slate-800/80 border-slate-700/60 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/15"
      }`}
      onClick={() => onSelect(task)}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          task.completed ? "bg-slate-900/0" : "bg-gradient-to-br from-emerald-500/5 to-transparent"
        }`}
      />

      <div className="relative p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base transition-all duration-200 leading-snug ${
                task.completed ? "text-slate-500 line-through" : "text-slate-100 group-hover:text-emerald-300"
              }`}
            >
              {task.title}
            </h3>
          </div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation()
              onToggleComplete(task.id)
            }}
            className="w-5 h-5 cursor-pointer rounded border-slate-600 bg-slate-700 accent-emerald-500 mt-0.5 flex-shrink-0"
          />
        </div>

        {/* Description */}
        {task.description && (
          <p className={`text-sm leading-relaxed line-clamp-2 ${task.completed ? "text-slate-600" : "text-slate-400"}`}>
            {task.description}
          </p>
        )}

        {/* Priority and Category Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${getPriorityColor(task.priority)} shadow-sm`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          {task.category && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-300 font-medium shadow-sm">
              {task.category}
            </span>
          )}
        </div>

        {/* Due Date and Delete */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className={`font-medium ${isOverdue ? "text-rose-400 font-semibold" : "text-slate-500"}`}>
            {isOverdue ? `Overdue by ${Math.abs(getDaysLeft())} days` : `Due in ${getDaysLeft()} days`}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
            className="text-slate-500 hover:text-rose-400 transition-colors duration-200 hover:scale-110 active:scale-95"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
