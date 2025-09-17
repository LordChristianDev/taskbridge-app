import { FeatureDataProp, HowItWorksDataProp, NavigationBarDataProp, StatsSectionDataProp } from "@/types/authentication/landing/landing-types";
import { Clock, Shield, Star } from "lucide-react";


export const navigationBarData: NavigationBarDataProp[] = [
	{
		title: "How it Works",
		url: "#how-it-works",
	},
	{
		title: "Features",
		url: "#features",
	},
	{
		title: "Pricing",
		url: "#pricing",
	},
];

export const statsSectionData: StatsSectionDataProp[] = [
	{
		stat: "10,000+",
		title: "Active Freelancers",
	},
	{
		stat: "5,000+",
		title: "Projects Completed",
	},
	{
		stat: "98%",
		title: "Client Satisfaction",
	},
];

export const forEmployersData: HowItWorksDataProp[] = [
	{
		id: 1,
		title: "Post Your Project",
		description: "Describe your project requirements and budget"
	},
	{
		id: 2,
		title: "Review Proposals",
		description: "Get proposals from qualified freelancers"
	},
	{
		id: 3,
		title: "Hire & Collaborate",
		description: "Choose the best freelancer and start working"
	},
];

export const forFreelancersData: HowItWorksDataProp[] = [
	{
		id: 1,
		title: "Create Your Profile",
		description: "Showcase your skills and experience",
	},
	{
		id: 2,
		title: "Browse Projects",
		description: "Find projects that match your expertise",
	},
	{
		id: 3,
		title: "Submit Proposals",
		description: "Send compelling proposals to win projects",
	},
];

export const featuresData: FeatureDataProp[] = [
	{
		id: 1,
		title: "Secure Payments",
		description: "Protected transactions with escrow system for peace of mind",
		icon: Shield
	},
	{
		id: 2,
		title: "Quality Talent",
		description: "Vetted freelancers with verified skills and portfolios",
		icon: Star
	},
	{
		id: 3,
		title: "Fast Matching",
		description: "AI-powered matching to connect you with the right people quickly",
		icon: Clock
	},
];

export const categoriesData = [
	"Web Development",
	"Mobile Apps",
	"UI/UX Design",
	"Content Writing",
	"Digital Marketing",
	"Data Science",
	"Video Editing",
	"Consulting",
];