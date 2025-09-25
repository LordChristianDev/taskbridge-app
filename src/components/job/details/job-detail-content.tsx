"use client"

import { useAuth } from "@/context/use-auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobDetailHeader from "@/components/job/details/job-detail-header";
import JobDetailTitle from "@/components/job/details/job-detail-title";
import JobDetailProposals from "@/components/job/details/job-detail-proposals";
import JobDetailProject from "@/components/job/details/job-detail-project";
import JobDetailEmployer from "@/components/job/details/job-detail-employer";

import { JobProp } from "@/types/dashboard/job-type";
import { ProposalProp } from "@/types/dashboard/proposal-type";

type JobDetailContent = {
	job: JobProp;
	proposals: ProposalProp[];
	update: () => void;
}

export function JobDetailContent({ job, proposals, update }: JobDetailContent) {
	const { user } = useAuth();
	const { description, requirements } = job;

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<JobDetailHeader />

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-4">
						{/* Job Header */}
						<JobDetailTitle
							job={job}
							proposals={proposals}
						/>

						{/* Job Description */}
						<Card>
							<CardHeader>
								<CardTitle>Job Description</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose prose-sm max-w-none">
									{description.split("\n").map((paragraph, index) => (
										<p key={index} className="mb-4 last:mb-0">
											{paragraph}
										</p>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Requirements */}
						{requirements && <Card>
							<CardHeader>
								<CardTitle>Requirements</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose prose-sm max-w-none">
									{requirements.split("\n").map((requirement, index) => (
										<p key={index} className="mb-2 last:mb-0">
											{requirement}
										</p>
									))}
								</div>
							</CardContent>
						</Card>}

						{/* Proposals (for employers) */}
						{user?.user_type === "employer" && (
							<JobDetailProposals
								job={job}
								proposals={proposals}
								update={update}
							/>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-4">
						{/* Budget & Timeline */}
						<JobDetailProject
							job={job}
							proposals={proposals}
						/>

						{/* Employer Info */}
						<JobDetailEmployer job={job} />

						{/* Similar Jobs */}
						<Card>
							<CardHeader>
								<CardTitle>Similar Jobs</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{[
									{ title: "Vue.js Developer Needed", budget: "$2,000 - $3,500" },
									{ title: "Full-Stack Web Application", budget: "$4,000 - $7,000" },
									{ title: "React Native Mobile App", budget: "$3,500 - $5,500" },
								].map((job, index) => (
									<div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
										<h5 className="font-medium text-sm mb-1">{job.title}</h5>
										<p className="text-xs text-muted-foreground">{job.budget}</p>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}