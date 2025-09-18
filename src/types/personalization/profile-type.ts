export type FreelancerProp = {
	id: number;
	first_name: string;
	last_name: string;
	sex: string;
	birth_date: string;
	phone: string;
	email: string;
	bio: string;

	middle_name: string | null;
	suffix: string | null;

	education: string | null;
	title: string | null;
	current_rate: string | null;
	profile_img: string | null;
	skills: string[] | null;
}

export type EmployerProp = {
	id: number;
	first_name: string;
	last_name: string;
	sex: string;
	birth_date: string;
	phone: string;
	email: string;
	company: string;

	middle_name: string | null;
	suffix: string | null;

	company_description: string | null;
	title: string | null;
	profile_img: string | null;
	company_categories: string[] | null;
}