
import { Building, Users, Calendar } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

export default function EmployerStats() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg flex items-center gap-2">
					<Building className="w-5 h-5" />
					Company Stats
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<Users className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm">50-200 employees</span>
					</div>
					<div className="flex items-center gap-2">
						<Building className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm">Technology</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm">Founded 2015</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}