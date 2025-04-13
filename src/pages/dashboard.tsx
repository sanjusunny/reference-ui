import { useAppStore } from '@/store/app-store'

export function DashboardPage() {
  const { user } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome{user?.username ? `, ${user.username}` : ''}! This is your dashboard.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Tasks Overview</h3>
          <p className="text-muted-foreground">No tasks yet</p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <p className="text-muted-foreground">No recent activity</p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-medium">Quick Actions</h3>
          <p className="text-muted-foreground">No actions available</p>
        </div>
      </div>
    </div>
  )
} 