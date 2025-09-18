"use client"

import { AuthGuard } from "@/components/auth-guard";
import { EmployerDashboard } from "@/components/employer-dashboard";

export default function EmployerDashboardPage() {
	return (
		<EmployerDashboard />
		// <AuthGuard requiredUserType="employer">

		// </AuthGuard >s
	)
}
