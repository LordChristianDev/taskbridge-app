"use client"

import { useState } from "react";
import Link from "next/link";
import {
	capitalizeFirstLetter,
	createFullName,
	formatIsoString,
	getInitials
} from "@/lib/utils";
import { showToast } from "@/lib/show-toast";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarIcon from "@/components/common/avatar-icon";

import { JobProp } from "@/types/dashboard/job-type";
import { ProposalProp } from "@/types/dashboard/proposal-type";
import { MUTATIONS as PROJECT_MUTATIONS } from "@/services/dashboard/project-service";
import { MUTATIONS as PROPOSAL_MUTATIONS } from "@/services/dashboard/proposal-service";

type JobDetailProposalsProp = {
	job: JobProp;
	proposals: ProposalProp[];
	update: () => void;
}

export default function JobDetailProposals({ job, proposals, update }: JobDetailProposalsProp) {
	const [showProposals, setShowProposals] = useState<boolean>(false);
	const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState<boolean>(false);
	const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
	const [deadline, setDeadline] = useState<string>("");

	const renderProposals = proposals.map((proposal) => {
		const { id, proposed_at, proposed_by, proposed_budget, status, delivery_timeline, cover_letter, proposer } = proposal;
		const { first_name, last_name, title, avatar_url } = proposer;

		const fullName = createFullName(first_name, last_name);
		const initials = getInitials(fullName);
		const proposed_date = formatIsoString(proposed_at);

		const acceptProposal = async () => {
			const updStatus = await PROPOSAL_MUTATIONS.updateProposalStatus(id, "accepted");
			const crtProject = await PROJECT_MUTATIONS.createProject(
				job.id,
				job.employer.user_id,
				proposal,
				deadline,
			);

			if (!updStatus || !crtProject) {
				showToast({
					title: "Something went Wrong!",
					description: "Unable to accept proposal.",
					variant: "error"
				});
			}

			update();
		}

		const confirmReject = async () => {
			const response = await PROPOSAL_MUTATIONS.updateProposalStatus(id, "rejected");

			if (!response) {
				showToast({
					title: "Something went Wrong!",
					description: "Unable to reject proposal.",
					variant: "error"
				});
			}

			update();
		}

		return (
			<div key={id}>
				<div className="border rounded-lg p-4">
					<div className="flex items-start space-x-4">
						<AvatarIcon
							src={avatar_url ?? ""}
							fallback={initials}
							size="lg"
						/>

						<div className="flex-1">
							<div className="flex items-center justify-between mb-2">
								<div>
									<div className="flex space-x-4">
										<h4 className="font-semibold">{fullName}</h4>
										<Badge variant="outline">{capitalizeFirstLetter(status)}</Badge>
									</div>
									<p className="text-sm text-muted-foreground">{title}</p>
								</div>

								<div className="text-right">
									<p className="font-semibold">₱ {proposed_budget}</p>
									<p className="text-sm text-muted-foreground">{delivery_timeline}</p>
								</div>
							</div>

							<div className="flex items-center space-x-4 mb-3">
								<span className="text-sm text-muted-foreground">Submitted {proposed_date}</span>
							</div>

							<p className="text-sm text-muted-foreground mb-3 line-clamp-2">{cover_letter}</p>

							<div className="flex justify-between gap-2">
								<Link
									href={`/profile/${proposed_by}?type=freelancer`}
									target="_blank"
								>
									<Button size="sm">View Profile</Button>
								</Link>


								<div className="flex space-x-2">
									{status === "pending" ? (
										<>
											<Button
												size="sm"
												variant="success"
												className="cursor-pointer"
												onClick={() => setIsAcceptDialogOpen(true)}
											>
												Accept
											</Button>

											<Button
												size="sm"
												variant="destructive"
												className="cursor-pointer"
												onClick={() => setIsRejectDialogOpen(true)}
											>
												Reject
											</Button>
										</>
									) : status === "accepted" ? (
										<Button
											size="sm"
											variant="success"
											disabled={true}
										>
											Accepted
										</Button>
									) : (
										<Button
											size="sm"
											variant="outline"
											disabled={true}
										>
											{capitalizeFirstLetter(status)}
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Accept proposal</DialogTitle>
							<DialogDescription> Are you sure you want to accept this proposal?</DialogDescription>
						</DialogHeader>

						<div className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="datetime">Set Deadline (Optional)</Label>
								<DateTimePicker
									value={deadline}
									onChange={(e) => (setDeadline(e.target.value))}
								/>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={() => setIsAcceptDialogOpen(false)}>Cancel</Button>
							<Button variant="destructive" onClick={acceptProposal}>Accept</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Reject proposal</DialogTitle>
							<DialogDescription> Are you sure you want to reject this proposal?</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
							<Button variant="destructive" onClick={confirmReject}>Reject</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		);
	});

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Proposals ({proposals.length})</CardTitle>
					<Button variant="outline" onClick={() => setShowProposals(!showProposals)}>
						{showProposals ? "Hide" : "View"} Proposals
					</Button>
				</div>
			</CardHeader>
			{showProposals && (
				<CardContent className="space-y-4">
					{renderProposals}
				</CardContent>
			)}
		</Card>
	);
}