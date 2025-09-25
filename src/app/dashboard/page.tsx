"use client"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/use-auth";
import { useProfile } from "@/context/use-profile";

import { AuthGuard } from "@/components/authentication/auth-guard";
import { EmployerDashboard } from "@/components/dashboard/employer/employer-dashboard";
import { FreelancerDashboard } from "@/components/dashboard/freelancer/freelancer-dashboard";

import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";
import { QUERIES } from "@/services/personalization/profile-service";

export default function SettingsPage() {
	const [mounted, setMounted] = useState<boolean>(false);
	const { user } = useAuth();
	const { storeProfile } = useProfile();

	const { data: profileData, isFetching: profileFetching } = useQuery<FreelancerProp | EmployerProp | null>({
		queryKey: ['profile-information', user?.id],
		queryFn: user?.user_type === "freelancer"
			? () => QUERIES.fetchFreelancer(user?.id ?? 0)
			: () => QUERIES.fetchEmployer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (profileData && !profileFetching) {
			storeProfile(profileData);
		}
	}, [profileData, profileFetching, storeProfile]);

	if (!mounted) {
		return (
			<main className="flex items-center justify-center bg-background w-full min-h-screen">
			</main>
		);
	}

	return (
		profileFetching ? (
			<main className="flex items-center justify-center bg-background w-full min-h-screen">
				<div className="flex items-center">
					<svg
						fill="none"
						viewBox="0 0 24 24"
						className="mr-4 text-black dark:text-white animate-spin h-8 w-8"
					>
						<circle
							className="opacity-25"
							cx="12" cy="12" r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					<span className="text-2xl text-black dark:text-white">Loading...</span>
				</div>
			</main>
		) : (
			<AuthGuard>
				<DashboardContent />
			</AuthGuard>
		)
	);
}

function DashboardContent() {
	const { user } = useAuth();

	if (user?.user_type === "freelancer") {
		return <FreelancerDashboard />;
	} else if (user?.user_type === "employer") {
		return <EmployerDashboard />;
	}

	return null;
}