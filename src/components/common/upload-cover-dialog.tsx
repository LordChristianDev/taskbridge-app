"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";

import { useAuth } from "@/context/use-auth";
import { useProfile } from "@/context/use-profile";
import { showToast } from "@/lib/show-toast"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { EmployerProp, FreelancerProp, UpdateUploadProp } from "@/types/personalization/profile-type";
import { MUTATIONS, QUERIES } from "@/services/personalization/profile-service";

const UploadCoverDialog = ({ children }: { children: React.ReactNode }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const [cover, setCover] = useState<UpdateUploadProp>();
	const imageRef = useRef<HTMLInputElement>(null);

	const { user } = useAuth();
	const { profile, storeProfile } = useProfile();

	const { data: profileData, isFetching: profileFetching, refetch: refetchProfile } = useQuery<FreelancerProp | EmployerProp | null>({
		queryKey: ['cover-upload', user?.id],
		queryFn: user?.user_type === "freelancer"
			? () => QUERIES.fetchFreelancer(user?.id ?? 0)
			: () => QUERIES.fetchEmployer(user?.id ?? 0),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		enabled: !!user?.id,
		staleTime: 0,
	});

	useEffect(() => {
		if (profileData && !profileFetching) {
			storeProfile(profileData);
		}
	}, [profileData, profileFetching]);

	const handleUpload = (image: File | null) => {
		if (!image) return;

		// Check Type
		if (!image.type.startsWith('image/')) {
			showToast({
				title: "Invalid file type",
				description: "Only image files are allowed",
				variant: "warning"
			});
			return;
		}

		// Check if less than 10MB limit
		if (image.size > 10 * 1024 * 1024) {
			showToast({
				title: "File too large",
				description: "Images must be smaller than 10MB",
				variant: "warning"
			});
			return;
		}

		setCover({
			id: Math.random().toString(36).substring(2, 9),
			file: image,
			url: URL.createObjectURL(image),
			type: image.type,
		});
	};

	const handleSave = async () => {
		if (!cover?.file) {
			showToast({
				title: "File is empty!",
				description: "Unable to complete upload without uploaded file",
				variant: "error"
			});
			return;
		}

		if (!profile?.user_id) {
			showToast({
				title: "Something went wrong!",
				description: "Unable to complete upload without identifier",
				variant: "error"
			});
			return;
		}

		if (!user?.user_type) {
			showToast({
				title: "Something went wrong!",
				description: "Unable to complete upload without identifier",
				variant: "error"
			});
			return;
		}

		setIsLoading(true);

		const response = await MUTATIONS.updateCoverWithUserId(
			profile.user_id,
			user.user_type,
			cover
		);

		if (!response) {
			showToast({
				title: "Update Failed!",
				description: "Failed to update profile cover.",
				variant: "error"
			});
			setIsLoading(false);
			return;
		}

		showToast({
			title: "Updated Profile Cover!",
			description: "Successfully updated profile cover.",
			variant: "success"
		});

		setIsLoading(false);
		setIsDialogOpen(false);
		refetchProfile();
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>

			<DialogContent className="max-w-xl max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Upload Cover</DialogTitle>

					<DialogDescription>
						Upload a new cover photo
					</DialogDescription>
				</DialogHeader>

				<div className="mb-2 flex items-center justify-center"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div className="relative w-full h-48">
						<Image
							src={cover?.url
								? cover?.url ?? "/city.jpg"
								: profile?.cover_url
									? profile?.cover_url ?? "/city.jpg"
									: "/city.jpg"}
							alt="Cover"
							width={1000}
							height={1000}
							className="object-cover w-full h-full rounded-xl"
						/>
						{isHovered &&
							<div className="absolute top-0 bg-black/25 rounded-xl w-full h-full cursor-pointer">
								<a
									onClick={() => imageRef.current?.click()}
									className="flex items-center justify-center text-white h-full"
								>
									<Camera className="h-8 w-8" />
								</a>
							</div>}
					</div>
				</div>

				<input
					ref={imageRef}
					type="file"
					multiple
					accept="image/*"
					className="hidden"
					onChange={(e) => handleUpload(e.target.files?.[0] || null)}
				/>

				<Button
					type="submit"
					onClick={handleSave}
					className="flex bg-primary hover:scale-102 transition-smooth duration-300 cursor-pointer">
					{isLoading
						? <span className="flex items-center">
							<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span className="p-18-semibold text-white">Saving...</span>
						</span>
						: <span className="p-18-semibold text-white">Set as Cover</span>}
				</Button>
			</DialogContent>
		</Dialog >
	);
}

export default UploadCoverDialog;