"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FreelancerDashboard } from "@/components/dashboard/freelancer/freelancer-dashboard"

export default function FreelancerDashboardPage() {
	return (
		// <AuthGuard requiredUserType="freelancer">
		<FreelancerDashboard />
		// </AuthGuard>
	)
}
