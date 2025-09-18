"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useRoutes } from "@/hooks/useRoutes";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FreelancerFormProp, FreelancerFormSchema } from "@/types/authentication/register-types";

export default function RegisterFreelacerForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
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
			user_type: "freelancer",
			bio: "",

			middle_name: "",
			suffix: "",
		},
		resolver: zodResolver(FreelancerFormSchema)
	});
	const { move } = useRoutes();

	const onSubmit: SubmitHandler<FreelancerFormProp> = async (data) => {
		setIsLoading(true);

		setTimeout(() => {
			move("/freelancer/dashboard");
			setIsLoading(false)
		}, 1000)
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