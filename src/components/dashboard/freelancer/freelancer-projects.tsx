import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";

import { getFreelancerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MockActiveProjectProp } from "@/types/dashboard/freelancer-type";
import { QUERIES } from "@/services/dashboard/freelancer-service";

export default function FreelancerProjects() {
	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['freelancer-active-projects'],
		queryFn: () => QUERIES.fetchMockActiveProjects(),
		initialData: [] as MockActiveProjectProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderProjects = projects.map((project) => {
		const { id, title, client, budget, deadline, lastUpdate, progress, status } = project;
		const cname = getFreelancerStatusColor(status);

		return (
			<Card key={id} className="mb-6 mr-4">
				<CardContent className="p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold mb-1">{title}</h3>
							<p className="text-sm text-muted-foreground mb-3">Working for {client}</p>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
								<div>
									<p className="text-xs text-muted-foreground">Budget</p>
									<p className="font-semibold">{budget}</p>
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Deadline</p>
									<p className="font-semibold">{deadline}</p>
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Progress</p>
									<p className="font-semibold">{progress}%</p>
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Last Update</p>
									<p className="font-semibold">{lastUpdate}</p>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Progress</span>
									<span>{progress}%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div
										className="bg-primary h-2 rounded-full"
										style={{ width: `${progress}%` }}
									></div>
								</div>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Badge variant="outline" className={cname}>
								{status}
							</Badge>

							<Button variant="ghost" size="sm">
								<MessageSquare className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</CardContent>
			</ Card>
		);
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Active Projects</h2>
			</div>

			{projectsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex-1 h-72 bg-muted rounded" />
				</div>
			) : (
				<ScrollArea className="space-y-4 h-128">
					{renderProjects}
				</ScrollArea>
			)}
		</>
	);
}