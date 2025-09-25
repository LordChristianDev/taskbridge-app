import { JobProp } from "@/types/dashboard/job-type";
import { ProposalProp } from "@/types/dashboard/proposal-type";
import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";

export type ProjectProp = {
	id: number;
	started_at: string;
	updated_at: string | null;
	job_id: number;
	employer_id: number;
	freelancer_id: number;
	proposal_id: number;
	status: "lead" | "proposal-sent" | "negotiation" | "contract-signed" | "preparing" | "in-progress" | "review" | "revisions" | "ready-for-delivery" | "delivered" | "archived";
	deadline: string;
	job: JobProp;
	employer: EmployerProp;
	freelancer: FreelancerProp;
	proposal: ProposalProp;
	project_status: ProjectStatusProp;
};

export type ProjectStatusProp = {
	id: number;
	created_at: string;
	value: string;
	label: string;
};

export type fetchProjectsOptionsProp = {
	id: number;
	status?: string;
	status_list?: string[];
}