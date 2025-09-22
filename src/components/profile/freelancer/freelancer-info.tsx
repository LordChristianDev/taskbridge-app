import { Calendar, CalendarFold, User } from "lucide-react";

import { createFullName, formatDate, formatIsoString } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SeeMore from "@/components/common/see-more";

import { FreelancerProp } from "@/types/personalization/profile-type";

export default function FreelancerInfo({ profile }: { profile: FreelancerProp }) {
	const { first_name, last_name, sex, birth_date, bio, skills, created_at } = profile ?? {} as FreelancerProp;

	const fullName = createFullName(first_name, last_name);
	const formatCreatedAt = formatIsoString(created_at);
	const formatBirthDate = formatDate(birth_date);

	const renderSkills = skills && skills.length > 0 && skills.map((skill) => {
		return (
			<Badge key={skill} variant="outline">
				{skill}
			</Badge>
		);
	});

	return (
		<Card>
			<CardContent className="w-full">
				<div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full">
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{fullName}</h1>
					</div>

					<div className="flex">
						<Badge>Freelancer</Badge>
					</div>
				</div>

				{/* Bio */}
				{bio && <div className="mb-6">
					<SeeMore text={bio} />
				</div>}

				{/* Data */}
				<div className="mb-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						Joined on {formatCreatedAt}
					</div>

					<div className="flex items-center gap-1">
						<User className="h-4 w-4" />{sex}
					</div>

					<div className="flex items-center gap-1">
						<CalendarFold className="h-4 w-4" />{formatBirthDate}
					</div>
				</div>

				{/* Skills */}
				{skills && skills?.length > 0 &&
					<div className="flex flex-col gap-2">
						<h2>Skills</h2>
						<div className="flex flex-wrap gap-2">
							{renderSkills}
						</div>
					</div>
				}
			</CardContent>
		</Card >
	);
}