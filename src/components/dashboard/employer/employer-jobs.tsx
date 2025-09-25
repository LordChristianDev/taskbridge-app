"use client"

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Eye, MoreHorizontal, Plus } from "lucide-react";

import { useProfile } from '@/context/use-profile';
import { capitalizeFirstLetter, formatIsoString, getEmployerStatusColor } from "@/lib/utils";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from "@/components/ui/card";

import { JobProp } from '@/types/dashboard/job-type';
import { QUERIES as JOB_QUERIES } from '@/services/dashboard/job-service';
import { QUERIES as PRROPOSAL_QUERIES } from '@/services/dashboard/proposal-service';

export default function EmployerJobs() {
	const { profile } = useProfile();

	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['employer-jobs'],
		queryFn: () => JOB_QUERIES.fetchJobsByEmployerId(profile!.user_id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Jobs</h2>
				<Link href="/job/post" >
					<Button>
						<Plus className="w-4 h-4" />
						Post New Job
					</Button>
				</Link>
			</div>

			{jobsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex-1 h-72 bg-muted rounded" />
				</div>
			) : (
				<ScrollArea className="space-y-4 h-128">
					{!jobs || jobs.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-64">
							<p className="text-sm text-muted-foreground">No jobs found</p>
						</div>
					) : (
						jobs.map((job) => {
							return (<JobCard key={job.id} job={job} />);
						})
					)}
				</ScrollArea>
			)}
		</>
	);
};

function JobCard({ job }: { job: JobProp }) {
	const { id, created_at, title, description, min_budget, max_budget, duration, status, categories } = job;

	const { data: proposals, isFetching: proposalsFetching } = useQuery({
		queryKey: ['employer-job-proposals', id],
		queryFn: () => PRROPOSAL_QUERIES.fetchProposalsByJobId(id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: true,
		staleTime: 0,
	});

	const cname = getEmployerStatusColor(status);
	const posted_at = formatIsoString(created_at);
	const skills = categories ?? [];

	const jobSkills = skills.map((cat) => {
		const { value, title } = cat;
		return (<Badge key={value} variant="secondary">{title}</Badge>);
	});

	return (
		<Card key={id} className='mb-6 mr-4'>
			<CardContent className="px-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h3 className="text-lg font-semibold mb-2">{title}</h3>
						<p className="text-muted-foreground mb-3">{description}</p>
						<div className="flex flex-wrap gap-2 mb-3">
							{jobSkills}
						</div>

						<div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
							<span>{`₱ ${min_budget} - ${max_budget}`}</span>
							<span>{duration}</span>
							{proposalsFetching ? (
								<span>Checking...</span>
							) : (
								<span>
									{!proposals?.length || proposals?.length === 0
										? "No proposals yet"
										: proposals.length > 1
											? `${proposals.length} proposals`
											: "1 proposal"}
								</span>
							)}
						</div>

						<span>Posted: {posted_at}</span>
					</div>

					<div className="flex items-center space-x-2">
						<Badge variant="outline" className={cname}>
							{capitalizeFirstLetter(status)}
						</Badge>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm">
									<MoreHorizontal className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Link href={`/job/${id}`} target='_blank' rel="noopener noreferrer">
										<div className='flex gap-2'>
											<Eye className="mr-2 h-4 w-4" />
											<span className='text-sm'>View</span>
										</div>
									</Link>
								</DropdownMenuItem>

								{/* <DropdownMenuItem>
									<div className='flex gap-2'>
										<Edit className="mr-2 h-4 w-4" />
										<span className='text-sm'>Update</span>
									</div>
								</DropdownMenuItem> */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardContent >
		</Card >
	);
};