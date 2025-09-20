import { UserProp } from "@/context/useAuth";
import { supabase } from "@/lib/supabase";

export const QUERIES = {
	fetchUser: async function (uid: string): Promise<UserProp | null> {
		if (!uid) throw new Error("No Supabase UID Identifier");

		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('*')
			.eq('google_uid', uid)
			.maybeSingle();

		if (userError) console.error(userError.message);
		if (!userData) return null;

		return userData;
	},
}

export const MUTATIONS = {
	createUserWithUID: async function (uid: string): Promise<UserProp | null> {
		if (!uid) throw new Error("No Supabase UID Identifier");

		console.log("I am currently here", uid);

		const { data: userData, error: userError } = await supabase
			.from('users')
			.insert([{
				google_uid: uid,
				last_login: new Date().toISOString(),
			}])
			.select('*')
			.maybeSingle();

		if (userError) console.error(userError.message);
		if (!userData) return null;

		return userData;
	},
	updateUserLastLogin: async function (id: number): Promise<UserProp | null> {
		if (!id) throw new Error("No User ID Identifier");

		const { data: userData, error: userError } = await supabase
			.from('users')
			.update({
				last_login: new Date().toISOString(),
			})
			.eq('id', id)
			.select('*')
			.single();

		if (userError) throw new Error(userError.message);
		if (!userData) return null;

		return userData;
	},
	updateUserType: async function (id: number, user_type: "freelancer" | "employer"): Promise<UserProp | null> {
		if (!id) throw new Error("No User ID Identifier");
		if (!user_type) throw new Error("User Type is not defined");

		const { data: userData, error: userError } = await supabase
			.from('users')
			.update({ user_type })
			.eq('id', id)
			.select('*')
			.single();

		if (userError) throw new Error(userError.message);
		if (!userData) return null;

		return userData;
	},
	updateUserIsSetup: async function (id: number): Promise<UserProp | null> {
		if (!id) throw new Error("No User ID Identifier");

		let user: UserProp | null = null;

		const { data: userData, error: userError } = await supabase
			.from('users')
			.update({
				is_setup: true,
			})
			.eq('id', id)
			.select('*')
			.single();

		if (userError) throw new Error(userError.message);
		if (userData) user = userData;

		return user;
	},
}