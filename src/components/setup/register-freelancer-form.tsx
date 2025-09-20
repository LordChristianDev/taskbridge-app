"use client"

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useAuth } from "@/context/useAuth";
import { useRoutes } from "@/hooks/useRoutes";
import { showToast } from "@/lib/show-toast";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

import { FreelancerFormProp, FreelancerFormSchema } from "@/types/authentication/register-types";
import { MUTATIONS as AUTH_MUTATIONS } from "@/services/authentication/auth-service";
import { MUTATIONS as PROFILE_MUTATIONS } from "@/services/personalization/profile-service";

export default function RegisterFreelacerForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FreelancerFormProp>({
		defaultValues: {
			first_name: "",
			last_name: "",
			sex: "",
			birth_date: "",
			phone: "",
			email: "",
			bio: "",

			middle_name: "",
			suffix: "",
		},
		resolver: zodResolver(FreelancerFormSchema)
	});
	const { move } = useRoutes();
	const { user, supabaseUser, signOut } = useAuth();

	useEffect(() => {
		if (supabaseUser) {
			const parts = supabaseUser.user_metadata?.name.trim().split(" ") ?? ['New', 'User'];
			const lastName = parts.pop();
			const firstName = parts.join(" ");

			const email = supabaseUser.email ?? "";

			reset({
				first_name: firstName,
				last_name: lastName,
				sex: "",
				birth_date: "",
				phone: "",
				email: email,
				bio: "",

				middle_name: "",
				suffix: "",
			});
		}
	}, [supabaseUser]);

	const onSubmit: SubmitHandler<FreelancerFormProp> = async (data) => {
		if (!data) {
			showToast({
				title: "Form is Empty!",
				description: "Please populate the account creation form.",
				variant: "warning"
			});
			return;
		}

		if (!user?.id) {
			showToast({
				title: "Something went Wrong!",
				description: "Unable to complete account creation.",
				variant: "error"
			});
			return;
		}
		setIsLoading(true);

		const profileData = await PROFILE_MUTATIONS.createProfileWithUserId(
			user.id,
			"freelancer",
			supabaseUser?.user_metadata?.picture ?? null,
			data
		);

		await AUTH_MUTATIONS.updateUserType(user.id, "freelancer");
		await AUTH_MUTATIONS.updateUserIsSetup(user.id);

		if (!profileData) {
			showToast({
				title: "Updated Failed!",
				description: "Failed to create new account.",
				variant: "error"
			});
			setIsLoading(false);
			signOut();
			move("/login");
			return;
		}

		move("/dashboard");
		setIsLoading(false);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Basic Info */}
			<div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
			</div>

			<div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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

			<div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
					<DatePicker {...register("birth_date")} />

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
					placeholder="Tell us about your experience and expertise"
					rows={3}
				/>

				{errors.bio && (
					<p className="text-sm text-red-600 mt-1">
						{errors.bio.message}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? "Creating account..." : "Create Account"}
			</Button>
		</form>
	);
}