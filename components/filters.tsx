"use client"

interface FiltersProps {
  filterPriority: string
  setFilterPriority: (priority: string) => void
  filterCategory: string
  setFilterCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  categories: string[]
}

export function Filters({
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  categories,
}: FiltersProps) {
  return (
    <div className="mb-8 space-y-4 animate-fade-in-up">
      {/* Search Bar */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
        />
        <svg
          className="absolute right-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 font-medium"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* Category Filter */}
        {categories.length > 0 && (
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Clear Filters Button */}
        {(filterPriority !== "all" || filterCategory !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setFilterPriority("all")
              setFilterCategory("all")
              setSearchQuery("")
            }}
            className="px-4 py-2.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all duration-200 border border-slate-600/50 whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}
