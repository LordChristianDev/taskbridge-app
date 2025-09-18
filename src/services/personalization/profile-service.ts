import { EmployerProp } from "@/types/personalization/profile-type";

export const QUERIES = {
	fetchMockEmployer: async function (): Promise<EmployerProp | null> {
		let freelancer: EmployerProp | null = null;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		freelancer = mockEmployerData;

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
}