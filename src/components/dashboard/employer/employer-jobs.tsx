"use client"

import { useQuery } from '@tanstack/react-query';
import { Edit, MoreHorizontal, Plus } from "lucide-react";

import { getStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/scroll-area';
import { Card, CardContent } from "@/components/ui/card";

import { MockJobProp } from "@/types/dashboard/employer-type";
import { QUERIES } from '@/services/dashboard/employer/employer-service';


export default function EmployerJobs() {
	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['employer-jobs'],
		queryFn: () => QUERIES.fetchMockJobs(),
		initialData: [] as MockJobProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderJobs = jobs.map((job) => {
		const { id, title, description, budget, duration, status, proposals, posted, skills } = job;
		const cname = getStatusColor(status);

		const jobSkills = skills.map((skill) => {
			return (<Badge key={skill} variant="secondary">{skill}</Badge>);
		});

		return (
			<Card key={id} className='mb-6 mr-4 '>
				<CardContent className="p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold mb-2">{title}</h3>
							<p className="text-muted-foreground mb-3">{description}</p>
							<div className="flex flex-wrap gap-2 mb-3">
								{jobSkills}
							</div>

							<div className="flex items-center space-x-4 text-sm text-muted-foreground">
								<span>{budget}</span>
								<span>{duration}</span>
								<span>{proposals} proposals</span>
								<span>Posted {posted}</span>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Badge variant="outline" className={cname}>
								{status}
							</Badge>

							<Button variant="ghost" size="sm">
								<Edit className="w-4 h-4" />
							</Button>

							<Button variant="ghost" size="sm">
								<MoreHorizontal className="w-4 h-4" />
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
				<h2 className="text-2xl font-bold">My Jobs</h2>
				<Button>
					<Plus className="w-4 h-4" />
					Post New Job
				</Button>
			</div>

			{jobsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex-1 h-72 bg-muted rounded" />
				</div>
			) : (

				<ScrollArea className="space-y-4 h-128">
					{renderJobs}
				</ScrollArea>
			)}
		</>
	);
}