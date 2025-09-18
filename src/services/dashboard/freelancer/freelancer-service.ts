import { CategoryProp, FilterMockJobs, FreelancerDashboardStatProp, LevelProp, MockActiveProjectProp, MockJobProp, MockProposalProp } from "@/types/dashboard/freelancer-type"
import { Briefcase, DollarSign, Send, TrendingUp } from "lucide-react";

export const QUERIES = {
	fetchMockJobs: async function (options?: FilterMockJobs): Promise<MockJobProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let jobs: MockJobProp[] = mockJobsData

		if (options?.search) {
			jobs = jobs.filter((item) => {
				const sort = options.search!.toLowerCase();
				return item.title.toLowerCase().includes(sort) ||
					item.description.toLowerCase().includes(sort) ||
					item.skills.some((skill) => skill.toLowerCase().includes(sort));
			});
		}

		if (options?.category && options?.category !== "all") {
			jobs = jobs.filter((item) => {
				return item.category.value === options.category;
			});
		}

		if (options?.level && options?.level !== "all") {
			jobs = jobs.filter((item) => {
				return item.level.value === options.level;
			});
		}

		return jobs;
	},
	fetchMockProposals: async function (): Promise<MockProposalProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let proposals: MockProposalProp[] = mockProposals;

		return proposals;
	},
	fetchMockActiveProjects: async function (): Promise<MockActiveProjectProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let activeProjects: MockActiveProjectProp[] = mockActiveProjects;

		return activeProjects;
	},
	fetchMockStats: async function (): Promise<FreelancerDashboardStatProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let stats: FreelancerDashboardStatProp[] = mockFreelancerDashboardStatsData;

		return stats;
	},
	fetchMockCategories: async function (): Promise<CategoryProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let categories: CategoryProp[] = mockCategoriesList;

		return categories;
	},
	fetchMockLevels: async function (): Promise<LevelProp[]> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let levels: LevelProp[] = mockLevelsList;

		return levels;
	},
}

export const mockJobsData: MockJobProp[] = [
	{
		id: "1",
		title: "React Developer for E-commerce Platform",
		company: "TechCorp Inc.",
		description:
			"Looking for an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication.",
		budget: "$3,000 - $5,000",
		duration: "2-3 months",
		skills: ["React", "TypeScript", "Node.js", "MongoDB"],
		posted: "2 days ago",
		proposals: 12,
		category: { value: "web_development", title: "Web Development" },
		level: { value: "expert", title: "Expert" },
	},
	{
		id: "2",
		title: "UI/UX Designer for Mobile App",
		company: "StartupXYZ",
		description:
			"Need a talented designer to create user interfaces for our mobile application. Must have experience with modern design principles and mobile-first approach.",
		budget: "$2,000 - $3,000",
		duration: "1-2 months",
		skills: ["Figma", "UI Design", "Mobile Design", "Prototyping"],
		posted: "1 day ago",
		proposals: 8,
		category: { value: "design", title: "Design" },
		level: { value: "intermediate", title: "Intermediate" },
	},
	{
		id: "3",
		title: "Content Writer for Tech Blog",
		company: "Digital Media Co.",
		description:
			"Seeking a skilled content writer to create engaging articles for our technology blog. Must have knowledge of current tech trends and SEO best practices.",
		budget: "$500 - $1,000",
		duration: "Ongoing",
		skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
		posted: "3 days ago",
		proposals: 15,
		category: { value: "writing", title: "Writing" },
		level: { value: "intermediate", title: "Intermediate" },
	},
	{
		id: "4",
		title: "Python Data Analyst",
		company: "DataTech Solutions",
		description:
			"Looking for a Python developer with strong data analysis skills to help with machine learning projects and data visualization.",
		budget: "$4,000 - $6,000",
		duration: "3-4 months",
		skills: ["Python", "Pandas", "Machine Learning", "Data Visualization"],
		posted: "1 week ago",
		proposals: 6,
		category: { value: "data_science", title: "Data Science" },
		level: { value: "expert", title: "Expert" },
	},
];

export const mockProposals: MockProposalProp[] = [
	{
		id: "1",
		jobTitle: "React Developer for E-commerce Platform",
		company: "TechCorp Inc.",
		status: "pending",
		submittedDate: "2 days ago",
		proposedBudget: "$4,200",
		coverLetter: "I have 5+ years of experience building e-commerce platforms...",
	},
	{
		id: "2",
		jobTitle: "Mobile App UI Design",
		company: "AppCorp",
		status: "accepted",
		submittedDate: "1 week ago",
		proposedBudget: "$2,800",
		coverLetter: "I specialize in mobile-first design and have created...",
	},
	{
		id: "3",
		jobTitle: "Content Writing for Blog",
		company: "ContentCo",
		status: "rejected",
		submittedDate: "2 weeks ago",
		proposedBudget: "$800",
		coverLetter: "I'm a professional content writer with expertise in...",
	},
];

export const mockActiveProjects: MockActiveProjectProp[] = [
	{
		id: "1",
		title: "Mobile App UI Design",
		client: "AppCorp",
		status: "in-progress",
		progress: 75,
		budget: "$2,800",
		deadline: "Dec 1, 2024",
		lastUpdate: "1 hour ago",
	},
	{
		id: "2",
		title: "Website Redesign",
		client: "WebCorp",
		status: "review",
		progress: 95,
		budget: "$1,500",
		deadline: "Nov 25, 2024",
		lastUpdate: "2 days ago",
	},
];

export const mockFreelancerDashboardStatsData: FreelancerDashboardStatProp[] = [
	{
		id: 1,
		title: "Active Projects",
		stat: "2",
		icon: Briefcase,
	},
	{
		id: 2,
		title: "Total Proposals",
		stat: "20",
		icon: Send,
	},
	{
		id: 3,
		title: "In Progress",
		stat: "1",
		icon: DollarSign,
	},
	{
		id: 4,
		title: "Total Spent",
		stat: "$7,800",
		icon: TrendingUp,
	},
];

export const mockCategoriesList: CategoryProp[] = [
	{
		value: "all",
		title: "All Categories"
	},
	{
		value: "web_development",
		title: "Web Development"
	},
	{
		value: "design",
		title: "Design"
	},
	{
		value: "ui_ux",
		title: "UI/UX"
	},
	{
		value: "writing",
		title: "Writing"
	},
	{
		value: "data_science",
		title: "Data Science"
	},
	{
		value: "mobile_development",
		title: "Mobile Development"
	},
];

export const mockLevelsList: LevelProp[] = [
	{
		value: "all",
		title: "All Levels",
	},
	{
		value: "beginner",
		title: "Beginner",
	},
	{
		value: "intermediate",
		title: "Intermediate",
	},
	{
		value: "expert",
		title: "Expert",
	},
];