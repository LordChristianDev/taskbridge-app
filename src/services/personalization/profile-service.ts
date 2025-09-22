import { supabase } from "@/lib/supabase";
import { EmployerFormProp, FreelancerFormProp } from "@/types/authentication/register-types";
import { EmployerProp, FreelancerProp, UpdateUploadProp } from "@/types/personalization/profile-type";
import { UpdateEmployerFormProp, UpdateFreelancerFormProp, UpdateFreelancerSkillsFormProp } from "@/types/personalization/settings_type";

export const QUERIES = {
	fetchFreelancer: async function (user_id: number): Promise<FreelancerProp> {
		if (!user_id) throw new Error("No unique identifier found");

		const { data: freelancerData, error: freelancerError } = await supabase
			.from('freelancers')
			.select('*')
			.eq('user_id', user_id)
			.maybeSingle();

		if (freelancerError) throw new Error(freelancerError.message);
		if (!freelancerData) return {} as FreelancerProp;

		let freelancer: FreelancerProp = freelancerData;

		const categoriesData = await QUERIES.fetchCategoriesByValue(freelancer?.skills ?? []);
		if (categoriesData) freelancer = { ...freelancer, skills: categoriesData };

		return freelancer;
	},
	fetchEmployer: async function (user_id: number): Promise<EmployerProp | null> {
		if (!user_id) throw new Error("No unique identifier found");

		const { data: employersData, error: employersError } = await supabase
			.from('employers')
			.select('*')
			.eq('user_id', user_id)
			.single();

		if (employersError) throw new Error(employersError.message);
		if (!employersData) return null;

		let employer: EmployerProp = employersData;

		const categoriesData = await QUERIES.fetchCategoriesByValue(employer?.company_categories ?? []);
		if (categoriesData) employer = { ...employer, company_categories: categoriesData };

		return employer;
	},
	fetchCategoriesByValue: async function (values: string[]): Promise<string[]> {
		if (!values || values.length === 0) return [];

		const { data: categoriesData, error: categoriesError } = await supabase
			.from("categories")
			.select('*')
			.in("value", values)
			.order("created_at", { ascending: false });

		if (categoriesError) console.error(categoriesError.message);
		if (!categoriesData) return [];

		const categories = categoriesData.map(cat => cat.title);

		return categories;
	},
	retrieveBucketUrl: async function (name: string, bucket: string): Promise<string> {
		if (!name) throw new Error("Unable to determine url with no file name");

		const { data } = supabase.storage.from(bucket).getPublicUrl(name);
		if (!data) return '';

		return data.publicUrl;
	}
};

export const MUTATIONS = {
	createProfileWithUserId: async function (
		user_id: number,
		type: "freelancer" | "employer",
		avatar_url: string | null,
		args: FreelancerFormProp | EmployerFormProp
	): Promise<FreelancerProp | null> {
		if (!user_id) throw new Error("No Unique Identifier found");
		if (!type) throw new Error("User Type is not found");

		const table = type === "freelancer"
			? "freelancers"
			: type === "employer"
				? "employers"
				: '';

		if (!table) return null;

		const cleanUpdates = Object.fromEntries(
			Object.entries(args).filter(([_, value]) => value !== undefined)
		)

		const { data, error } = await supabase
			.from(table)
			.insert([{
				...cleanUpdates,
				user_id,
				avatar_url,
			}])
			.select('*')
			.single();

		if (error) throw new Error(error.message);
		if (!data) return null;

		return data;
	},
	updateProfileWithUserId: async function (
		user_id: number,
		type: "freelancer" | "employer",
		updates: UpdateFreelancerFormProp | UpdateEmployerFormProp
	): Promise<FreelancerProp | EmployerProp | null> {
		if (!user_id) throw new Error("No Unique Identifier found");
		if (!type) throw new Error("User Type is not found");

		const table = type === "freelancer"
			? "freelancers"
			: type === "employer"
				? "employers"
				: '';

		if (!table) return null;

		const cleanUpdates = Object.fromEntries(
			Object.entries(updates).filter(([_, value]) => value !== undefined)
		);

		const { data: data, error: error } = await supabase
			.from(table)
			.update(cleanUpdates)
			.eq('user_id', user_id)
			.select('*')
			.single();

		if (error) throw new Error(error.message);
		if (!data) return null;

		return data;
	},
	updateFreelancerSkillsWithUserId: async function (
		user_id: number,
		updates: UpdateFreelancerSkillsFormProp
	): Promise<FreelancerProp | EmployerProp | null> {
		if (!user_id) throw new Error("No Unique Identifier found");

		const { period, ...rest } = updates;

		const actualUpdates = {
			...rest,
			rate: `${updates.rate} per ${period}`
		};;

		const cleanUpdates = Object.fromEntries(
			Object.entries(actualUpdates).filter(([_, value]) => value !== undefined)
		);

		const { data: data, error: error } = await supabase
			.from("freelancers")
			.update(cleanUpdates)
			.eq('user_id', user_id)
			.select('*')
			.single();

		if (error) throw new Error(error.message);
		if (!data) return null;

		return data;
	},
	updateAvatarWithUserId: async function (
		user_id: number,
		type: "freelancer" | "employer",
		avatar: UpdateUploadProp,
	): Promise<FreelancerProp | EmployerProp | null> {
		if (!user_id) throw new Error("No Unique Identifier found");
		if (!type) throw new Error("User Type is not found");
		if (!avatar) throw new Error('Avatar File not found');

		const table = type === "freelancer"
			? "freelancers"
			: type === "employer"
				? "employers"
				: '';
		if (!table) return null;

		const { file } = avatar;

		const ext = file.name.split('.').pop();
		const name = `${user_id}_${Date.now()}.${ext}`;

		// Upload Avatar to Supabase Bucket
		MUTATIONS.uploadSupabaseToBucket(name, "avatars", avatar);

		const avatar_url = await QUERIES.retrieveBucketUrl(name, "avatars");
		if (!avatar_url) return null;

		const { data, error } = await supabase
			.from(table)
			.update({ avatar_url })
			.eq('user_id', user_id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		if (!data) return null;

		return data;
	},
	updateCoverWithUserId: async function (
		user_id: number,
		type: "freelancer" | "employer",
		cover: UpdateUploadProp,
	): Promise<FreelancerProp | EmployerProp | null> {
		if (!user_id) throw new Error("No Unique Identifier found");
		if (!type) throw new Error("User Type is not found");
		if (!cover) throw new Error('Cover File not found');

		const table = type === "freelancer"
			? "freelancers"
			: type === "employer"
				? "employers"
				: '';
		if (!table) return null;

		const { file } = cover;

		const ext = file.name.split('.').pop();
		const name = `${user_id}_${Date.now()}.${ext}`;

		// Upload Cover to Supabase Bucket
		MUTATIONS.uploadSupabaseToBucket(name, "covers", cover);

		const cover_url = await QUERIES.retrieveBucketUrl(name, "covers");
		if (!cover_url) return null;

		console.log("Cover URL: ", cover_url);

		const { data, error } = await supabase
			.from(table)
			.update({ cover_url })
			.eq('user_id', user_id)
			.select()
			.single();

		if (error) throw new Error(error.message);
		if (!data) return null;

		return data;
	},
	uploadSupabaseToBucket: async function (name: string, bucket: string, upload: UpdateUploadProp) {
		if (!upload) throw new Error('Avatar File not found');

		const { file, type } = upload;

		const { error } = await supabase.storage.from(bucket).upload(
			name, file,
			{
				contentType: type,
				upsert: true,
			},
		);

		if (error) throw new Error(error.message);
	},
}

