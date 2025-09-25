"use client"

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useProfile } from "@/context/use-profile";
import { showToast } from "@/lib/show-toast";

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

import { JobProp } from "@/types/dashboard/job-type";
import { CreateProposalFormProp, CreateProposalFormSchema } from "@/types/dashboard/proposal-type";
import { MUTATIONS } from "@/services/dashboard/proposal-service";

type ProposalFormProp = {
	job: JobProp;
	onChange: (isOpen: boolean) => void;
}

export default function ProposalForm({ job, onChange }: ProposalFormProp) {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { profile } = useProfile();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<CreateProposalFormProp>({
		defaultValues: {
			cover_letter: "",
			proposed_budget: undefined,
			delivery_timeline: "",
			delivery_milestone: "",
		},
		resolver: zodResolver(CreateProposalFormSchema),
	});

	useEffect(() => {
		onChange(isDialogOpen);
	}, [isDialogOpen]);

	const { budget_type, min_budget, max_budget } = job;
	const jobBudget = budget_type === "fixed" ? `₱${min_budget} - ₱${max_budget} (Fixed)` : `₱${min_budget}/hr - ₱${max_budget}/hr (Hourly)`;

	const onSubmit: SubmitHandler<CreateProposalFormProp> = async (data) => {
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

		const response = await MUTATIONS.createProposal(
			job.id,
			job.created_by,
			profile.user_id,
			data
		);

		if (!response) {
			showToast({
				title: "Proposal Failed!",
				description: "Failed to send proposal.",
				variant: "error"
			});
			return;
		}

		showToast({
			title: "Proposal Created!",
			description: "Your proposal has been successfully sent.",
			variant: "success"
		});

		setIsLoading(false);
		setIsDialogOpen(false);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="cover_letter">Cover Letter</Label>
				<Textarea
					{...register("cover_letter")}
					placeholder="Introduce yourself and explain why you're the perfect fit for this project..."
					rows={6}
				/>
				{errors.cover_letter && (
					<p className="text-sm text-red-600 mt-1">
						{errors.cover_letter.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="proposed_budget">Your Proposed Budget</Label>
				<div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
					<span className="px-3 text-muted-foreground">₱</span>
					<Input
						{...register("proposed_budget", {
							setValueAs: (value) => value === undefined ? undefined : Number(value),
						})}
						type="number"
						placeholder="0.00"
						className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>
				<p className="text-xs text-muted-foreground">Client's budget: {jobBudget}</p>
				{errors.proposed_budget && (
					<p className="text-sm text-red-600 mt-1">
						{errors.proposed_budget.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="delivery_time">Delivery Timeline</Label>
				<Controller
					name="delivery_timeline"
					control={control}
					render={({ field }) => (
						<Select onValueChange={field.onChange} value={field.value}>
							<SelectTrigger>
								<SelectValue placeholder="Select timeline" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1-day">1 day</SelectItem>
								<SelectItem value="1-week">1 week</SelectItem>
								<SelectItem value="2-weeks">2 weeks</SelectItem>
								<SelectItem value="1-month">1 month</SelectItem>
								<SelectItem value="2-months">2 months</SelectItem>
								<SelectItem value="3-months">3 months</SelectItem>
								<SelectItem value="3-5-months">3-6 months</SelectItem>
								<SelectItem value="6-12-months">6-12 months</SelectItem>
								<SelectItem value="1-year">1 year</SelectItem>
								<SelectItem value="more-than-1-year">More than 1 year</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.delivery_timeline && (
					<p className="text-sm text-red-600 mt-1">
						{errors.delivery_timeline.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="milestones">Project Milestones (Optional)</Label>
				<Textarea
					placeholder="Break down your approach into key milestones and deliverables..."
					rows={4}
				/>
			</div>

			<div className="flex justify-end space-x-4">
				<Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
					Cancel
				</Button>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Sending..." : "Send Proposal"}
				</Button>
			</div>
		</form>
	);
}