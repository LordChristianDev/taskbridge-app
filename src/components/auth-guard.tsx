"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  type: "employer" | "freelancer"
  company?: string
  bio?: string
  skills?: string
}

interface AuthGuardProps {
  children: React.ReactNode
  requiredUserType?: "employer" | "freelancer"
}

export function AuthGuard({ children, requiredUserType }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Check if user type matches required type
      if (requiredUserType && parsedUser.type !== requiredUserType) {
        // Redirect to correct dashboard
        if (parsedUser.type === "employer") {
          router.push("/employer/dashboard")
        } else {
          router.push("/freelancer/dashboard")
        }
        return
      }
    } else {
      // No user found, redirect to login
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [requiredUserType, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return <>{children}</>
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  return { user, logout }
}
