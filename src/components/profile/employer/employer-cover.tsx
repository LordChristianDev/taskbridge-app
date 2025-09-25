"use client"

import { useState } from "react";
import Image from "next/image";
import { Camera, Image as ImageIcon } from "lucide-react";

import { createFullName, getInitials } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import AvatarIcon from "@/components/common/avatar-icon";
import UploadCoverDialog from "@/components/common/upload-cover-dialog";
import UploadAvatarDialog from "@/components/common/upload-avatar-dialog";

import { EmployerProp } from "@/types/personalization/profile-type";

export default function EmployerCover({ profile }: { profile: EmployerProp }) {
	const [isCoverHovered, setIsCoverHovered] = useState<boolean>(false);
	const [isAvatarHovered, setIsAvatarHovered] = useState<boolean>(false);

	const { first_name, last_name, avatar_url, cover_url } = profile ?? {} as EmployerProp;

	const fullname = createFullName(first_name, last_name);
	const initials = getInitials(fullname);

	const cover = cover_url ? cover_url : "/city.jpg";

	return (
		<div className="relative rounded-xl overflow-hidden h-48 md:h-64"
			onMouseEnter={() => setIsCoverHovered(true)}
			onMouseLeave={() => setIsCoverHovered(false)}
		>
			<Image
				src={cover}
				alt="Cover"
				className="object-cover w-full h-full"
				width={10000}
				height={3000}
				priority={true}
				unoptimized={false}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
			{isCoverHovered && (
				<UploadCoverDialog>
					<Button
						variant="outline"
						className="absolute -bottom-0 -right-0 gap-2 cursor-pointer"
					>
						<ImageIcon className="h-4 w-4" />
						Upload Cover Photo
					</Button>
				</UploadCoverDialog>
			)}

			{/* Profile Avatar */}
			<div className="absolute bottom-[1rem] left-[2rem]"
				onMouseEnter={() => setIsAvatarHovered(true)}
				onMouseLeave={() => setIsAvatarHovered(false)}
			>
				<div className="relative">
					<AvatarIcon
						src={avatar_url ?? "https://github.com/shadcn.png"}
						fallback={initials}
						size="3xl"
						className="border-4 border-background shadow-strong"
					/>
					{isAvatarHovered && (
						<UploadAvatarDialog>
							<Button
								variant="outline"
								size="icon"
								className="absolute -bottom-0 -right-0 rounded-full bg-gradient-primary text-primary-foreground w-8 h-8 shadow-medium hover:scale-105 transition-smooth cursor-pointer"
							>
								<Camera className="h-4 w-4" />
							</Button>
						</UploadAvatarDialog>
					)}
				</div>
			</div>
		</div>
	);
}