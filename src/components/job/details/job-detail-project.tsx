import { Clock, DollarSign, Users, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { JobProp } from "@/types/dashboard/job-type";
import { ProposalProp } from "@/types/dashboard/proposal-type";

type JobDetailProjectProp = {
	job: JobProp;
	proposals: ProposalProp[];
}

export default function JobDetailProject({ job, proposals }: JobDetailProjectProp) {
	const { min_budget, max_budget, duration } = job;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Details</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<DollarSign className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">Budget</span>
					</div>
					<span className="font-semibold">{`₱ ${min_budget} - ${max_budget}`}</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Clock className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">Duration</span>
					</div>
					<span className="font-semibold">{duration}</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Users className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">Proposals</span>
					</div>
					<span className="font-semibold">{proposals.length}</span>
				</div>
			</CardContent>
		</Card>

	);
}