"use client"

import { AuthGuard } from "@/components/auth-guard"
import { PostJobForm } from "@/components/post-job-form"

export default function PostJobPage() {
  return (
    <AuthGuard requiredUserType="employer">
      <PostJobForm />
    </AuthGuard>
  )
}
