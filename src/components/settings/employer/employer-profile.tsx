"use client"

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useAuth } from "@/context/use-auth";
import { useProfile } from "@/context/use-profile";
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
import { DatePicker } from "@/components/ui/date-picker";
import { MultiSelectComboBox } from "@/components/ui/multi-combo-box";

import { EmployerProp } from "@/types/personalization/profile-type";
import { UpdateEmployerFormProp, UpdateEmployerFormSchema } from "@/types/personalization/settings_type";
import { QUERIES as SETTINGS_QUERIES } from "@/services/personalization/settings-service";
import { MUTATIONS, QUERIES as PROFILE_QUERIES } from "@/services/personalization/profile-service";

export default function EmployerProfile() {
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
	} = useForm<UpdateEmployerFormProp>({
		defaultValues: {
			first_name: profile?.first_name ?? "",
			last_name: profile?.last_name ?? "",
			sex: profile?.sex ?? "",
			birth_date: profile?.birth_date ?? "",
			phone: profile?.phone ?? "",
			email: profile?.email ?? "",
			title: profile?.title ?? "",
			company: "company" in (profile ?? {}) ? (profile as EmployerProp).company ?? "" : "",
			company_description: "company_description" in (profile ?? {}) ? (profile as EmployerProp).company_description ?? "" : "",

			middle_name: profile?.middle_name ?? "",
			suffix: profile?.suffix ?? "",
			company_categories: "company_categories" in (profile ?? {}) ? (profile as EmployerProp).company_categories ?? [] : [],
		},
		resolver: zodResolver(UpdateEmployerFormSchema)
	});

	const { data: categoriesList, isFetching: fetchingCategories } = useQuery({
		queryKey: ['categories-lists'],
		queryFn: async () => SETTINGS_QUERIES.fetchCategories(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const { data: employerData, isFetching: employerFetching, refetch: refetchEmployer } = useQuery({
		queryKey: ['employer-settings', user?.id],
		queryFn: () => PROFILE_QUERIES.fetchEmployer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	useEffect(() => {
		if (employerData && !employerFetching) {
			storeProfile(employerData);

			reset({
				first_name: employerData.first_name ?? "",
				last_name: employerData.last_name ?? "",
				sex: employerData.sex ?? "",
				birth_date: employerData.birth_date ?? "",
				phone: employerData.phone ?? "",
				email: employerData.email ?? "",
				title: employerData.title ?? "",
				company: employerData.company ?? "",
				company_description: employerData.company_description ?? "",

				middle_name: employerData.middle_name ?? "",
				suffix: employerData.suffix ?? "",
				company_categories: employerData.company_categories ?? [],
			});
		}
	}, [employerData, employerFetching]);

	useEffect(() => {
		if (categoriesList && !fetchingCategories) {
			const list = categoriesList.map(cat => {
				return { value: cat.value, title: cat.title };
			});

			setCategories(list);
		}
	}, [categoriesList, fetchingCategories]);

	const onSubmit: SubmitHandler<UpdateEmployerFormProp> = async (data) => {
		if (!data) {
			showToast({
				title: "Form Empty!",
				description: "Please populate the update information form.",
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

		const response = await MUTATIONS.updateProfileWithUserId(
			profile.user_id,
			"employer",
			data
		);

		if (!response) {
			showToast({
				title: "Update Failed!",
				description: "Failed to update account information.",
				variant: "error"
			});
			setIsLoading(false);
			return;
		}

		showToast({
			title: "Updated Account Successfully!",
			description: "Account information has been updated.",
			variant: "success"
		});
		setIsLoading(false);
		refetchEmployer();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className="mb-4">
				<CardHeader>
					<CardTitle>Company Information</CardTitle>
					<CardDescription>Update your company profile to attract top talent</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="space-y-2">
							<Label htmlFor="first_name">First Name</Label>
							<Input
								{...register("first_name")}
								type="text"
								placeholder="Enter first name..."
							/>
							{errors.first_name && (
								<p className="text-sm text-red-600 mt-1">
									{errors.first_name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="middle_name">Middle Name</Label>
							<Input
								{...register("middle_name")}
								type="text"
								placeholder="Enter middle name..."
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="last_name">Last Name</Label>
							<Input
								{...register("last_name")}
								type="text"
								placeholder="Enter last name..."
							/>
							{errors.last_name && (
								<p className="text-sm text-red-600 mt-1">
									{errors.last_name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="suffix">Suffix</Label>
							<Input
								{...register("suffix")}
								type="text"
								placeholder="Enter suffix..."
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="sex">Sex</Label>
							<Controller
								name="sex"
								control={control}
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select sex..." />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>

							{errors.sex && (
								<p className="text-sm text-red-600 mt-1">
									{errors.sex.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="birth_date">Birth date</Label>
							<Controller
								name="birth_date"
								control={control}
								render={({ field }) => (
									<DatePicker
										value={field.value}
										onChange={(e) => field.onChange(e.target.value)}
										onBlur={field.onBlur}
										name={field.name}
									/>
								)}
							/>
							{errors.birth_date && (
								<p className="text-sm text-red-600 mt-1">
									{errors.birth_date.message}
								</p>
							)}
						</div>
					</div>

					<div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input
								{...register("phone")}
								type="number"
								placeholder="Enter phone number..."
							/>

							{errors.phone && (
								<p className="text-sm text-red-600 mt-1">
									{errors.phone.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								{...register("email")}
								type="text"
								placeholder="Enter email..."
							/>

							{errors.email && (
								<p className="text-sm text-red-600 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="title">Company Title</Label>
							<Input
								{...register("title")}
								type="text"
								placeholder="Enter company title..."
							/>
							{errors.title && (
								<p className="text-sm text-red-600 mt-1">
									{errors.title.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="company">Company Name</Label>
							<Input
								{...register("company")}
								type="text"
								placeholder="Enter company name..."
							/>
							{errors.company && (
								<p className="text-sm text-red-600 mt-1">
									{errors.company.message}
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="company_description">Company Description</Label>
						<Textarea
							{...register("company_description")}
							placeholder="Tell freelancers about your company, culture, and what makes you a great employer..."
							rows={4}
						/>
						{errors.company_description && (
							<p className="text-sm text-red-600 mt-1">
								{errors.company_description.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="company_categories">Company Categories</Label>

						<Controller
							name="company_categories"
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