"use client"

import type { Task } from "./dashboard"

interface TaskDetailProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export function TaskDetail({ task, onEdit, onDelete, onBack }: TaskDetailProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
      medium: "bg-amber-500/15 border-amber-500/40 text-amber-300",
      high: "bg-rose-500/15 border-rose-500/40 text-rose-300",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const getDaysLeft = () => {
    const daysLeft = Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysLeft
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed
  const createdDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const dueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-emerald-400 hover:text-emerald-300 mb-6 flex items-center gap-2 transition-all duration-200 hover:gap-3 font-medium"
      >
        <span>←</span> Back to Tasks
      </button>

      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/60 p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-slate-100 break-words leading-tight">{task.title}</h1>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getPriorityColor(task.priority)}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
            {task.description && <p className="text-slate-400 text-lg leading-relaxed">{task.description}</p>}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
          {/* Category */}
          {task.category && (
            <div className="space-y-1.5">
              <p className="text-slate-400 text-sm font-semibold">Category</p>
              <p className="text-slate-100 text-base font-medium">{task.category}</p>
            </div>
          )}

          {/* Due Date */}
          <div className="space-y-1.5">
            <p className="text-slate-400 text-sm font-semibold">Due Date</p>
            <div className="flex flex-col gap-1">
              <p className={`text-base font-medium ${isOverdue ? "text-rose-400" : "text-slate-100"}`}>{dueDate}</p>
              {isOverdue ? (
                <span className="text-rose-400 text-sm font-semibold">Overdue by {Math.abs(getDaysLeft())} days</span>
              ) : (
                <span className="text-slate-500 text-sm">{getDaysLeft()} days left</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <p className="text-slate-400 text-sm font-semibold">Status</p>
            <p className={`text-base font-semibold ${task.completed ? "text-emerald-400" : "text-amber-400"}`}>
              {task.completed ? "Completed" : "In Progress"}
            </p>
          </div>

          {/* Created Date */}
          <div className="space-y-1.5">
            <p className="text-slate-400 text-sm font-semibold">Created</p>
            <p className="text-slate-100 text-base font-medium">{createdDate}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onEdit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95"
          >
            Edit Task
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-6 py-3 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 rounded-lg font-semibold border border-rose-500/40 transition-all duration-200 active:scale-95"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}
