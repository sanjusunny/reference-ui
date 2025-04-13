import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
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
        <Authenticator 
          loginMechanisms={['email']}
          components={{
            SignIn: {
              Header() {
                return (
                  <div className="space-y-2 mb-2 ml-8">
                    <h2 className="text-3xl font-medium text-black">Sign In</h2>
                    <p className="text-muted-foreground text-sm">
                      Enter your credentials to access your account
                    </p>
                  </div>
                );
              },
              Footer() {
                const { toSignUp, toForgotPassword } = useAuthenticator();
                return (
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <button onClick={toForgotPassword} className="text-blue-500">Forgot password?</button>
                    <p>
                      Don't have an account? <button onClick={toSignUp} className="text-blue-500">Sign up</button>
                    </p>
                  </div>
                );
              }
            },
            SignUp: {
              Header() {
                return (
                  <div className="space-y-2 mb-2 ml-8">
                    <h2 className="text-3xl font-medium text-black">Sign Up</h2>
                    <p className="text-muted-foreground text-sm">
                      Create a new account to get started
                    </p>
                  </div>
                );
              },
              Footer() {
                const { toSignIn } = useAuthenticator();
                return (
                  <p className="text-muted-foreground text-xs">
                    Already have an account? <button onClick={toSignIn} className="text-blue-500">Sign in</button>
                  </p>
                );
              }
            }
          }}
        />
      </div>
    </div>
  )
} 