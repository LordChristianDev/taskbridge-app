"use client"

import { useAuth } from "@/context/useAuth";

import { AuthGuard } from "@/components/authentication/auth-guard";
import { EmployerDashboard } from "@/components/dashboard/employer/employer-dashboard";
import { FreelancerDashboard } from "@/components/dashboard/freelancer/freelancer-dashboard";

export default function SettingsPage() {
	return (
		<AuthGuard>
			<DashboardContent />
		</AuthGuard>
	)
}

function DashboardContent() {
	const { user } = useAuth();

	if (user?.user_type === "freelancer") {
		return (<FreelancerDashboard />);
	} else if (user?.user_type === "employer") {
		return (<EmployerDashboard />);
	}

	return null;
}
