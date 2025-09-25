"use client"

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Plus, Eye } from "lucide-react";

import { useProfile } from '@/context/use-profile';
import { capitalizeFirstLetter, createFullName, getEmployerStatusColor } from "@/lib/utils";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';

import { JobProp } from '@/types/dashboard/job-type';
import { ProjectProp } from '@/types/dashboard/project-type';
import { QUERIES as JOB_QUERIES } from '@/services/dashboard/job-service';
import { QUERIES as PROJECT_QUERIES } from '@/services/dashboard/project-service';
import { QUERIES as PRROPOSAL_QUERIES } from '@/services/dashboard/proposal-service';

export default function EmployerOverview() {
	const { profile } = useProfile();

	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['employer-overview-jobs'],
		queryFn: () => JOB_QUERIES.fetchJobsByEmployerId(profile!.user_id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
	});

	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['employer-overview-projects'],
		queryFn: () => PROJECT_QUERIES.fetchProjectsByEmployerId({ id: profile!.user_id }),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Dashboard Overview</h2>
				<Link href="/job/post">
					<Button>
						<Plus className="w-4 h-4" />
						Post New Job
					</Button>
				</Link>
			</div>

			{jobsFetching || projectsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex flex-wrap gap-6">
						<div className="flex-1 h-72 bg-muted rounded" />
						<div className="flex-1 h-72 bg-muted rounded" />
					</div>
				</div>
			) : (
				<div className="flex flex-wrap gap-6">
					{/* Recent Jobs */}
					<Card className='flex-1'>
						<CardHeader>
							<CardTitle>Recent Jobs</CardTitle>
							<CardDescription>Your latest job postings</CardDescription>
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
					<Card className='flex-1'>
						<CardHeader>
							<CardTitle>Active Projects</CardTitle>
							<CardDescription>Projects currently in progress</CardDescription>
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
				</div >
			)}
		</>
	);
};

function JobCard({ job }: { job: JobProp }) {
	const { id, title, min_budget, max_budget, duration, status } = job;

	const { data: proposals } = useQuery({
		queryKey: ['employer-job-proposals', id],
		queryFn: () => PRROPOSAL_QUERIES.fetchProposalsByJobId(id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: true,
		staleTime: 0,
	});

	const cname = getEmployerStatusColor(status)

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
	const cname = getEmployerStatusColor(project_status.value)

	return (
		<div key={id} className="p-4 border rounded-lg">
			<div className="mb-3 flex items-start justify-between">
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
