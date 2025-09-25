import { z } from "zod";

import { JobProp } from "@/types/dashboard/job-type";
import { FreelancerProp } from "@/types/personalization/profile-type";

export const CreateProposalFormSchema = z.object({
	cover_letter: z.string().min(1, "Cover letter is required"),
	proposed_budget: z.number().min(1, "Proposed budget is required"),
	delivery_timeline: z.string().min(1, "Timeline is required"),
	delivery_milestone: z.string().optional(),
});

export type CreateProposalFormProp = z.infer<typeof CreateProposalFormSchema>;

export type ProposalProp = {
	id: number;
	proposed_at: string;
	job_id: number;
	proposed_by: number;
	employer_id: number;
	proposed_budget: string;
	status: "pending" | "accepted" | "rejected" | "withdrawn";
	cover_letter: string;
	delivery_timeline: string;
	delivery_milestones: string | null;
	proposer: FreelancerProp;
	job: JobProp;
}