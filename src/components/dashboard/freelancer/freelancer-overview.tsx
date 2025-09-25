"use client"

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Eye } from 'lucide-react';

import { useProfile } from '@/context/use-profile';
import {
	capitalizeFirstLetter,
	createFullName,
	getFreelancerStatusColor
} from "@/lib/utils";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';

import { JobProp } from '@/types/dashboard/job-type';
import { ProjectProp } from '@/types/dashboard/project-type';
import { FreelancerProp } from '@/types/personalization/profile-type';
import { QUERIES as JOB_QUERIES } from '@/services/dashboard/job-service';
import { QUERIES as PROJECT_QUERIES } from '@/services/dashboard/project-service';
import { QUERIES as PRROPOSAL_QUERIES } from '@/services/dashboard/proposal-service';

export default function FreelancerOverview() {
	const { profile } = useProfile();

	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['freelancer-overview-jobs'],
		queryFn: () => JOB_QUERIES.fetchJobsByCategories((profile as FreelancerProp).skills ?? []),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['freelancer-overview-projects'],
		queryFn: () => PROJECT_QUERIES.fetchProjectsByFreelancerId({ id: profile!.user_id }),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Dashboard Overview</h2>
			</div>

			{jobsFetching || projectsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex flex-wrap gap-6">
						<div className="flex-1 h-72 bg-muted rounded" />
						<div className="flex-1 h-72 bg-muted rounded" />
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Recent Job Matches */}
					<Card>
						<CardHeader>
							<CardTitle>Recommended Jobs</CardTitle>
							<CardDescription>Jobs that match your skills</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<ScrollArea className="space-y-4 h-96">
								{!jobs || jobs.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-64">
										<p className="text-sm text-muted-foreground">No jobs found</p>
									</div>
								) : (
									jobs.slice(0, 3).map((job) => {
										return (<JobCard key={job.id} job={job} />);
									})
								)}
							</ScrollArea>
						</CardContent>
					</Card>

					{/* Active Projects */}
					<Card>
						<CardHeader>
							<CardTitle>Active Projects</CardTitle>
							<CardDescription>Your current work in progress</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<ScrollArea className="space-y-4 h-96">
								{!projects || projects.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-64">
										<p className="text-sm text-muted-foreground">No projects found</p>
									</div>
								) : (
									projects
										.filter((p) => ["negotiation", "contract-signed", "preparing", "in-progress", "review", "revisions"].includes(p.status))
										.map((project) => {
											return (<ProjectCard key={project.id} project={project} />);
										})
								)}
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
};

function JobCard({ job }: { job: JobProp }) {
	const { id, title, min_budget, max_budget, duration, status } = job;

	const { data: proposals } = useQuery({
		queryKey: ['freelancer-job-proposals', id],
		queryFn: () => PRROPOSAL_QUERIES.fetchProposalsByJobId(id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: true,
		staleTime: 0,
	});

	const cname = getFreelancerStatusColor(status)

	return (
		<div key={id} className="p-4 flex items-start justify-between border rounded-lg">
			<div className="flex-1">
				<h4 className="mb-1 font-semibold text-sm">{title}</h4>
				<p className="mb-2 text-xs text-muted-foreground">
					{`₱ ${min_budget} - ${max_budget}`} • {duration}
				</p>
				<div className="flex items-center space-x-2">
					<Badge variant="outline" className={cname}>
						{capitalizeFirstLetter(status)}
					</Badge>
					<span className="text-xs text-muted-foreground">{proposals?.length} proposals</span>
				</div>
			</div>
			<Link href={`/job/${id}`} target='_blank'>
				<Button variant="ghost" size="sm">
					<Eye className="w-4 h-4" />
				</Button>
			</Link>

		</div>
	);
};

function ProjectCard({ project }: { project: ProjectProp }) {
	const { id, freelancer, project_status, job } = project;
	const { title } = job;
	const { first_name, last_name } = freelancer;

	const fullName = createFullName(first_name, last_name);
	const cname = getFreelancerStatusColor(project_status.value)

	return (
		<div key={id} className="p-4 border rounded-lg">
			<div className="flex items-start justify-between">
				<div>
					<h4 className="font-semibold text-sm">{title}</h4>
					<p className="text-xs text-muted-foreground">with {fullName}</p>
				</div>
				<Badge variant="outline" className={cname}>
					{project_status.label}
				</Badge>
			</div>
		</div>
	);
};
