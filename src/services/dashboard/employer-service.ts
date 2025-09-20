import { Briefcase, Clock, DollarSign, Users } from "lucide-react";
import {
	EmployerDashboardStatProp,
	FilterFreelancersProp,
	MockFreelancerProp,
	MockJobProp,
	MockProjectProp
} from "@/types/dashboard/employer-type";

export const QUERIES = {
	fetchMockFreelancers: async function (options?: FilterFreelancersProp): Promise<MockFreelancerProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let freelancers: MockFreelancerProp[] = mockFreelancersData;

		if (options?.search) {
			freelancers = freelancers.filter((item) => {
				const sort = options.search!.toLowerCase();
				return item.name.toLowerCase().includes(sort) ||
					item.title.toLowerCase().includes(sort) ||
					item.hourlyRate.toLowerCase().includes(sort);
			});
		}

		return freelancers;
	},
	fetchMockJobs: async function (): Promise<MockJobProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let jobs: MockJobProp[] = mockJobsData;

		return jobs;
	},
	fetchMockProjects: async function (): Promise<MockProjectProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let projects: MockProjectProp[] = mockProjectsData;

		return projects;
	},
	fetchMockStats: async function (): Promise<EmployerDashboardStatProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let stats: EmployerDashboardStatProp[] = mockEmployerDashboardStatsData;

		return stats;
	}
}

export const mockJobsData: MockJobProp[] = [
	{
		id: "1",
		title: "React Developer for E-commerce Platform",
		description: "Looking for an experienced React developer to build a modern e-commerce platform...",
		budget: "$3,000 - $5,000",
		duration: "2-3 months",
		skills: ["React", "TypeScript", "Node.js"],
		status: "active",
		proposals: 12,
		posted: "2 days ago",
	},
	{
		id: "2",
		title: "UI/UX Designer for Mobile App",
		description: "Need a talented designer to create user interfaces for our mobile application...",
		budget: "$2,000 - $3,000",
		duration: "1-2 months",
		skills: ["Figma", "UI Design", "Mobile Design"],
		status: "active",
		proposals: 8,
		posted: "1 week ago",
	},
	{
		id: "3",
		title: "Content Writer for Tech Blog",
		description: "Seeking a skilled content writer to create engaging articles for our technology blog...",
		budget: "$500 - $1,000",
		duration: "Ongoing",
		skills: ["Content Writing", "SEO", "Tech Writing"],
		status: "completed",
		proposals: 15,
		posted: "2 weeks ago",
	},
];

export const mockFreelancersData: MockFreelancerProp[] = [
	{
		id: "1",
		name: "Sarah Johnson",
		title: "Full-Stack Developer",
		rating: 4.9,
		reviews: 47,
		hourlyRate: "$75/hr",
		skills: ["React", "Node.js", "Python", "AWS"],
		avatar: "/professional-woman-developer.png",
		availability: "Available now",
	},
	{
		id: "2",
		name: "Mike Chen",
		title: "UI/UX Designer",
		rating: 4.8,
		reviews: 32,
		hourlyRate: "$60/hr",
		skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
		avatar: "/professional-man-designer.jpg",
		availability: "Available in 1 week",
	},
	{
		id: "3",
		name: "Emily Rodriguez",
		title: "Content Strategist",
		rating: 5.0,
		reviews: 28,
		hourlyRate: "$45/hr",
		skills: ["Content Strategy", "SEO", "Copywriting", "Social Media"],
		avatar: "/professional-woman-writer.png",
		availability: "Available now",
	},
];

export const mockProjectsData: MockProjectProp[] = [
	{
		id: "1",
		title: "E-commerce Platform Development",
		freelancer: "Sarah Johnson",
		status: "in-progress",
		progress: 65,
		budget: "$4,500",
		deadline: "Dec 15, 2024",
		lastUpdate: "2 hours ago",
	},
	{
		id: "2",
		title: "Mobile App UI Design",
		freelancer: "Mike Chen",
		status: "review",
		progress: 90,
		budget: "$2,500",
		deadline: "Nov 30, 2024",
		lastUpdate: "1 day ago",
	},
	{
		id: "3",
		title: "Blog Content Creation",
		freelancer: "Emily Rodriguez",
		status: "completed",
		progress: 100,
		budget: "$800",
		deadline: "Nov 20, 2024",
		lastUpdate: "3 days ago",
	},
];

export const mockEmployerDashboardStatsData: EmployerDashboardStatProp[] = [
	{
		id: 1,
		title: "Active Jobs",
		stat: "2",
		icon: Briefcase,
	},
	{
		id: 2,
		title: "Total Proposals",
		stat: "20",
		icon: Users,
	},
	{
		id: 3,
		title: "In Progress",
		stat: "1",
		icon: Clock,
	},
	{
		id: 4,
		title: "Total Spent",
		stat: "$7,800",
		icon: DollarSign,
	},
];

