import { supabase } from "@/lib/supabase";
import { CategoryProp } from "@/types/personalization/settings_type";

export const QUERIES = {
	fetchCategories: async function (): Promise<CategoryProp[]> {
		const { data: categoriesData, error: categoriesError } = await supabase
			.from('categories')
			.select('*')
			.order('created_at', { ascending: false });

		if (categoriesError) throw new Error(categoriesError.message);
		if (!categoriesData) return [];

		return categoriesData;
	},
};