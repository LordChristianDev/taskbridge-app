"use client"

import { AuthGuard } from "@/components/auth-guard"
import { MessagingSystem } from "@/components/messaging-system"

export default function MessagesPage() {
  return (
    <AuthGuard>
      <MessagingSystem />
    </AuthGuard>
  )
}
