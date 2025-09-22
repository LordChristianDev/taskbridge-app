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

import { FreelancerProp } from "@/types/personalization/profile-type";
import { UpdateFreelancerFormProp, UpdateFreelancerFormSchema } from "@/types/personalization/settings_type";
import { MUTATIONS, QUERIES } from "@/services/personalization/profile-service";

export default function FreelancerProfile() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useAuth();
	const { profile, storeProfile } = useProfile();
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<UpdateFreelancerFormProp>({
		defaultValues: {
			first_name: profile?.first_name ?? "",
			last_name: profile?.last_name ?? "",
			sex: profile?.sex ?? "",
			birth_date: profile?.birth_date ?? "",
			phone: profile?.phone ?? "",
			email: profile?.email ?? "",
			bio: "bio" in (profile ?? {}) ? (profile as FreelancerProp).bio ?? "" : "",


			middle_name: profile?.middle_name ?? "",
			suffix: profile?.suffix ?? "",
		},
		resolver: zodResolver(UpdateFreelancerFormSchema)
	});

	const { data: freelancerData, isFetching: freelancerFetching, refetch: refetchFreelancer } = useQuery({
		queryKey: ['freelancer-settings', user?.id],
		queryFn: () => QUERIES.fetchFreelancer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	useEffect(() => {
		if (freelancerData && !freelancerFetching) {
			storeProfile(freelancerData);

			reset({
				first_name: freelancerData.first_name ?? "",
				last_name: freelancerData.last_name ?? "",
				sex: freelancerData.sex ?? "",
				birth_date: freelancerData.birth_date ?? "",
				phone: freelancerData.phone ?? "",
				email: freelancerData.email ?? "",
				bio: freelancerData.bio ?? "",

				middle_name: freelancerData.middle_name ?? "",
				suffix: freelancerData.suffix ?? "",
			});
		}
	}, [freelancerData, freelancerFetching]);

	const onSubmit: SubmitHandler<UpdateFreelancerFormProp> = async (data) => {
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
			"freelancer",
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
		refetchFreelancer();
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

					<div className="space-y-2">
						<Label htmlFor="bio">Professional Bio</Label>
						<Textarea
							{...register("bio")}
							placeholder="Tell freelancers about your company, culture, and what makes you a great employer..."
							rows={4}
						/>
						{errors.bio && (
							<p className="text-sm text-red-600 mt-1">
								{errors.bio.message}
							</p>
						)}
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