"use client"

import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Search, Star } from "lucide-react";

import { getInitials } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import AvatarIcon from "@/components/common/AvatarIcon";

import { FilterFreelancersProp, MockFreelancerProp } from "@/types/dashboard/employer-type";
import { QUERIES } from '@/services/dashboard/employer-service';

export default function EmployerTalent() {
	const [search, setSearch] = useState<FilterFreelancersProp["search"]>("");

	const { data: freelancers, isFetching: freelancersFetching } = useQuery({
		queryKey: ['employer-freelancers', { search }],
		queryFn: () => QUERIES.fetchMockFreelancers({ search }),
		initialData: [] as MockFreelancerProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderFreelancers = freelancers.map((freelancer) => {
		const { id, avatar, name, title, rating, reviews, hourlyRate, skills, availability } = freelancer;

		const initials = getInitials(name);
		const avatarImg = avatar ?? "https://github.com/shadcn.png";

		const renderSkills = skills.slice(0, 3).map((skill) => {
			return (
				<Badge key={skill} variant="secondary" className="text-xs">
					{skill}
				</Badge>
			);
		})

		return (
			<Card key={id} className="hover:shadow-md transition-shadow">
				<CardContent className="p-6">
					<div className="mb-4 flex items-start space-x-4">
						<AvatarIcon
							src={avatarImg}
							fallback={initials}
							size="lg"
						/>

						<div className="flex-1">
							<h3 className="font-semibold">{name}</h3>
							<p className="text-sm text-muted-foreground">{title}</p>
							<div className="mt-1 flex items-center space-x-1">
								<Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
								<span className="text-sm font-medium">{rating}</span>
								<span className="text-sm text-muted-foreground">({reviews} reviews)</span>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm text-muted-foreground">Rate:</span>
							<span className="font-semibold">{hourlyRate}</span>
						</div>

						<div>
							<p className="text-sm text-muted-foreground mb-2">Skills:</p>
							<div className="flex flex-wrap gap-1">
								{renderSkills}
								{freelancer.skills.length > 3 && (
									<Badge variant="secondary" className="text-xs">
										+{freelancer.skills.length - 3}
									</Badge>
								)}
							</div>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-xs text-muted-foreground">{availability}</span>
						</div>

						<div className="flex space-x-2 pt-2">
							<Button size="sm" className="flex-1">
								Contact
							</Button>
							<Button size="sm" variant="outline">
								View Profile
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
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
				<ScrollArea className="h-128">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{renderFreelancers}
					</div>
				</ScrollArea>
			)}
		</>
	);
}