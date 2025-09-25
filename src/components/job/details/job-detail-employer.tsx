"use client"

import Link from "next/link";

import { useAuth } from "@/context/use-auth";
import { createFullName, getInitials } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarIcon from "@/components/common/avatar-icon";

import { JobProp } from "@/types/dashboard/job-type";

export default function JobDetailEmployer({ job }: { job: JobProp }) {
	const { user } = useAuth();

	const { employer } = job;
	const { first_name, last_name, avatar_url, company, user_id } = employer;

	const fullName = createFullName(first_name, last_name);
	const initials = getInitials(fullName);

	return (
		<Card>
			<CardHeader>
				<CardTitle>About the Client</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-start space-x-4 mb-4">
					<AvatarIcon
						src={avatar_url ?? ""}
						fallback={initials}
					/>

					<div>
						<h4 className="font-semibold">{fullName}</h4>
						<p className="text-sm text-muted-foreground">{company}</p>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Jobs Posted</span>
						<span className="text-sm font-medium">3</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Hire Rate</span>
						<span className="text-sm font-medium">75%</span>
					</div>
				</div>

				{user?.user_type === "freelancer" && (
					<div className="mt-4 pt-4 border-t">
						<Link
							href={`/profile/${user_id}?type=employer`}
							target="_blank"
						>
							<Button className="w-full bg-transparent" variant="outline">
								View Client Profile
							</Button>
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
}