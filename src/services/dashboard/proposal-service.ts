import { supabase } from "@/lib/supabase";
import { CreateProposalFormProp, ProposalProp } from "@/types/dashboard/proposal-type";
import { QUERIES as JOB_QUERIES } from "@/services/dashboard/job-service";
import { QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";

export const QUERIES = {
	fetchProposalsByJobId: async function (job_id: number): Promise<ProposalProp[]> {
		if (!job_id) throw new Error("No unique identifier found");

		const { data: proposalsData, error: proposalsError } = await supabase
			.from('proposals')
			.select('*')
			.eq('job_id', job_id)
			.order('proposed_at', { ascending: false });

		if (proposalsError) throw new Error(proposalsError.message);
		if (!proposalsData) return [];

		const proposalsList = await Promise.all(
			proposalsData.map(async (proposal) => {
				let setProposal: ProposalProp = proposal;

				const proposer = await PROFILE_QUERIES.fetchFreelancer(proposal.proposed_by);
				if (proposer) setProposal = { ...setProposal, proposer }

				const job = await JOB_QUERIES.fetchJobWithId(proposal.job_id);
				if (job) setProposal = { ...setProposal, job }

				return setProposal;
			})
		);

		return proposalsList;
	},
	fetchProposalsByFreelancerId: async function (freelancer_id: number): Promise<ProposalProp[]> {
		if (!freelancer_id) throw new Error("No unique identifier found");

		const { data: proposalsData, error: proposalsError } = await supabase
			.from('proposals')
			.select('*')
			.eq('proposed_by', freelancer_id)
			.order('proposed_at', { ascending: false });

		if (proposalsError) throw new Error(proposalsError.message);
		if (!proposalsData) return [];

		const proposalsList = await Promise.all(
			proposalsData.map(async (proposal) => {
				let setProposal: ProposalProp = proposal;

				const proposer = await PROFILE_QUERIES.fetchFreelancer(proposal.proposed_by);
				if (proposer) setProposal = { ...setProposal, proposer }

				const job = await JOB_QUERIES.fetchJobWithId(proposal.job_id);
				if (job) setProposal = { ...setProposal, job }

				return setProposal;
			})
		);

		return proposalsList;
	},
	fetchProposalsByEmployerId: async function (employer_id: number): Promise<ProposalProp[]> {
		if (!employer_id) throw new Error("No unique identifier found");

		const { data: proposalsData, error: proposalsError } = await supabase
			.from('proposals')
			.select('*')
			.eq('employer_id', employer_id)
			.order('proposed_at', { ascending: false });

		if (proposalsError) throw new Error(proposalsError.message);
		if (!proposalsData) return [];

		const proposalsList = await Promise.all(
			proposalsData.map(async (proposal) => {
				let setProposal: ProposalProp = proposal;

				const proposer = await PROFILE_QUERIES.fetchFreelancer(proposal.proposed_by);
				if (proposer) setProposal = { ...setProposal, proposer }

				const job = await JOB_QUERIES.fetchJobWithId(proposal.job_id);
				if (job) setProposal = { ...setProposal, job }

				return setProposal;
			})
		);

		return proposalsList;
	},
	fetchProposalWithId: async function (id: number): Promise<ProposalProp> {
		if (!id) throw new Error("No unique identifier found");

		const { data: proposalData, error: proposalError } = await supabase
			.from('proposals')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (proposalError) throw new Error(proposalError.message);
		if (!proposalData) return {} as ProposalProp;

		let proposal: ProposalProp = proposalData;

		const proposer = await PROFILE_QUERIES.fetchFreelancer(proposalData.proposed_by);
		if (proposer) proposal = { ...proposal, proposer: proposer };

		const job = await JOB_QUERIES.fetchJobWithId(proposal.job_id);
		if (job) proposal = { ...proposal, job: job };

		return proposal;
	}
};

export const MUTATIONS = {
	createProposal: async function (
		job_id: number,
		freelancer_id: number,
		employer_id: number,
		args: CreateProposalFormProp
	): Promise<boolean> {
		if (!job_id) throw new Error("No unique job identifier found");
		if (!freelancer_id) throw new Error("No unique freelancer identifier found");
		if (!args) throw new Error("Form data is required");

		const cleanArgs = Object.fromEntries(
			Object.entries(args).filter(([_, value]) => value !== undefined)
		)

		const { data, error } = await supabase
			.from("proposals")
			.insert([{
				...cleanArgs,
				job_id,
				proposed_by: freelancer_id,
				employer_id,
				status: "pending",
			}])
			.select('*')
			.single();

		if (error) throw new Error(error.message);
		if (!data) return false;

		return data ? true : false;;
	},
	updateProposalStatus: async function (
		proposal_id: number,
		status: "pending" | "accepted" | "rejected" | "withdrawn"
	): Promise<boolean> {
		if (!proposal_id) throw new Error("No unique identifier found");
		if (!status) throw new Error("No status found");

		const { data, error } = await supabase
			.from("proposals")
			.update({ status })
			.eq('id', proposal_id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		if (!data) return false;

		return data ? true : false;
	}
};