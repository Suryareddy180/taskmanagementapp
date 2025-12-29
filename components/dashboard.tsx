"use client"

import { useState, useEffect } from "react"
import { TaskList } from "./task-list"
import { TaskForm } from "./task-form"
import { TaskDetail } from "./task-detail"
import { DeleteConfirmation } from "./delete-confirmation"
import { Header } from "./header"
import { Filters } from "./filters"
import * as api from "@/lib/api"

export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  category: string
  dueDate: string
  completed: boolean
  createdAt: string
}

type View = "list" | "create" | "detail" | "edit"

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [view, setView] = useState<View>("list")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load tasks from backend API
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await api.fetchTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      console.error("Failed to load tasks:", err)
      setError("Failed to load tasks. Please ensure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesCategory = filterCategory === "all" || task.category === filterCategory
    return matchesSearch && matchesPriority && matchesCategory
  })

  const handleCreateTask = async (task: Omit<Task, "id" | "createdAt">) => {
    try {
      setError(null)
      const newTask = await api.createTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate,
        completed: task.completed,
      })
      setTasks([newTask, ...tasks])
      setView("list")
    } catch (err) {
      console.error("Failed to create task:", err)
      setError("Failed to create task. Please try again.")
    }
  }

  const handleUpdateTask = async (updated: Task) => {
    try {
      setError(null)
      const updatedTask = await api.updateTask(updated.id, {
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        category: updated.category,
        dueDate: updated.dueDate,
        completed: updated.completed,
      })
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
      setView("list")
      setSelectedTask(null)
    } catch (err) {
      console.error("Failed to update task:", err)
      setError("Failed to update task. Please try again.")
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      setError(null)
      await api.deleteTask(id)
      setTasks(tasks.filter((t) => t.id !== id))
      setDeleteConfirm(null)
      if (selectedTask?.id === id) {
        setView("list")
        setSelectedTask(null)
      }
    } catch (err) {
      console.error("Failed to delete task:", err)
      setError("Failed to delete task. Please try again.")
      setDeleteConfirm(null)
    }
  }

  const handleToggleComplete = async (id: string) => {
    try {
      setError(null)
      const updatedTask = await api.toggleTaskComplete(id)
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    } catch (err) {
      console.error("Failed to toggle task:", err)
      setError("Failed to update task status.")
    }
  }

  const categories = Array.from(new Set(tasks.map((t) => t.category).filter(Boolean)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-slate-700 border-t-emerald-500"></div>
          <p className="text-slate-400 text-lg font-medium">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-10">
        {view === "list" && (
          <>
            {/* Page Header */}
            <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="space-y-1">
                <h2 className="text-4xl font-bold text-slate-100">Your Tasks</h2>
                <p className="text-slate-400 text-sm">
                  {tasks.length === 0
                    ? "Get started by creating your first task"
                    : `${filteredTasks.length} of ${tasks.length} tasks`}
                </p>
              </div>
              <button
                onClick={() => {
                  setView("create")
                  setSelectedTask(null)
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 whitespace-nowrap"
              >
                + New Task
              </button>
            </div>

            {/* Filters */}
            <Filters
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categories={categories}
            />

            {/* Task List or Empty State */}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-b from-slate-800/50 to-slate-900/30 rounded-2xl border border-slate-700/30">
                <div className="mb-4 text-slate-400">
                  <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <p className="text-slate-300 text-lg font-medium mb-2">No tasks found</p>
                <p className="text-slate-500 text-sm">
                  {tasks.length === 0
                    ? "Create your first task to get started!"
                    : "Try adjusting your filters or search terms"}
                </p>
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onSelectTask={(task) => {
                  setSelectedTask(task)
                  setView("detail")
                }}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={(id) => setDeleteConfirm(id)}
              />
            )}
          </>
        )}

        {view === "create" && (
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setView("list")} categories={categories} />
        )}

        {view === "detail" && selectedTask && (
          <TaskDetail
            task={selectedTask}
            onEdit={() => setView("edit")}
            onDelete={() => setDeleteConfirm(selectedTask.id)}
            onBack={() => {
              setView("list")
              setSelectedTask(null)
            }}
          />
        )}

        {view === "edit" && selectedTask && (
          <TaskForm
            initialTask={selectedTask}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setView("detail")
            }}
            categories={categories}
            isEditing
          />
        )}

        {deleteConfirm && (
          <DeleteConfirmation
            onConfirm={() => handleDeleteTask(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </div>
  )
}
