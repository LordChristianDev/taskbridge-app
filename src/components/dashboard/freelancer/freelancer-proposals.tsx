"use client"

import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";

import { getFreelancerStatusColor } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MockProposalProp } from "@/types/dashboard/freelancer-type";
import { QUERIES } from "@/services/dashboard/freelancer-service";

export default function FreelancerProposals() {
	const { data: proposals, isFetching: proposalsFetching } = useQuery({
		queryKey: ['freelancer-propsals'],
		queryFn: () => QUERIES.fetchMockProposals(),
		initialData: [] as MockProposalProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderProposals = proposals.map((proposal) => {
		const { id, jobTitle, company, coverLetter, proposedBudget, submittedDate, status } = proposal;
		const cname = getFreelancerStatusColor(status);

		return (
			<Card key={id} className="mb-6 mr-4">
				<CardContent className="p-6">
					<div className="mb-4 flex items-start justify-between">
						<div className="flex-1">
							<h3 className="mb-1 text-lg font-semibold">{jobTitle}</h3>
							<p className="mb-2 text-sm text-muted-foreground">{company}</p>
							<p className="mb-3 text-muted-foreground line-clamp-2">{coverLetter}</p>

							<div className="flex items-center space-x-4 text-sm text-muted-foreground">
								<span className="font-medium text-foreground">Proposed: {proposedBudget}</span>
								<span>Submitted {submittedDate}</span>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Badge variant="outline" className={cname}>
								{status}
							</Badge>
							{status === "accepted" && <CheckCircle className="w-5 h-5 text-green-600" />}
						</div>
					</div>
				</CardContent>
			</Card>
		);
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
					{renderProposals}
				</ScrollArea>
			)}
		</>
	);
}