"use client"

import { Users, MapPin, Calendar, Send } from "lucide-react";

import { useAuth } from "@/context/use-auth";
import { capitalizeFirstLetter, formatIsoString } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProposalDialog } from "@/components/proposal/proposal-dialog";

import { JobProp } from "@/types/dashboard/job-type";
import { ProposalProp } from "@/types/dashboard/proposal-type";

type JobDetailTitle = {
	job: JobProp;
	proposals: ProposalProp[];
}

export default function JobDetailTitle({ job, proposals }: JobDetailTitle) {
	const { user } = useAuth();

	const { created_at, title, employer, level, is_urgent, categories } = job;
	const { company } = employer;

	const posted_at = formatIsoString(created_at);

	const renderCategories = categories.map((cat) => {
		const { value, title } = cat;

		return (
			<Badge key={value} variant="outline">{title}</Badge>
		);
	});

	return (
		<Card>
			<CardContent className="px-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h1 className="text-2xl font-bold mb-2">{title}</h1>
						<p className="text-muted-foreground mb-3">{company}</p>
						<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
							<div className="flex items-center space-x-1">
								<MapPin className="w-4 h-4" />
								<span>Remote</span>
							</div>
							<div className="flex items-center space-x-1">
								<Calendar className="w-4 h-4" />
								<span>Posted on {posted_at}</span>
							</div>
							<div className="flex items-center space-x-1">
								<Users className="w-4 h-4" />
								<span>{proposals.length} proposals</span>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{renderCategories}
							<Badge variant="outline">{capitalizeFirstLetter(level)}</Badge>
							{is_urgent && <Badge variant="destructive">Urgent</Badge>}
						</div>
					</div>
					{user?.user_type === "freelancer" && (
						(!proposals || proposals.length === 0) ? (
							<ProposalDialog job={job} />
						) : (
							<Button size="lg" disabled={true}>
								<Send className="w-4 h-4" />
								Proposal Sent
							</Button>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
}