"use client"

import { useQuery } from '@tanstack/react-query';
import { Plus, Eye } from "lucide-react";

import { getEmployerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { MockJobProp, MockProjectProp } from "@/types/dashboard/employer-type";
import { QUERIES } from '@/services/dashboard/employer-service';

export default function EmployerOverview() {
	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['employer-jobs'],
		queryFn: () => QUERIES.fetchMockJobs(),
		initialData: [] as MockJobProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['employer-projects'],
		queryFn: () => QUERIES.fetchMockProjects(),
		initialData: [] as MockProjectProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderJobs = jobs.slice(0, 2).map((job) => {
		const { id, title, budget, duration, status, proposals } = job;
		const cname = getEmployerStatusColor(status)

		return (
			<div key={id} className="p-4 flex items-start justify-between border rounded-lg">
				<div className="flex-1">
					<h4 className="mb-1 font-semibold text-sm">{title}</h4>
					<p className="mb-2 text-xs text-muted-foreground">
						{budget} • {duration}
					</p>
					<div className="flex items-center space-x-2">
						<Badge variant="outline" className={cname}>
							{status}
						</Badge>
						<span className="text-xs text-muted-foreground">{proposals} proposals</span>
					</div>
				</div>

				<Button variant="ghost" size="sm">
					<Eye className="w-4 h-4" />
				</Button>
			</div>
		);
	});

	const renderProjects = projects
		.filter((p) => p.status === "in-progress")
		.map((project) => {
			const { id, title, freelancer, status, progress } = project;
			const cname = getEmployerStatusColor(status)

			return (
				<div key={id} className="p-4 border rounded-lg">
					<div className="mb-3 flex items-start justify-between">
						<div>
							<h4 className="font-semibold text-sm">{title}</h4>
							<p className="text-xs text-muted-foreground">with {freelancer}</p>
						</div>
						<Badge variant="outline" className={cname}>
							{status}
						</Badge>
					</div>
					<div className="space-y-2">
						<div className="flex justify-between text-xs">
							<span>Progress</span>
							<span>{progress}%</span>
						</div>
						<div className="bg-muted rounded-full w-full h-2">
							<div
								className="bg-primary h-2 rounded-full"
								style={{ width: `${progress}%` }}
							></div>
						</div>
					</div>
				</div>
			);
		});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Dashboard Overview</h2>
				<Button>
					<Plus className="w-4 h-4" />
					Post New Job
				</Button>
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
							{renderJobs}
						</CardContent>
					</Card>

					{/* Active Projects */}
					<Card className='flex-1'>
						<CardHeader>
							<CardTitle>Active Projects</CardTitle>
							<CardDescription>Projects currently in progress</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{renderProjects}
						</CardContent>
					</Card>
				</div >
			)}
		</>
	);
}