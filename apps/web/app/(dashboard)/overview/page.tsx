/**
 * Dashboard Overview Page
 * Inspiration: Linear, Notion, Supabase, Mercury
 * 
 * Features:
 * - Progress bar (0-100% business formation)
 * - Task list with checkboxes
 * - Quick actions
 * - Activity feed
 * - Stats cards
 */

export default function DashboardOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span>Business Formation Progress</span>
          <span>45%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Business Status</div>
          <div className="text-2xl font-bold">LLC Approved ✅</div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Website Status</div>
          <div className="text-2xl font-bold">Live 🌐</div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Next Step</div>
          <div className="text-2xl font-bold">Open Bank Account</div>
        </div>
      </div>

      {/* Task List */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="space-y-2">
          {['LLC Formation', 'EIN Registration', 'Website Creation', 'Bank Account'].map((task, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" checked={i < 2} readOnly />
              <span className={i < 2 ? 'line-through text-muted-foreground' : ''}>
                {task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

