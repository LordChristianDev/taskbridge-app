import { CategoryProp } from "@/types/personalization/settings_type";

export type FreelancerProp = {
	id: number;
	user_id: number;

	first_name: string;
	middle_name: string | null;
	last_name: string;
	suffix: string | null;

	sex: string;
	birth_date: string;
	avatar_url: string | null;
	cover_url: string | null;
	phone: string;
	email: string;

	bio: string;
	title: string | null;
	rate: string | null;
	education: string | null;
	skills: string[] | null;
	specified_skills: CategoryProp[] | null;

	created_at: string;
}

export type EmployerProp = {
	id: number;
	user_id: number;

	first_name: string;
	middle_name: string | null;
	last_name: string;
	suffix: string | null;

	sex: string;
	birth_date: string;
	phone: string;
	email: string;
	avatar_url: string | null;
	cover_url: string | null;

	title: string | null;
	company: string;
	company_description: string | null;
	company_categories: string[] | null;
	specified_company_categories: CategoryProp[] | null;

	created_at: string;
}

export type UpdateUploadProp = {
	id?: string;
	file: File;
	url?: string;
	type: string;
}