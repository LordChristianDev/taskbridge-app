"use client"

import { createContext, useContext, useState, type ReactNode } from "react";
import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfileHook = () => {
	const [profile, setProfile] = useState<FreelancerProp | EmployerProp | null>(null);

	const storeProfile = (data: FreelancerProp | EmployerProp) => {
		if (!data) {
			throw new Error('Data for profile storage is empty');
		}

		setProfile(data);
	}

	return { profile, storeProfile };
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const profileData = useProfileHook();

	return (
		<ProfileContext.Provider value={profileData} >
			{children}
		</ProfileContext.Provider>
	);
}

export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);

	if (context === undefined) {
		throw new Error('useProfile must be used within an ProfileProvider');
	}
	return context;
}

type ProfileContextType = {
	profile: FreelancerProp | EmployerProp | null;
	storeProfile: (data: FreelancerProp | EmployerProp) => void;
}

type ProfileProviderProps = {
	children: ReactNode;
}