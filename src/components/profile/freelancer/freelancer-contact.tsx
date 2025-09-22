import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FreelancerProp } from "@/types/personalization/profile-type";

export default function FreelancerContact({ profile }: { profile: FreelancerProp }) {
	const { email, phone } = profile ?? {} as FreelancerProp;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Contact Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Email </span>
					<span className="font-medium">{email ?? "N/A"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Phone</span>
					<span className="font-medium">{phone ?? "N/A"}</span>
				</div>
			</CardContent>
		</Card>
	);
}