import { LucideIcon } from "lucide-react";

export type MockJobProp = {
	id: string;
	title: string;
	description: string;
	budget: string;
	duration: string;
	skills: string[];
	status: "active" | "completed";
	proposals: number;
	posted: string
}

export type MockFreelancerProp = {
	id: string;
	name: string;
	title: string;
	rating: number;
	reviews: number;
	hourlyRate: string;
	skills: string[];
	avatar: string;
	availability: string;
}

export type MockProjectProp = {
	id: string;
	title: string;
	freelancer: string;
	status: "in-progress" | "review" | "completed";
	progress: number;
	budget: string;
	deadline: string;
	lastUpdate: string;
}

export type EmployerDashboardStatProp = {
	id: number;
	title: string;
	stat: string;
	icon: LucideIcon;
}

export type FilterFreelancersProp = {
	search?: string;
}