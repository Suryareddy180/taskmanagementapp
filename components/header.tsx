export function Header() {
  return (
    <header className="border-b border-border/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-lg">
      <div className="container mx-auto px-4 py-7">
        <div className="flex items-center gap-4">
          {/* Logo Icon */}
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          {/* Branding */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-gray-400 text-sm font-medium">Organize. Prioritize. Execute.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
