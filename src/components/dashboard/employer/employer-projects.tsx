"use client"

import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";

import { useProfile } from "@/context/use-profile";
import { createFullName, formatIsoString, formDateTimeString, getEmployerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

import { ProjectProp } from "@/types/dashboard/project-type";
import { QUERIES } from "@/services/dashboard/project-service";

export default function EmployerProjects() {
	const { profile } = useProfile();

	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['employer-projects'],
		queryFn: () => QUERIES.fetchProjectsByEmployerId({ id: profile!.user_id }),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Projects</h2>
			</div>

			{projectsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex-1 h-72 bg-muted rounded" />
				</div>
			) : (
				<ScrollArea className="space-y-4 h-128">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{!projects || projects.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-64">
								<p className="text-sm text-muted-foreground">No projects found</p>
							</div>
						) : (
							projects.map((project) => {
								return (<ProjectCard key={project.id} project={project} />);
							})
						)}
					</div>
				</ScrollArea >
			)}
		</>
	);
};

function ProjectCard({ project }: { project: ProjectProp }) {
	const { id, started_at, updated_at, deadline, project_status, job, freelancer, proposal } = project;
	const { title } = job;
	const { first_name, last_name } = freelancer;
	const { proposed_budget } = proposal;

	const fullName = createFullName(first_name, last_name);
	const last_update = updated_at ? formatIsoString(updated_at) : formatIsoString(started_at)
	const current_deadline = formDateTimeString(deadline);
	const cname = getEmployerStatusColor(project_status.value);

	return (
		<Card key={id} className='mb-6 mr-4'>
			<CardContent className="px-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h3 className="text-lg font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground mb-3">Working with {fullName}</p>
					</div>

					<div className="flex items-center space-x-2">
						<Badge variant="outline" className={cname}>
							{project_status.label}
						</Badge>

						<Button variant="ghost" size="sm">
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</div>
				</div>

				<div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div>
							<p className="text-xs text-muted-foreground">Budget</p>
							<p className="text-sm font-semibold">₱ {proposed_budget}</p>
						</div>

						<div>
							<p className="text-xs text-muted-foreground">Deadline</p>
							<p className="text-sm font-semibold">{current_deadline}</p>
						</div>

						<div>
							<p className="text-xs text-muted-foreground">Last Update</p>
							<p className="text-sm font-semibold">{last_update}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};