"use client"

import { createContext, useContext, type ReactNode } from "react";
import { usePersistedState } from "@/hooks/use-persisted-state";

import { EmployerProp, FreelancerProp } from "@/types/personalization/profile-type";
import { removeItem } from "@/lib/local-storage";


const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfileHook = () => {
	const [profile, setProfile] = usePersistedState<FreelancerProp | EmployerProp | null>("profile", null);

	const storeProfile = (data: FreelancerProp | EmployerProp) => {
		if (!data) {
			throw new Error('Data for profile storage is empty');
		}

		setProfile(data);
	}

	const clearOut = async () => {
		setProfile(null);
		removeItem("profile");
	};

	return { profile, storeProfile, clearOut };
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
	clearOut: () => void;
}

type ProfileProviderProps = {
	children: ReactNode;
}