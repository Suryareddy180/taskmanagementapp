"use client"

interface DeleteConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-8 max-w-sm w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-100 mb-3">Delete Task?</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          This action cannot be undone. The task will be permanently deleted from your list.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-rose-500/90 hover:bg-rose-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-rose-500/25 active:scale-95"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all duration-200 border border-slate-600/50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
