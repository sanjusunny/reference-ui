import { ReactNode } from 'react'
import { Outlet, Navigate } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { useAppStore } from '@/store/app-store'
import { SidebarProvider } from '@/components/ui/sidebar'

interface PrivateLayoutProps {
  children?: ReactNode
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isAuthenticated, isLoading } = useAppStore()

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </SidebarProvider>
  )
} 