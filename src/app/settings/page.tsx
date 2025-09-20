"use client"

import { useAuth } from "@/context/useAuth"
import { useRoutes } from "@/hooks/useRoutes"

import { AuthGuard } from "@/components/authentication/auth-guard"
import { FreelancerSettings } from "@/components/settings/freelancer-settings"
import { EmployerSettings } from "@/components/settings/employer-settings"

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  )
}

function SettingsContent() {
  const { user, signOut } = useAuth();
  const { move } = useRoutes();

  if (user?.user_type === "freelancer") {
    return <FreelancerSettings />
  } else if (user?.user_type === "employer") {
    return <EmployerSettings />
  } else {
    signOut();
    move("/login");
  }

  return null
}
