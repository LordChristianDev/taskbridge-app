"use client"

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useAuth } from "@/context/use-auth";
import { useProfile } from "@/context/use-profile";
import { showToast } from "@/lib/show-toast";
import { extractPriceAndPeriod } from "@/lib/utils";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelectComboBox } from "@/components/ui/multi-combo-box";

import { FreelancerProp } from "@/types/personalization/profile-type";
import { UpdateFreelancerSkillsFormProp, UpdateFreelancerSkillsFormSchema } from "@/types/personalization/settings_type";
import { QUERIES as SETTINGS_QUERIES } from "@/services/personalization/settings-service";
import { MUTATIONS, QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";

export default function FreelancerSkills() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<{ value: string; title: string }[]>([]);
	const { user } = useAuth();
	const { profile, storeProfile } = useProfile();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<UpdateFreelancerSkillsFormProp>({
		defaultValues: {
			rate: extractPriceAndPeriod("rate" in (profile ?? {}) ? (profile as FreelancerProp).rate ?? "" : "")?.number ?? undefined,
			period: extractPriceAndPeriod("rate" in (profile ?? {}) ? (profile as FreelancerProp).rate ?? "" : "")?.period ?? "",
			title: profile?.title ?? "",
			education: "education" in (profile ?? {}) ? (profile as FreelancerProp).education ?? "" : "",
			skills: "skills" in (profile ?? {}) ? (profile as FreelancerProp).skills ?? [] : [],
		},
		resolver: zodResolver(UpdateFreelancerSkillsFormSchema)
	});

	const { data: categoriesList, isFetching: fetchingCategories } = useQuery({
		queryKey: ['categories-lists'],
		queryFn: async () => SETTINGS_QUERIES.fetchCategories(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const { data: freelancerData, isFetching: freelancerFetching, refetch: refetchFreelancer } = useQuery({
		queryKey: ['freelancer-settings-skills', user?.id],
		queryFn: () => PROFILE_QUERIES.fetchFreelancer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	useEffect(() => {
		if (freelancerData && !freelancerFetching) {
			storeProfile(freelancerData);

			const r = extractPriceAndPeriod(freelancerData.rate ?? "");

			reset({
				rate: r?.number ?? undefined,
				period: r?.period ?? "",
				title: freelancerData.title ?? "",
				education: freelancerData.education ?? "",
				skills: freelancerData.skills ?? [],
			});
		}
	}, [freelancerData, freelancerFetching]);

	useEffect(() => {
		if (categoriesList && !fetchingCategories) {
			const list = categoriesList.map(cat => {
				return { value: cat.value, title: cat.title };
			});

			setCategories(list);
		}
	}, [categoriesList, fetchingCategories]);

	const onSubmit: SubmitHandler<UpdateFreelancerSkillsFormProp> = async (data) => {
		if (!data) {
			showToast({
				title: "Form Empty!",
				description: "Please populate the skills information form.",
				variant: "warning"
			});
			return;
		}

		if (!profile?.user_id) {
			showToast({
				title: "Something went Wrong!",
				description: "Unable to complete this update.",
				variant: "error"
			});
			return;
		}
		setIsLoading(true);

		const response = await MUTATIONS.updateFreelancerSkillsWithUserId(profile.user_id, data);

		if (!response) {
			showToast({
				title: "Update Failed!",
				description: "Failed to update skills information.",
				variant: "error"
			});
			setIsLoading(false);
			return;
		}

		showToast({
			title: "Updated Account Successfully!",
			description: "Skills information has been updated.",
			variant: "success"
		});
		setIsLoading(false);
		refetchFreelancer();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className="mb-4">
				<CardHeader>
					<CardTitle>Skills & Expertise</CardTitle>
					<CardDescription>Add your skills to help clients find you for relevant projects</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								{...register("title")}
								type="text"
								placeholder="Enter title..."
							/>
							{errors.title && (
								<p className="text-sm text-red-600 mt-1">
									{errors.title.message}
								</p>
							)}
						</div>

						<div className="flex flex-row gap-4">
							<div className="flex-1 space-y-2">
								<Label htmlFor="rate">Current Rate</Label>
								<div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
									<span className="px-3 text-muted-foreground">₱</span>
									<Input
										{...register("rate", {
											setValueAs: (value) => value === undefined ? undefined : Number(value),
										})}
										type="number"
										placeholder="0.00"
										className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									/>
								</div>
								{errors.rate && (
									<p className="text-sm text-red-600 mt-1">
										{errors.rate.message}
									</p>
								)}
							</div>


							<div className="flex-1 space-y-2">
								<Label htmlFor="period">Per Period</Label>
								<Controller
									name="period"
									control={control}
									render={({ field }) => (
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder="Select period..." />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Hour">Hour</SelectItem>
												<SelectItem value="Week">Week</SelectItem>
												<SelectItem value="Month">Month</SelectItem>
												<SelectItem value="Project">Project</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
								{errors.period && (
									<p className="text-sm text-red-600 mt-1">
										{errors.period.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="education">Education</Label>
						<Input
							{...register("education")}
							type="text"
							placeholder="Enter Education (e.g.: BS Computer Science)"
						/>
						{errors.education && (
							<p className="text-sm text-red-600 mt-1">
								{errors.education.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="skills">Skills</Label>

						<Controller
							name="skills"
							control={control}
							render={({ field }) => (
								<MultiSelectComboBox
									options={categories}
									value={field.value}
									onValueChange={field.onChange}
									placeholder="Select skills..."
								/>
							)}
						/>
					</div>
				</CardContent>
			</Card >

			<div className="flex justify-end">
				<Button type="submit" disabled={isLoading} size="lg">
					{isLoading ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</form >
	);
}