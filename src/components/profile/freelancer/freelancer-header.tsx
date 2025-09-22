"use client"

import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

import { useRoutes } from "@/hooks/use-routes";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { FreelancerProp } from "@/types/personalization/profile-type";

type FreelancrHeaderProp = {
	profile: FreelancerProp;
	isOwnProfile: boolean;
}

export default function FreelancerHeader({ profile, isOwnProfile }: FreelancrHeaderProp) {
	const { back } = useRoutes();

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="sm" onClick={() => back()}>
						<ArrowLeft className="mr-2 w-4 h-4" />
						Back
					</Button>
					<h1 className="text-xl font-semibold">{isOwnProfile ? "My Profile" : `${profile.first_name}'s Profile`}</h1>
				</div>
				<div className="flex items-center gap-2">
					{isOwnProfile && (
						<Button variant="outline" size="sm" asChild>
							<Link href="/settings">
								<Settings className="mr-2 w-4 h-4" />
								Edit Profile
							</Link>
						</Button>
					)}

					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}