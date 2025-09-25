import { z } from "zod";
import { EmployerProp } from "@/types/personalization/profile-type";
import { CategoryProp } from "@/types/personalization/settings_type";

export const PostJobFormSchema = z.object({
	// Required Fields
	title: z.string().min(1, "Job title is required"),
	description: z.string().min(1, "Job description is required"),

	budget_type: z.string().min(1, "Budget type is required"),
	min_budget: z.number().min(1, "Minimum budget is required"),
	max_budget: z.number().min(1, "Maximum budget is required"),

	duration: z.string().min(1, "Job duration is required"),
	level: z.string().min(1, "Job level is required"),
	is_urgent: z.boolean(),

	categories: z.array(z.string()).min(1, "Job category is required"),

	// Optional Fields
	requirements: z.string().optional(),
});

export type PostJobFormProp = z.infer<typeof PostJobFormSchema>;

export type JobProp = {
	id: number;
	created_by: number;
	created_at: string;
	updated_at: string;
	title: string;
	description: string;
	requirements: string | null;
	budget_type: "fixed" | "hourly";
	min_budget: number;
	max_budget: number;
	duration: string;
	status: "lead" | "proposal-sent" | "negotiation" | "contract-signed" | "preparing" | "in-progress" | "review" | "revisions" | "ready-for-delivery" | "delivered" | "archived";
	level: 'beginner' | 'intermediate' | 'expert';
	is_urgent: boolean;
	categories: CategoryProp[];
	employer: EmployerProp;
};

export type FilterJobsProp = {
	search?: string;
	category?: string;
	level?: string;
};
