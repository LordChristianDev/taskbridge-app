import { supabase } from "@/lib/supabase";
import { CategoryProp, LevelProp } from "@/types/personalization/settings_type";

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
	fetchLevels: async function (): Promise<LevelProp[]> {
		const { data: levelsData, error: levelsError } = await supabase
			.from('levels')
			.select('*')
			.order('created_at', { ascending: false });

		if (levelsError) throw new Error(levelsError.message);
		if (!levelsData) return [];

		return levelsData;
	},
};