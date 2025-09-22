"use client"

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from '@tanstack/react-query'
import { LogOut, Settings, User } from "lucide-react";

import { useAuth } from "@/context/use-auth";
import { useProfile } from "@/context/use-profile";
import { useRoutes } from "@/hooks/use-routes";
import { createFullName, getInitials } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AvatarIcon from "@/components/common/avatar-icon";

import { FreelancerProp } from "@/types/personalization/profile-type";
import { QUERIES } from "@/services/personalization/profile-service";

export default function FreelancerAppbar() {
	const { move } = useRoutes();
	const { user, signOut } = useAuth();
	const { profile, storeProfile, clearOut } = useProfile();

	const { data: freelancer, isFetching: freelancerFetching } = useQuery({
		queryKey: ['freelancer-profile-appbar', user?.id],
		queryFn: () => QUERIES.fetchFreelancer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	const { first_name, last_name, avatar_url } = profile ?? {} as FreelancerProp;

	const fullName = createFullName(first_name, last_name);
	const initials = getInitials(fullName);

	const avatar = avatar_url ?? "https://github.com/shadcn.png";

	useEffect(() => {
		if (freelancer && !freelancerFetching) {
			storeProfile(freelancer);
		}
	}, [freelancer, freelancerFetching]);

	const handleSignOut = async () => {
		move("/login");
		await signOut();
		clearOut();
	}
	return (
		<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-background/80">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Link href="/dashboard/employer" className="flex items-center space-x-2">
						<div className="flex items-center space-x-2">
							<div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
								<Image
									src="/taskbridge_white.png"
									alt="logo"
									width={250}
									height={250}
								/>
							</div>
							<span className="text-xl font-bold text-foreground">TaskBridge</span>
						</div>
					</Link>

					<Badge variant="secondary">Freelancer</Badge>
				</div>

				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="ring-2 ring-primary/80 h-10 w-10 rounded-full cursor-pointer overflow-hidden">
									{freelancerFetching ? (
										< div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
									) : (
										<AvatarIcon
											src={avatar}
											fallback={initials}
										/>
									)}
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<div className="py-2 px-4 flex items-center justify-start gap-3">
									{freelancerFetching ? (
										<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
									) : (
										<AvatarIcon
											src={avatar}
											fallback={initials}
										/>
									)}
									<div className="text-sm font-medium">
										{freelancerFetching ? "Loading..." : first_name}
									</div>
								</div>

								{/* View Profile */}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => move('/profile')}>
									<div className='flex gap-2'>
										<User className="mr-2 h-4 w-4" />
										<span className='text-sm'>View Profile</span>
									</div>
								</DropdownMenuItem>

								{/* Settings */}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => move('/settings')}>
									<div className='flex gap-2'>
										<Settings className="mr-2 h-4 w-4" />
										<span className='text-sm'>Settings</span>
									</div>
								</DropdownMenuItem>

								{/* Logout */}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleSignOut} className="text-red-600">
									<div className='flex gap-2'>
										<LogOut className="mr-2 h-4 w-4" />
										<span className='!text-sm'>Log out</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}