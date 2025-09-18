import { LucideIcon } from "lucide-react";

export type MockJobProp = {
	id: string;
	title: string;
	company: string;
	description: string;
	duration: string;
	budget: string;
	skills: string[];
	posted: string;
	proposals: number;
	category: CategoryProp;
	level: LevelProp;
};

export type MockProposalProp = {
	id: string;
	jobTitle: string;
	company: string;
	status: string;
	submittedDate: string;
	proposedBudget: string;
	coverLetter: string;
};

export type MockActiveProjectProp = {
	id: string;
	title: string;
	client: string;
	status: "in-progress" | "review";
	progress: number;
	budget: string;
	deadline: string;
	lastUpdate: string;
};

export type FreelancerDashboardStatProp = {
	id: number;
	title: string;
	stat: string;
	icon: LucideIcon;
}

export type FilterMockJobs = {
	search?: string;
	category?: string;
	level?: string;
};

export type CategoryProp = {
	value: string;
	title: string;
};

export type LevelProp = {
	value: string;
	title: string;
};

