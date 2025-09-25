"use client"

import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";

import { useProfile } from "@/context/use-profile";
import { capitalizeFirstLetter, formatIsoString, getFreelancerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { QUERIES } from "@/services/dashboard/proposal-service";
import { ProposalProp } from "@/types/dashboard/proposal-type";

export default function FreelancerProposals() {
	const { profile } = useProfile();

	const { data: proposals, isFetching: proposalsFetching } = useQuery({
		queryKey: ['freelancer-proposals'],
		queryFn: () => QUERIES.fetchProposalsByFreelancerId(profile!.id),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: true,
		staleTime: 0,
	});

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Proposals</h2>
			</div>

			{proposalsFetching ? (
				<div className="animate-pulse space-y-4">
					<div className="flex-1 h-72 bg-muted rounded" />
				</div>
			) : (
				<ScrollArea className="space-y-4 h-128">
					{!proposals || proposals.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-64">
							<p className="text-sm text-muted-foreground">No proposals found</p>
						</div>
					) : (
						proposals.map((proposal) => {
							return (<ProposalCard key={proposal.id} proposal={proposal} />);
						})
					)}
				</ScrollArea>
			)}
		</>
	);
}

export function ProposalCard({ proposal }: { proposal: ProposalProp }) {
	const { id, proposed_at, proposed_budget, status, cover_letter, delivery_timeline, delivery_milestones, job } = proposal;
	const { title, employer } = job;
	const { company } = employer;

	const proposed_date = formatIsoString(proposed_at);
	const cname = getFreelancerStatusColor(status);

	return (
		<Card key={id} className="mb-6 mr-4">
			<CardContent className="px-6">
				<div className="mb-4 flex items-start justify-between">
					<div className="flex-1">
						<h3 className="mb-1 text-lg font-semibold">{title}</h3>
						<p className="mb-2 text-sm text-muted-foreground">{company}</p>
						<p className="mb-3 text-muted-foreground line-clamp-2">{cover_letter}</p>
						{delivery_milestones && <p className="mb-3 text-muted-foreground line-clamp-2">{delivery_milestones}</p>}

						<div className="flex items-center space-x-4 text-sm text-muted-foreground">
							<span className="font-medium text-foreground">Proposed: ₱ {proposed_budget}</span>
							<span className="font-medium text-foreground">Timeline: {delivery_timeline}</span>
							<span>Submitted: {proposed_date}</span>
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<Badge variant="outline" className={cname}>
							{capitalizeFirstLetter(status)}
						</Badge>
						{status === "accepted" && <CheckCircle className="w-5 h-5 text-green-600" />}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}