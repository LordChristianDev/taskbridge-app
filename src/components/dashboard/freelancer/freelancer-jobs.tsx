"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Send, Eye } from "lucide-react";

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

import { CategoryProp, FilterMockJobs, LevelProp, MockJobProp } from "@/types/dashboard/freelancer-type";
import { QUERIES } from "@/services/dashboard/freelancer/freelancer-service";

export default function FreelancerJobs() {
	const [search, setSearch] = useState<FilterMockJobs['search']>("");
	const [category, setCategory] = useState<FilterMockJobs['category']>("all");
	const [level, setLevel] = useState<FilterMockJobs['level']>("all")

	const { data: jobs, isFetching: jobsFetching } = useQuery({
		queryKey: ['freelancer-jobs', { search, category, level }],
		queryFn: () => QUERIES.fetchMockJobs({ search, category, level }),
		initialData: [] as MockJobProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const { data: categoriesList, isFetching: categoriesFetching } = useQuery({
		queryKey: ['categories'],
		queryFn: () => QUERIES.fetchMockCategories(),
		initialData: [] as CategoryProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const { data: levelsList, isFetching: levelsFetching } = useQuery({
		queryKey: ['levels'],
		queryFn: () => QUERIES.fetchMockLevels(),
		initialData: [] as LevelProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const categories: CategoryProp[] = (categoriesList) ? categoriesList : [];
	const levels: LevelProp[] = (levelsList) ? levelsList : [];

	const selectCategories = categories.map((item) => {
		const { value, title } = item;
		return (<SelectItem key={value} value={value}>{title}</SelectItem>);
	});

	const selectLevels = levels.map((item) => {
		const { value, title } = item;
		return (<SelectItem key={value} value={value}>{title}</SelectItem>);
	});

	const renderJobs = jobs.map((job) => {
		const { id, title, level, company, description, skills, budget, duration, proposals, posted } = job;

		const renderSkills = skills.map((skill) => {
			return (<Badge key={skill} variant="secondary">{skill}</Badge>);
		});

		return (
			<Card key={id} className="mb-6 mr-4 hover:shadow-md transition-shadow">
				<CardContent className="p-6">
					<div className="mb-4 flex items-start justify-between">
						<div className="flex-1">
							<div className="mb-2 flex items-center space-x-2">
								<h3 className="text-lg font-semibold">{title}</h3>
								<Badge variant="outline">{level.title}</Badge>
							</div>
							<p className="mb-1 text-sm text-muted-foreground">{company}</p>
							<p className="mb-3 text-muted-foreground line-clamp-2">{description}</p>

							<div className="mb-3 flex flex-wrap gap-2">
								{renderSkills}
							</div>

							<div className="flex items-center space-x-4 text-sm text-muted-foreground">
								<span className="font-medium text-foreground">{budget}</span>
								<span>{duration}</span>
								<span>{proposals} proposals</span>
								<span>Posted {posted}</span>
							</div>
						</div>

						<div className="flex flex-col space-y-2">
							<Button size="sm">
								<Send className="w-4 h-4" />
								Send Proposal
							</Button>

							<Button size="sm" variant="outline">
								<Eye className="w-4 h-4" />
								View Details
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
					{renderJobs}
				</ScrollArea>
			)}
		</>
	);
}