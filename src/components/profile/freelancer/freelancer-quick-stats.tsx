import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FreelancerProp } from "@/types/personalization/profile-type";

export default function FreelancerQuickStats({ profile }: { profile: FreelancerProp }) {
	const { title, rate, education } = profile ?? {} as FreelancerProp;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Quick Stats</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Title</span>
					<span className="font-medium">{title ?? "N/A"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Current Rate</span>
					<span className="font-medium">₱ {rate ?? "N/A"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Education</span>
					<span className="font-medium">{education ?? "N/A"}</span>
				</div>
			</CardContent>
		</Card>
	);
}