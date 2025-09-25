"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, Eye, Send } from "lucide-react";

import { capitalizeFirstLetter, formatIsoString } from "@/lib/utils";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProposalDialog } from "@/components/proposal/proposal-dialog";

import { FilterJobsProp, JobProp } from "@/types/dashboard/job-type";
import { QUERIES as JOB_QUERIES } from "@/services/dashboard/job-service";
import { QUERIES as PROPOSAL_QUERIES } from "@/services/dashboard/proposal-service";
import { QUERIES as SETTINGS_QUERIES } from "@/services/personalization/settings-service";

export default function FreelancerJobs() {
	const [search, setSearch] = useState<FilterJobsProp['search']>("");
	const [category, setCategory] = useState<FilterJobsProp['category']>("all");
	const [level, setLevel] = useState<FilterJobsProp['level']>("all");

	const [categories, setCategories] = useState<{ value: string; title: string }[]>([]);
	const [levels, setLevels] = useState<{ value: string; title: string }[]>([]);

	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['freelancer-jobs', { search, category, level }],
		queryFn: () => JOB_QUERIES.fetchFilteredJobs({ search, category, level }),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: true,
		staleTime: 0,
	});

	const { data: categoriesList, isFetching: categoriesFetching } = useQuery({
		queryKey: ['categories-lists'],
		queryFn: async () => SETTINGS_QUERIES.fetchCategories(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const { data: levelsList, isFetching: levelsFetching } = useQuery({
		queryKey: ['levels-lists'],
		queryFn: async () => SETTINGS_QUERIES.fetchLevels(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	useEffect(() => {
		if (categoriesList && !categoriesFetching) {
			const list = categoriesList
				.map(cat => ({
					value: cat.value,
					title: cat.title
				}))
				.sort((a, b) => a.value.localeCompare(b.value));
			setCategories(list);
		}
	}, [categoriesList, categoriesFetching]);

	useEffect(() => {
		if (levelsList && !levelsFetching) {
			const list = levelsList
				.map(cat => ({
					value: cat.value,
					title: cat.title
				}))
				.sort((a, b) => a.value.localeCompare(b.value));

			setLevels(list);
		}
	}, [levelsList, levelsFetching]);

	const selectCategories = categories.map((item) => {
		const { value, title } = item;
		return (<SelectItem key={value} value={value}>{title}</SelectItem>);
	});

	const selectLevels = levels.map((item) => {
		const { value, title } = item;
		return (<SelectItem key={value} value={value}>{title}</SelectItem>);
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Browse Jobs</h2>
				<div className="flex items-center space-x-2">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<Input
							placeholder="Search jobs..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-10 w-72"
						/>
					</div>

					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-56">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							{selectCategories}
						</SelectContent>
					</Select>

					<Select value={level} onValueChange={setLevel}>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Level" />
						</SelectTrigger>
						<SelectContent>
							{selectLevels}
						</SelectContent>
					</Select>
				</div>
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

export function JobCard({ job }: { job: JobProp }) {
	const { id, created_at, title, description, min_budget, max_budget, duration, level, is_urgent, categories, employer } = job;
	const { company } = employer;

	const { data: proposals, isFetching: proposalsFetching } = useQuery({
		queryKey: ['freelancer-job-proposals'],
		queryFn: async () => PROPOSAL_QUERIES.fetchProposalsByJobId(id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const posted_at = formatIsoString(created_at);

	const renderSkills = categories.map((cat) => {
		const { value, title } = cat
		return (<Badge key={value} variant="outline">{title}</Badge>);
	});

	return (
		<Card key={id} className="mb-6 mr-4 hover:shadow-md transition-shadow">
			<CardContent className="px-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="mb-2 flex items-center space-x-2">
							<h3 className="text-lg font-semibold">{title}</h3>
							<Badge variant="outline">{capitalizeFirstLetter(level)}</Badge>
							{is_urgent && <Badge variant="destructive">Urgent</Badge>}
						</div>
						<p className="mb-1 text-sm text-muted-foreground">{company}</p>
						<p className="mb-3 text-muted-foreground line-clamp-2">{description}</p>

						<div className="mb-3 flex flex-wrap gap-2">
							{renderSkills}
						</div>

						<div className="flex items-center space-x-4 text-sm text-muted-foreground">
							<span className="font-medium text-foreground">{`₱ ${min_budget} - ${max_budget}`}</span>
							<span>{duration}</span>
							<span>Posted {posted_at}</span>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						{proposalsFetching ? (
							<Button size="lg" disabled={true}>Checking...</Button>
						) :
							(!proposals || proposals.length === 0 ? (
								<ProposalDialog job={job} />
							) : (
								<Button size="lg" disabled={true}>
									<Send className="w-4 h-4" />
									Proposal Sent
								</Button>
							))
						}
						<Link href={`/job/${id}`} target="_blank" className="w-full">
							<Button size="sm" variant="outline" className="w-full">
								<Eye className="w-4 h-4" />
								View Details
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card >
	);
}