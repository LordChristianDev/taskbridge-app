import { z } from "zod";

export const FreelancerFormSchema = z.object({
	// Required Fields
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	sex: z.string().min(1, "Sex is required"),
	birth_date: z.string().min(1, "Date of birth is required"),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email address is required"),
	user_type: z.string().min(1, "User Type is required"),

	bio: z.string().min(1, "Professional bio is required"),

	// Optional Fields
	middle_name: z.string().optional(),
	suffix: z.string().optional(),
});

export type FreelancerFormProp = z.infer<typeof FreelancerFormSchema>;

export const EmployerFormSchema = z.object({
	// Required Fields
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	sex: z.string().min(1, "Sex is required"),
	birth_date: z.string().min(1, "Date of birth is required"),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email address is required"),
	user_type: z.string().min(1, "User Type is required"),

	company: z.string().min(1, "Company name is required"),

	// Optional Fields
	middle_name: z.string().optional(),
	suffix: z.string().optional(),
});

export type EmployerFormProp = z.infer<typeof EmployerFormSchema>;

export type RegisterPageProp = {
	userType?: "employer" | "freelancer";
}


