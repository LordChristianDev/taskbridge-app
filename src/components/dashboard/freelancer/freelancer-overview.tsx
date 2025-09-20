"use client"

import { useQuery } from '@tanstack/react-query';
import { Search } from "lucide-react";

import { getFreelancerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { MockActiveProjectProp, MockJobProp } from '@/types/dashboard/freelancer-type';
import { QUERIES } from '@/services/dashboard/freelancer-service';

export default function FreelancerOverview() {
	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['freelancer-jobs'],
		queryFn: () => QUERIES.fetchMockJobs(),
		initialData: [] as MockJobProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const { data: projects, isFetching: projectsFetching } = useQuery({
		queryKey: ['freelancer-active-projects'],
		queryFn: () => QUERIES.fetchMockActiveProjects(),
		initialData: [] as MockActiveProjectProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderJobs = jobs.slice(0, 2).map((job) => {
		const { id, title, company, budget, duration, posted, skills, category } = job;

		const renderSkills = skills.slice(0, 3).map((skill) => {
			return (<Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>);
		});

		return (
			<div key={id} className="p-4 border rounded-lg">
				<div className="mb-2 flex items-start justify-between">
					<h4 className="font-semibold text-sm">{title}</h4>
					<Badge variant="outline">{category.title}</Badge>
				</div>
				<p className="text-xs text-muted-foreground mb-2">{company}</p>
				<p className="text-xs text-muted-foreground mb-3">
					{budget} • {duration}
				</p>
				<div className="flex flex-wrap gap-1 mb-3">
					{renderSkills}
				</div>
				<div className="flex justify-between items-center">
					<span className="text-xs text-muted-foreground">Posted {posted}</span>
					<Button size="sm" variant="outline">
						View Details
					</Button>
				</div>
			</div>
		);
	});

	const renderProjects = projects.map((project) => {
		const { id, title, client, status, progress, deadline, budget } = project;
		const cname = getFreelancerStatusColor(status);

		return (
			<div key={id} className="p-4 border rounded-lg">
				<div className="flex items-start justify-between mb-3">
					<div>
						<h4 className="font-semibold text-sm">{title}</h4>
						<p className="text-xs text-muted-foreground">for {client}</p>
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
					<div className="w-full bg-muted rounded-full h-2">
						<div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
					</div>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Due: {deadline}</span>
						<span>{budget}</span>
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
					<Search className="w-4 h-4" />
					Browse Jobs
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
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Recent Job Matches */}
					<Card>
						<CardHeader>
							<CardTitle>Recommended Jobs</CardTitle>
							<CardDescription>Jobs that match your skills</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{renderJobs}
						</CardContent>
					</Card>

					{/* Active Projects */}
					<Card>
						<CardHeader>
							<CardTitle>Active Projects</CardTitle>
							<CardDescription>Your current work in progress</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{renderProjects}
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
}