import { Authenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useAppStore } from '@/store/app-store'
import '@aws-amplify/ui-react/styles.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppStore()
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex h-screen">
      {/* Left side (50%) - Image and app description */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary/10 p-8 md:flex">
        <div className="aspect-square max-w-md rounded-xl bg-muted/20" />
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">TaskMaster</h1>
          <p className="text-lg text-muted-foreground">
            A powerful task management application to keep you organized and productive.
          </p>
        </div>
      </div>

      {/* Right side (50%) - Authenticator */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <Authenticator loginMechanisms={['email']} />
      </div>
    </div>
  )
} 