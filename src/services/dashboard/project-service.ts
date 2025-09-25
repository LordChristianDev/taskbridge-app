import { supabase } from "@/lib/supabase";
import { ProposalProp } from "@/types/dashboard/proposal-type";
import { fetchProjectsOptionsProp, ProjectProp, ProjectStatusProp } from "@/types/dashboard/project-type";

import { QUERIES as JOB_QUERIES } from "@/services/dashboard/job-service";
import { QUERIES as PROPOSAL_QUERIES } from "@/services/dashboard/proposal-service";
import { QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";
import { formatPostgresTimestamp } from "@/lib/utils";

export const QUERIES = {
	fetchProjectsByFreelancerId: async function (options: fetchProjectsOptionsProp): Promise<ProjectProp[]> {
		if (!options.id) throw new Error("No unique identifier found");

		let query = supabase
			.from('projects')
			.select('*')
			.eq('freelancer_id', options.id)
			.order('started_at', { ascending: false });

		options.status && (query = query.eq("status", options.status))
		options.status_list?.length && (query = query.in("status", options.status_list))

		const { data: projectsData, error: projectsError } = await query;

		if (projectsError) throw new Error(projectsError.message);
		if (!projectsData) return [];

		const projectsList = await Promise.all(
			projectsData.map(async (project) => {
				let setProject: ProjectProp = project;

				const job = await JOB_QUERIES.fetchJobWithId(project.job_id);
				if (job) setProject = { ...setProject, job, };

				const proposal = await PROPOSAL_QUERIES.fetchProposalWithId(project.proposal_id);
				if (proposal) setProject = { ...setProject, proposal, };

				const employer = await PROFILE_QUERIES.fetchEmployer(project.employer_id);
				if (employer) setProject = { ...setProject, employer, };

				const freelancer = await PROFILE_QUERIES.fetchFreelancer(project.freelancer_id);
				if (freelancer) setProject = { ...setProject, freelancer, };

				const project_status = await QUERIES.fetchProjectStatus(project.status);
				if (project_status) setProject = { ...setProject, project_status, };

				return setProject;
			})
		);

		return projectsList;
	},
	fetchProjectsByEmployerId: async function (options: fetchProjectsOptionsProp): Promise<ProjectProp[]> {
		if (!options.id) throw new Error("No unique identifier found");

		let query = supabase
			.from("projects")
			.select("*")
			.eq("employer_id", options.id)
			.order("started_at", { ascending: false });

		options.status && (query = query.eq("status", options.status))
		options.status_list?.length && (query = query.in("status", options.status_list))

		const { data: projectsData, error: projectsError } = await query;

		if (projectsError) throw new Error(projectsError.message);
		if (!projectsData) return [];

		const projectsList = await Promise.all(
			projectsData.map(async (project) => {
				let setProject: ProjectProp = project;

				const job = await JOB_QUERIES.fetchJobWithId(project.job_id);
				if (job) setProject = { ...setProject, job, };

				const proposal = await PROPOSAL_QUERIES.fetchProposalWithId(project.proposal_id);
				if (proposal) setProject = { ...setProject, proposal, };

				const employer = await PROFILE_QUERIES.fetchEmployer(project.employer_id);
				if (employer) setProject = { ...setProject, employer, };

				const freelancer = await PROFILE_QUERIES.fetchFreelancer(project.freelancer_id);
				if (freelancer) setProject = { ...setProject, freelancer, };

				const project_status = await QUERIES.fetchProjectStatus(project.status);
				if (project_status) setProject = { ...setProject, project_status, };

				return setProject;
			})
		);

		return projectsList;
	},
	fetchProjectStatus: async function (value: string): Promise<ProjectStatusProp> {
		if (!value) throw new Error("No unique identifier found");

		const { data: statusData, error: statusError } = await supabase
			.from('project_status')
			.select('*')
			.eq('value', value)
			.single();

		if (statusError) throw new Error(statusError.message);
		if (!statusData) return {} as ProjectStatusProp;

		return statusData;
	}
};

export const MUTATIONS = {
	createProject: async function (
		job_id: number,
		employer_id: number,
		proposal: ProposalProp,
		deadline?: string,
	): Promise<boolean> {
		if (!job_id) throw new Error("No unique job identifier found");
		if (!employer_id) throw new Error("No unique employer identifier found");
		if (!proposal) throw new Error("Unspecified proposal");

		const { data, error } = await supabase
			.from("projects")
			.insert([{
				job_id,
				employer_id,
				freelancer_id: proposal.proposed_by,
				proposal_id: proposal.id,
				status: "negotiation",
				deadline: deadline || null,
			}])
			.select('*')
			.single();

		if (error) throw new Error(error.message);
		if (!data) return false;

		return data ? true : false;
	},
	updateProjectStatus: async function (
		project_id: number,
		status: string,
	): Promise<boolean> {
		if (!project_id) throw new Error("No unique identifier found");
		if (!status) throw new Error("No status specified");

		const { data, error } = await supabase
			.from("projects")
			.update({
				status,
				updated_at: formatPostgresTimestamp(),
			})
			.eq('id', project_id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		if (!data) return false;

		return data ? true : false;
	},
	updateProjectDeadline: async function (
		project_id: number,
		deadline: string,
	): Promise<boolean> {
		if (!project_id) throw new Error("No unique identifier found");
		if (!deadline) throw new Error("No deadline specified");

		const { data, error } = await supabase
			.from("projects")
			.update({
				deadline,
				updated_at: formatPostgresTimestamp(),
			})
			.eq('id', project_id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		if (!data) return false;

		return data ? true : false;
	},
};