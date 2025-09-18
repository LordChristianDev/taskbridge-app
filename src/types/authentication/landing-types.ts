import { LucideIcon } from "lucide-react";

export type NavigationBarDataProp = {
	title: string;
	url: string;
}

export type StatsSectionDataProp = {
	stat: string;
	title: string;
}

export type HowItWorksDataProp = {
	id: number;
	title: string;
	description: string;
}

export type FeatureDataProp = {
	id: number;
	title: string;
	description: string;
	icon: LucideIcon;
}