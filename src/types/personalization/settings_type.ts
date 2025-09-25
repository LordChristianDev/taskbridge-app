import { z } from "zod";

export const UpdateFreelancerFormSchema = z.object({
	// Required Fields
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	sex: z.string().min(1, "Sex is required"),
	birth_date: z.string().min(1, "Date of birth is required"),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email address is required"),
	bio: z.string().min(1, "Professional bio is required"),

	// Optional Fields
	middle_name: z.string().optional(),
	suffix: z.string().optional(),
});

export const UpdateFreelancerSkillsFormSchema = z.object({
	// Required Fields
	rate: z.number().min(1, "Rate is required"),
	period: z.string().min(1, "Period is required"),
	title: z.string().min(1, "Title is required"),
	education: z.string().min(1, "Education is required"),

	// Optional Fields
	skills: z.array(z.string()).optional(),
});

export type UpdateFreelancerFormProp = z.infer<typeof UpdateFreelancerFormSchema>;

export type UpdateFreelancerSkillsFormProp = z.infer<typeof UpdateFreelancerSkillsFormSchema>;

export const UpdateEmployerFormSchema = z.object({
	// Required Fields
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	sex: z.string().min(1, "Sex is required"),
	birth_date: z.string().min(1, "Date of birth is required"),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email address is required"),
	title: z.string().min(1, "Title is required"),
	company: z.string().min(1, "Company name is required"),
	company_description: z.string().min(1, "Company description is required"),

	// Optional Fields
	middle_name: z.string().optional(),
	suffix: z.string().optional(),
	company_categories: z.array(z.string()).optional(),
});

export type UpdateEmployerFormProp = z.infer<typeof UpdateEmployerFormSchema>;

export type CategoryProp = {
	id: number;
	title: string;
	value: string;
	created_at: string;
};

export type LevelProp = {
	id: number;
	title: string;
	value: string;
	created_at: string;
};


