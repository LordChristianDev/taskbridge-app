import { Calendar, CalendarFold, Heart, MessageCircle, User } from "lucide-react";

import { createFullName, formatDate, formatIsoString } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { EmployerProp } from "@/types/personalization/profile-type";

type EmployerInfoProp = {
	profile: EmployerProp;
	isOwnProfile: boolean;
}

export default function EmployerInfo({ profile, isOwnProfile }: EmployerInfoProp) {
	const { first_name, last_name, sex, title, birth_date, created_at } = profile ?? {} as EmployerProp;

	const fullName = createFullName(first_name, last_name);
	const formatCreatedAt = formatIsoString(created_at);
	const formatBirthDate = formatDate(birth_date);

	return (
		<Card>
			<CardContent className="w-full">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full">
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{fullName}</h1>
					</div>

					<div className="flex flex-row gap-2">
						<Badge>Employer</Badge>

						{!isOwnProfile && (
							<div className="flex flexz-row gap-2 overflow-hidden">
								<Button>
									<MessageCircle className="w-4 h-4" />
									Contact
								</Button>

								<Button variant="outline" >
									<Heart className="w-4 h-4" />
									Follow Company
								</Button>
							</div>
						)}
					</div>
				</div>

				<p className="mb-4 text-muted-foreground ">{title}</p>

				{/* Data */}
				<div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
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
			</CardContent>
		</Card >
	);
}