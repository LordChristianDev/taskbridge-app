"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { useAuth } from "@/context/use-auth"
import { useRoutes } from "@/hooks/use-routes"

interface AuthGuardProps {
  children: React.ReactNode;
  requiredUserType?: "employer" | "freelancer";
}

export function AuthGuard({ children, requiredUserType }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { move } = useRoutes();

  useEffect(() => {
    if (user) {
      // Check if user type matches required type
      if (requiredUserType && user.user_type !== requiredUserType) {
        move("/dashboard")
      }
    } else {
      // No user found, redirect to login
      signOut();
      move("/login")
    }

    setIsLoading(false)
  }, [requiredUserType, move])

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

