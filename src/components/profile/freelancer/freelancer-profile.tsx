import FreelancerHeader from "@/components/profile/freelancer/freelancer-header";
import FreelancerCover from "@/components/profile/freelancer/freelancer-cover";
import FreelancerInfo from "@/components/profile/freelancer/freelancer-info";
import FreelancerQuickStats from "@/components/profile/freelancer/freelancer-quick-stats";
import FreelancerContact from "@/components/profile/freelancer/freelancer-contact";

import { FreelancerProp } from "@/types/personalization/profile-type";

type FreelancerProfileProps = {
	profile: FreelancerProp
	isOwnProfile: boolean;
}

export function FreelancerProfile({ profile, isOwnProfile }: FreelancerProfileProps) {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<FreelancerHeader
				profile={profile}
				isOwnProfile={isOwnProfile}
			/>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{/* Left Column - Profile Info */}
					<div className="lg:col-span-2 space-y-4">
						<FreelancerCover profile={profile} />

						{/* Info */}
						<FreelancerInfo profile={profile} />
					</div>

					{/* Right Column - Details */}
					<div className="lg:col-span-1 space-y-4">
						{/* Quick Stats */}
						<FreelancerQuickStats profile={profile} />

						{/* Contact Information */}
						<FreelancerContact profile={profile} />
					</div>
				</div>
			</div>
		</div>
	)
}
