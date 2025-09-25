import { supabase } from "@/lib/supabase";

import { FreelancerProp } from "@/types/personalization/profile-type";
import { QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";

export const QUERIES = {
	fetchFilteredFreelancers: async function (search?: string): Promise<FreelancerProp[]> {
		let freelancers: FreelancerProp[] = await QUERIES.fetchFreelancers();

		if (search) {
			freelancers = freelancers.filter((item) => {
				const sort = search!.toLowerCase();
				return item.first_name.toLowerCase().includes(sort) ||
					item.last_name.toLowerCase().includes(sort) ||
					item.education?.toLowerCase().includes(sort);
			});
		}

		return freelancers;
	},
	fetchFreelancers: async function (): Promise<FreelancerProp[]> {
		const { data: freelancersData, error: freelancersError } = await supabase
			.from('freelancers')
			.select('*')
			.order('created_at', { ascending: false });

		if (freelancersError) throw new Error(freelancersError.message);
		if (!freelancersData) return [];

		const freelancersList = await Promise.all(
			freelancersData.map(async (freelancer) => {
				if (!freelancer.skills) return freelancer;

				let setFreelancer: FreelancerProp = freelancer;

				console.log(freelancer.skills);

				const categoriesData = await PROFILE_QUERIES.fetchCategoriesByValue(freelancer.skills);
				setFreelancer = { ...setFreelancer, specified_skills: categoriesData };

				return setFreelancer;
			})
		);

		return freelancersList;
	},
}

