import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

export default function EmployerHiring() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hiring Preferences</CardTitle>
				<CardDescription>Set your preferences for finding and working with freelancers</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Preferred Communication</h4>
							<p className="text-sm text-muted-foreground">
								How do you prefer to communicate with freelancers?
							</p>
						</div>
						<Select defaultValue="platform">
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="platform">Platform messaging</SelectItem>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="video">Video calls</SelectItem>
								<SelectItem value="phone">Phone calls</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Project Budget Range</h4>
							<p className="text-sm text-muted-foreground">Typical budget range for your projects</p>
						</div>
						<Select defaultValue="medium">
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="small">$500 - $2,000</SelectItem>
								<SelectItem value="medium">$2,000 - $10,000</SelectItem>
								<SelectItem value="large">$10,000 - $50,000</SelectItem>
								<SelectItem value="enterprise">$50,000+</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Response Time Expectation</h4>
							<p className="text-sm text-muted-foreground">How quickly do you expect responses?</p>
						</div>
						<Select defaultValue="24h">
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1h">Within 1 hour</SelectItem>
								<SelectItem value="4h">Within 4 hours</SelectItem>
								<SelectItem value="24h">Within 24 hours</SelectItem>
								<SelectItem value="48h">Within 48 hours</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Freelancer Experience Level</h4>
							<p className="text-sm text-muted-foreground">Preferred experience level for projects</p>
						</div>
						<Select defaultValue="any">
							<SelectTrigger className="w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="entry">Entry level</SelectItem>
								<SelectItem value="intermediate">Intermediate</SelectItem>
								<SelectItem value="expert">Expert only</SelectItem>
								<SelectItem value="any">Any level</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}