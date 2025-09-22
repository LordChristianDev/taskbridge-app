import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployerProp } from "@/types/personalization/profile-type";

export default function EmployerContact({ profile }: { profile: EmployerProp }) {
	const { email, phone } = profile ?? {} as EmployerProp;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Contact Information </CardTitle>
			</CardHeader>
			< CardContent className="space-y-4" >
				<div className="flex justify-between" >
					<span className="text-muted-foreground" > Email </span>
					< span className="font-medium" > {email ?? "N/A"}  </span>
				</div>
				< div className="flex justify-between" >
					<span className="text-muted-foreground" > Phone </span>
					< span className="font-medium" > {phone ?? "N/A"}</span>
				</div>
			</CardContent>
		</Card>
	);
}