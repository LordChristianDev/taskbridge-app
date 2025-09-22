import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployerAccount() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Settings</CardTitle>
				<CardDescription>Manage your account preferences and security</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Email Notifications</h4>
							<p className="text-sm text-muted-foreground">
								Receive notifications about proposals and messages
							</p>
						</div>

						<Button variant="outline" size="sm">
							Configure
						</Button>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Billing & Payments</h4>
							<p className="text-sm text-muted-foreground">Manage payment methods and billing information</p>
						</div>

						<Button variant="outline" size="sm">
							Manage
						</Button>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Change Password</h4>
							<p className="text-sm text-muted-foreground">Update your account password</p>
						</div>

						<Button variant="outline" size="sm">
							Change
						</Button>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium">Delete Account</h4>
							<p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
						</div>

						<Button variant="destructive" size="sm">
							Delete
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}