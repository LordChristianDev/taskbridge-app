"use client"

import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Search } from "lucide-react";

import { createFullName, extractPriceAndPeriod, getInitials } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/common/separator";
import AvatarIcon from "@/components/common/avatar-icon";

import { FreelancerProp } from "@/types/personalization/profile-type";
import { QUERIES } from '@/services/dashboard/freelancer-service';
import Link from "next/link";


export default function EmployerTalent() {
	const [search, setSearch] = useState<string>("");

	const { data: freelancers, isFetching: freelancersFetching } = useQuery({
		queryKey: ['employer-talents', search],
		queryFn: () => QUERIES.fetchFilteredFreelancers(search),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Find Talent</h2>
				<div className="flex items-center space-x-2">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<Input
							placeholder="Search freelancers..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-10 w-64"
						/>
					</div>
				</div>
			</div>

			{freelancersFetching ? (
				<div className="animate-pulse">
					<div className="flex flex-wrap gap-6">
						<div className="flex-1 h-72 bg-muted rounded" />
						<div className="flex-1 h-72 bg-muted rounded" />
						<div className="flex-1 h-72 bg-muted rounded" />
					</div>
				</div>
			) : (
				<ScrollArea className="space-y-4 h-128">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{!freelancers || freelancers.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-64">
								<p className="text-sm text-muted-foreground">No talent found</p>
							</div>
						) : (
							freelancers.map((freelancer) => {
								return (<FreelancerCard key={freelancer.id} freelancer={freelancer} />);
							})
						)}
					</div>
				</ScrollArea>
			)}
		</>
	);
};

function FreelancerCard({ freelancer }: { freelancer: FreelancerProp }) {
	const { id, user_id, first_name, last_name, avatar_url, title, rate, specified_skills } = freelancer;

	const fullName = createFullName(first_name, last_name);
	const initials = getInitials(fullName);
	const currentRate = rate ? extractPriceAndPeriod(rate) : null;

	const renderSkills = specified_skills?.slice(0, 3).map((skill) => {
		const { value, title } = skill;
		return (
			<Badge key={value} variant="outline" className="text-xs">
				{title}
			</Badge>
		);
	});

	return (
		<Card key={id} className="hover:shadow-md transition-shadow">
			<CardContent className="px-6">
				<div className="mb-4 flex items-start space-x-4">
					<AvatarIcon
						src={avatar_url ?? "https://github.com/shadcn.png"}
						fallback={initials}
						size="lg"
					/>

					<div className="flex-1">
						<h3 className="font-semibold">{fullName}</h3>
						<p className="text-sm text-muted-foreground">{title}</p>
					</div>
				</div>

				<div className="space-y-3">
					{currentRate && <div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Rate:</span>
						<span className="font-semibold">{`₱ ${currentRate.number}/${currentRate.period}`}</span>
					</div>
					}

					<div className="mb-4 my-auto  flex space-x-2">
						<p className="text-sm text-muted-foreground mb-2">Skills:</p>
						<div className="flex flex-wrap gap-1">
							{renderSkills}
							{specified_skills && specified_skills.length > 3 && (
								<Badge variant="outline" className="text-xs">
									+{specified_skills.length - 3}
								</Badge>
							)}
						</div>
					</div>

					<Separator />

					<div className="flex space-x-2 pt-2 w-full">
						<Link
							href={`/profile/${user_id}?type=freelancer`}
							target="_blank"
							className="w-full"
						>
							<Button size="sm" variant="outline" className="w-full">
								View Profile
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};