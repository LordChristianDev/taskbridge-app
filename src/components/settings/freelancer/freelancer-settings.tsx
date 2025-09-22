import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FreelancerHeader from "@/components/settings/freelancer/freelancer-header";
import FreelancerAccount from "@/components/settings/freelancer/freelancer-account";
import FreelancerProfile from "@/components/settings/freelancer/freelancer-profile";
import FreelancerSkills from "@/components/settings/freelancer/freelancer-skills";

export function FreelancerSettings() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<FreelancerHeader />

			<div className="container mx-auto px-4 py-8">
				<Tabs defaultValue="profile" className="space-y-6">
					<TabsList className="grid grid-cols-3 w-full">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger value="skills">Skills</TabsTrigger>
						<TabsTrigger value="account">Account</TabsTrigger>
					</TabsList>

					{/* Profile Tab */}
					<TabsContent value="profile" className="space-y-6">
						<FreelancerProfile />
					</TabsContent>

					{/* Skills Tab */}
					<TabsContent value="skills" className="space-y-6">
						<FreelancerSkills />
					</TabsContent>

					{/* Account Tab */}
					<TabsContent value="account" className="space-y-6">
						<FreelancerAccount />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
