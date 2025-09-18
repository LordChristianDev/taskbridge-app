import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";

export const QUERIES = {
	fetchMockEmployer: async function (): Promise<EmployerProp | null> {
		let employer: EmployerProp | null = null;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		employer = mockEmployerData;

		return employer;
	},
	fetchMockFreelancer: async function (): Promise<FreelancerProp | null> {
		let freelancer: FreelancerProp | null = null;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		freelancer = mockFreelancerData;

		return freelancer;
	},
};

export const mockEmployerData: EmployerProp = {
	id: 1,
	first_name: "John",
	last_name: "Doe",
	sex: "Male",
	birth_date: "2024-7-25",
	phone: "09876543210",
	email: "johndoe@example.com",
	company: "Express EVA",

	middle_name: null,
	suffix: null,

	company_description: null,
	title: "HR Manager",
	profile_img: null,
	company_categories: null,
};

export const mockFreelancerData: FreelancerProp = {
	id: 1,
	first_name: "Jane",
	last_name: "Smith",
	sex: "Female",
	birth_date: "2024-7-25",
	phone: "09876543219",
	email: "janesmith@example.com",
	bio: "Just a normal freelancer",

	middle_name: null,
	suffix: null,

	education: null,
	title: "Full-stack developer",
	current_rate: null,
	profile_img: null,
	skills: null,
};