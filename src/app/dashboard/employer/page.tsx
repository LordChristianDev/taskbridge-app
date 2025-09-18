"use client"

import { AuthGuard } from "@/components/auth-guard";
import { EmployerDashboard } from "@/components/dashboard/employer/employer-dashboard";

export default function EmployerDashboardPage() {
	return (
		// <AuthGuard requiredUserType="employer">
		<EmployerDashboard />
		// </AuthGuard >s
	)
}
