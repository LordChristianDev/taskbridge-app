"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/context/use-auth";
import { useRoutes } from "@/hooks/use-routes";
import { useProfile } from "@/context/use-profile";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { EmployerProfile } from "@/components/profile/employer/employer-profile";
import { FreelancerProfile } from "@/components/profile/freelancer/freelancer-profile";

import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";
import { QUERIES } from "@/services/personalization/profile-service";


export default function ProfilePage() {
	return (
		<AuthGuard>
			<ProfileContent />
		</AuthGuard>
	)
}

function ProfileContent() {
	const { user } = useAuth();
	const { back } = useRoutes();
	const { profile, storeProfile } = useProfile();

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
		if (profileData && !profileFetching) {
			storeProfile(profileData);
		}
	}, [profileData, profileFetching]);

	if (user?.user_type === "freelancer") {
		return (
			profileFetching
				? <div className="min-h-screen bg-background">
					<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
						<div className="container mx-auto px-4 py-4 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Button variant="ghost" size="sm" onClick={() => back()}>
									<ArrowLeft className="mr-2 w-4 h-4" />
									Back
								</Button>
								<h1 className="text-xl font-semibold">{"Profile"}</h1>
							</div>
							<div className="flex items-center gap-2">

								<ThemeToggle />
							</div>
						</div>
					</header>
					<div className="container mx-auto px-4 py-8">
						<div className="animate-pulse space-y-4">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
								<div className="lg:col-span-2 space-y-4">
									<div className="h-48 w-full bg-muted rounded"></div>
									<div className="h-48 w-full bg-muted rounded"></div>
								</div>
								<div className="lg:col-span-1 space-y-4">
									<div className="h-48 w-full bg-muted rounded"></div>
									<div className="h-48 w-full bg-muted rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				: <FreelancerProfile
					profile={profile as FreelancerProp}
					isOwnProfile={true}
				/>
		);
	} else if (user?.user_type === "employer") {
		return (
			profileFetching
				? <div className="min-h-screen bg-background">
					<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
						<div className="container mx-auto px-4 py-4 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Button variant="ghost" size="sm" onClick={() => back()}>
									<ArrowLeft className="mr-2 w-4 h-4" />
									Back
								</Button>
								<h1 className="text-xl font-semibold">{"Profile"}</h1>
							</div>
							<div className="flex items-center gap-2">

								<ThemeToggle />
							</div>
						</div>
					</header>
					<div className="container mx-auto px-4 py-8">
						<div className="animate-pulse space-y-4">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
								<div className="lg:col-span-2 space-y-4">
									<div className="h-48 w-full bg-muted rounded"></div>
									<div className="h-48 w-full bg-muted rounded"></div>
								</div>
								<div className="lg:col-span-1 space-y-4">
									<div className="h-48 w-full bg-muted rounded"></div>
									<div className="h-48 w-full bg-muted rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				: <EmployerProfile
					profile={profile as EmployerProp}
					isOwnProfile={true}
				/>
		);
	}

	return null
}
