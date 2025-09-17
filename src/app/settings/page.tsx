"use client"

import { useAuth } from "@/components/auth-guard"
import { AuthGuard } from "@/components/auth-guard"
import { FreelancerSettings } from "@/components/freelancer-settings"
import { EmployerSettings } from "@/components/employer-settings"

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  )
}

function SettingsContent() {
  const { user } = useAuth()

  if (user?.type === "freelancer") {
    return <FreelancerSettings />
  } else if (user?.type === "employer") {
    return <EmployerSettings />
  }

  return null
}
