"use client"

import { AuthGuard } from "@/components/authentication/auth-guard"
import { MessagingSystem } from "@/components/messaging/messaging-system"

export default function MessagesPage() {
  return (
    <AuthGuard>
      <MessagingSystem />
    </AuthGuard>
  )
}
