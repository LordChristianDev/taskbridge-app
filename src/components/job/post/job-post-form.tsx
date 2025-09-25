"use client"

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useProfile } from "@/context/use-profile";
import { useRoutes } from "@/hooks/use-routes";
import { showToast } from "@/lib/show-toast";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelectComboBox } from "@/components/ui/multi-combo-box";

import { PostJobFormProp, PostJobFormSchema } from "@/types/dashboard/job-type";
import { QUERIES } from "@/services/personalization/settings-service";
import { MUTATIONS } from "@/services/dashboard/job-service";

export default function JobPostForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>("fixed");
	const [categories, setCategories] = useState<{ value: string; title: string }[]>([]);
	const { back } = useRoutes();
	const { profile } = useProfile();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<PostJobFormProp>({
		defaultValues: {
			title: "",
			description: "",
			requirements: "",

			budget_type: "fixed",
			min_budget: undefined,
			max_budget: undefined,

			duration: "",
			level: "beginner",
			is_urgent: false,

			categories: [],
		},
		resolver: zodResolver(PostJobFormSchema)
	});

	const { data: categoriesList, isFetching: fetchingCategories } = useQuery({
		queryKey: ['categories-lists'],
		queryFn: async () => QUERIES.fetchCategories(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	useEffect(() => {
		if (categoriesList && !fetchingCategories) {
			const list = categoriesList.map(cat => {
				return { value: cat.value, title: cat.title };
			});

			setCategories(list);
		}
	}, [categoriesList, fetchingCategories]);

	const onSubmit: SubmitHandler<PostJobFormProp> = async (data) => {
		if (!data) {
			showToast({
				title: "Form Empty!",
				description: "Please populate the job form.",
				variant: "warning"
			});
			return;
		}

		if (!profile?.user_id) {
			showToast({
				title: "Something went Wrong!",
				description: "Unable to post this job.",
				variant: "error"
			});
			return;
		}

		const response = await MUTATIONS.createJob(profile.user_id, data);

		if (!response) {
			showToast({
				title: "Post Failed!",
				description: "Failed to post ajob.",
				variant: "error"
			});
			setIsLoading(false);
			return;
		}

		showToast({
			title: "Created Job Successfully!",
			description: "Job information has been post.",
			variant: "success"
		});
		setIsLoading(false);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Basic Information */}
			<Card>
				<CardHeader>
					<CardTitle>Job Details</CardTitle>
					<CardDescription>Provide basic information about your project</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Job Title</Label>
						<Input
							{...register("title")}
							type="Text"
							placeholder="e.g. React Developer for E-commerce Platform"
						/>
						{errors.title && (
							<p className="text-sm text-red-600 mt-1">
								{errors.title.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Job Description</Label>
						<Textarea
							{...register("description")}
							placeholder="Describe your project in detail, including objectives, deliverables, and any specific requirements..."
							rows={4}
						/>
						{errors.description && (
							<p className="text-sm text-red-600 mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="level">Experience Level</Label>
							<Controller
								name="level"
								control={control}
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select level" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="beginner">Beginner</SelectItem>
											<SelectItem value="intermediate">Intermediate</SelectItem>
											<SelectItem value="expert">Expert</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.level && (
								<p className="text-sm text-red-600 mt-1">
									{errors.level.message}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Budget & Timeline */}
			<Card>
				<CardHeader>
					<CardTitle>Budget & Timeline</CardTitle>
					<CardDescription>Set your budget and project timeline</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="budget_type">Budget Type</Label>
							<Controller
								name="budget_type"
								control={control}
								render={({ field }) => (
									<Select onValueChange={(val) => {
										field.onChange(val)
										setBudgetType(val as 'fixed' | 'hourly')
									}} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select budget type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="fixed">Fixed Price</SelectItem>
											<SelectItem value="hourly">Hourly Rate</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.budget_type && (
								<p className="text-sm text-red-600 mt-1">
									{errors.budget_type.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="min_budget">
									{budgetType === "fixed" ? "Minimum Budget (₱)" : "Min Hourly Rate (₱/hr)"}
								</Label>
								<Input
									{...register("min_budget", {
										setValueAs: (value) => value === undefined ? undefined : Number(value),
									})}
									type="number"
									placeholder="1000"
								/>
								{errors.min_budget && (
									<p className="text-sm text-red-600 mt-1">
										{errors.min_budget.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="max_budget">
									{budgetType === "fixed" ? "Maximum Budget (₱)" : "Max Hourly Rate (₱/hr)"}
								</Label>
								<Input
									{...register("max_budget", {
										setValueAs: (value) => value === undefined ? undefined : Number(value),
									})}
									type="number"
									placeholder="5000"
								/>
								{errors.max_budget && (
									<p className="text-sm text-red-600 mt-1">
										{errors.max_budget.message}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="duration">Project Duration</Label>
							<Input
								{...register("duration")}
								type="text"
								placeholder="Specify the duration of the job... (e.g.: 1-3 months)"
							/>
							{errors.duration && (
								<p className="text-sm text-red-600 mt-1">
									{errors.duration.message}
								</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Skills & Requirements */}
			<Card>
				<CardHeader>
					<CardTitle>Skills & Requirements</CardTitle>
					<CardDescription>Specify the skills and requirements for this job</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Required Skills</Label>
						<Controller
							name="categories"
							control={control}
							render={({ field }) => (
								<MultiSelectComboBox
									options={categories}
									value={field.value}
									onValueChange={field.onChange}
									placeholder="Select categories..."
								/>
							)}
						/>
						{errors.categories && (
							<p className="text-sm text-red-600 mt-1">
								{errors.categories.message}
							</p>
						)}
					</div>


					<div className="space-y-2">
						<Label htmlFor="requirements">Job Requirements</Label>
						<Textarea
							{...register("requirements")}
							placeholder="Describe your project in detail, including objectives, deliverables, and any specific requirements..."
							rows={4}
						/>
					</div>

					<div className="flex items-center space-x-2">
						<Controller
							name="is_urgent"
							control={control}
							render={({ field }) => (
								<Checkbox
									checked={field.value || false}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label htmlFor="is_urgent">This is an urgent project</Label>
					</div>
				</CardContent>
			</Card>

			{/* Submit */}
			<div className="flex justify-end space-x-4">
				<Button type="button" variant="outline" onClick={() => back()}>
					Cancel
				</Button>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Posting Job..." : "Post Job"}
				</Button>
			</div>
		</form>
	);
}