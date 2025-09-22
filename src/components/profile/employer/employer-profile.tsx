import EmployerHeader from "@/components/profile/employer/employer-header";
import EmployerCover from "@/components/profile/employer/employer-cover";
import EmployerInfo from "@/components/profile/employer/employer-info";
import EmployerStats from "@/components/profile/employer/employer-stats";
import EmployerAbout from "@/components/profile/employer/employer-about";
import EmployerContact from "@/components/profile/employer/employer-contact";

import { EmployerProp } from "@/types/personalization/profile-type";

interface EmployerProfileProps {
	profile: EmployerProp;
	isOwnProfile: boolean;
}

export function EmployerProfile({ profile, isOwnProfile }: EmployerProfileProps) {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<EmployerHeader
				profile={profile}
				isOwnProfile={isOwnProfile}
			/>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{/* Left Column - Company Info */}
					<div className="lg:col-span-2 space-y-4">
						<EmployerCover profile={profile} />

						{/* Info */}
						<EmployerInfo
							profile={profile}
							isOwnProfile={isOwnProfile}
						/>

						{/* Company */}
						<EmployerAbout profile={profile} />
					</div>

					{/* Right Column - Details */}
					<div className="lg:col-span-1 space-y-4">
						{/* Stats */}
						<EmployerStats />

						{/* Contact Information */}
						<EmployerContact profile={profile} />
					</div>
				</div>
			</div>
		</div>
	)
}
