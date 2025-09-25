"use client"

import { useAuth } from "@/context/use-auth"

import { AuthGuard } from "@/components/authentication/auth-guard"
import { FreelancerSettings } from "@/components/settings/freelancer/freelancer-settings"
import { EmployerSettings } from "@/components/settings/employer/employer-settings"

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  )
}

function SettingsContent() {
  const { user } = useAuth();

  if (user?.user_type === "freelancer") {
    return (<FreelancerSettings />);
  } else if (user?.user_type === "employer") {
    return (<EmployerSettings />)
  }

  return null
}
