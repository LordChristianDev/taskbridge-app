import { supabase } from "@/lib/supabase";
import { FilterJobsProp, JobProp, PostJobFormProp } from "@/types/dashboard/job-type";
import { QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";

export const QUERIES = {
	fetchFilteredJobs: async function (filters?: FilterJobsProp): Promise<JobProp[]> {
		let filteredJobs = await QUERIES.fetchJobs();

		if (filters?.search) {
			filteredJobs = filteredJobs.filter((item) => {
				const value = filters.search!.toLowerCase();
				return item.title.toLowerCase().includes(value) ||
					item.description.toLowerCase().includes(value) ||
					item.employer.company.toLowerCase().includes(value);
			});
		}

		if (filters?.category && filters?.category !== "all") {
			filteredJobs = filteredJobs.filter((item) => {
				const value = filters.category!.toLowerCase();
				return item.categories.some((category) => category.value.toLowerCase().includes(value));
			});
		}

		if (filters?.level && filters?.level !== "all") {
			filteredJobs = filteredJobs.filter((item) => {
				return item.level === filters.level;
			});
		}

		return filteredJobs;
	},
	fetchJobs: async function (): Promise<JobProp[]> {
		const { data: jobsData, error: jobsError } = await supabase
			.from('jobs')
			.select('*')
			.order('created_at', { ascending: false });

		if (jobsError) throw new Error(jobsError.message);
		if (!jobsData) return [];

		const jobsList = await Promise.all(
			jobsData.map(async (job) => {
				let setJob: JobProp = job

				const employer = await PROFILE_QUERIES.fetchEmployer(job.created_by);
				setJob = { ...setJob, employer, };

				const categories = await PROFILE_QUERIES.fetchCategoriesByValue(job.categories ?? []);
				setJob = { ...setJob, categories, };

				return setJob;
			})
		);

		return jobsList;
	},
	fetchJobsByCategories: async function (categories: string[]): Promise<JobProp[]> {
		const { data: jobsData, error: jobsError } = await supabase
			.from('jobs')
			.select('*')
			.overlaps("categories", categories)
			.order('created_at', { ascending: false });

		if (jobsError) throw new Error(jobsError.message);
		if (!jobsData) return [];

		const jobsList = await Promise.all(
			jobsData.map(async (job) => {
				let setJob: JobProp = job

				const employer = await PROFILE_QUERIES.fetchEmployer(job.created_by);
				setJob = { ...setJob, employer, };

				const categories = await PROFILE_QUERIES.fetchCategoriesByValue(job.categories ?? []);
				setJob = { ...setJob, categories, };

				return setJob;
			})
		);

		return jobsList;
	},
	fetchJobsByEmployerId: async function (employer_id: number): Promise<JobProp[]> {
		if (!employer_id) throw new Error("No unique identifier found");

		const { data: jobsData, error: jobsError } = await supabase
			.from('jobs')
			.select('*')
			.eq('created_by', employer_id)
			.order('created_at', { ascending: false });

		if (jobsError) throw new Error(jobsError.message);
		if (!jobsData) return [];

		const jobsList = await Promise.all(
			jobsData.map(async (job) => {
				let setJob: JobProp = job

				const employer = await PROFILE_QUERIES.fetchEmployer(job.created_by);
				setJob = { ...setJob, employer, };

				const categories = await PROFILE_QUERIES.fetchCategoriesByValue(job.categories ?? []);
				setJob = { ...setJob, categories, };

				return setJob;
			})
		);

		return jobsList;
	},
	fetchJobWithId: async function (id: number): Promise<JobProp> {
		if (!id) throw new Error("No unique identifier found");

		const { data: jobData, error: jobError } = await supabase
			.from('jobs')
			.select('*')
			.eq('id', id)
			.maybeSingle();

		if (jobError) throw new Error(jobError.message);
		if (!jobData) return {} as JobProp;

		let job: JobProp = jobData;

		const employer = await PROFILE_QUERIES.fetchEmployer(jobData.created_by);
		job = { ...job, employer: employer };

		const categories = await PROFILE_QUERIES.fetchCategoriesByValue(jobData.categories ?? []);
		job = { ...job, categories: categories };

		return job;
	},
};

export const MUTATIONS = {
	createJob: async function (
		user_id: number,
		args: PostJobFormProp,
	): Promise<boolean> {
		if (!user_id) throw new Error("No Unique Identifier found");
		if (!args) throw new Error("Form Data is Empty");

		const cleanArgs = Object.fromEntries(
			Object.entries(args).filter(([_, value]) => value !== undefined)
		);

		const { data, error } = await supabase
			.from("jobs")
			.insert([{
				...cleanArgs,
				created_by: user_id,
				status: "lead",
			}])
			.select('*')
			.single();

		if (error) console.error(error.message);

		return data ? true : false;
	},
}