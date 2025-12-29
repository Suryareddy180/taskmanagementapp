"use client"

import type React from "react"
import { useState } from "react"
import type { Task } from "./dashboard"

interface TaskFormProps {
  initialTask?: Task
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void
  onCancel: () => void
  categories: string[]
  isEditing?: boolean
}

export function TaskForm({ initialTask, onSubmit, onCancel, categories, isEditing = false }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "")
  const [description, setDescription] = useState(initialTask?.description || "")
  const [priority, setPriority] = useState(initialTask?.priority || "medium")
  const [category, setCategory] = useState(initialTask?.category || "")
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || "")
  const [newCategory, setNewCategory] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!dueDate) newErrors.dueDate = "Due date is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const finalCategory = newCategory || category

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority: priority as "low" | "medium" | "high",
      category: finalCategory,
      dueDate,
      completed: initialTask?.completed || false,
    })
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700/60 p-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">{isEditing ? "Edit Task" : "Create New Task"}</h2>
          <p className="text-slate-400 text-sm">
            Fill in the details below to {isEditing ? "update your" : "create a new"} task
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2.5">Task Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive task title"
              className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${
                errors.title ? "border-rose-500/50" : "border-slate-600/50"
              }`}
            />
            {errors.title && <p className="text-rose-400 text-sm mt-2 font-medium">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this task..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none transition-all duration-200"
            />
          </div>

          {/* Priority and Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2.5">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2.5">Due Date *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border transition-all duration-200 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${
                  errors.dueDate ? "border-rose-500/50" : "border-slate-600/50"
                }`}
              />
              {errors.dueDate && <p className="text-rose-400 text-sm mt-2 font-medium">{errors.dueDate}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2.5">Category</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  {categories.length > 0 ? (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="">Create new...</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                    />
                  )}
                </div>
              </div>
              {categories.length > 0 && !category && (
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Or create a new category"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              {isEditing ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all duration-200 border border-slate-600/50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
