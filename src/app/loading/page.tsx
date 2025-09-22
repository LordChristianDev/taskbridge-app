"use client"

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/use-auth";
import { useRoutes } from "@/hooks/use-routes";

import { MUTATIONS, QUERIES } from "@/services/authentication/auth-service";

export default function LoadingPage() {
	const [shouldCreateUser, setShouldCreateUser] = useState<boolean>(false);
	const { user, supabaseUser, storeUser, signOut } = useAuth();
	const { move } = useRoutes();

	const { data: userData, refetch: userRefetch } = useQuery({
		queryKey: ['user', supabaseUser?.id],
		queryFn: async () => QUERIES.fetchUser(supabaseUser?.id ?? ''),
		enabled: !!supabaseUser?.id
	});

	const createUser = useMutation({
		mutationFn: async () => MUTATIONS.createUserWithUID(supabaseUser?.id ?? ""),
		onSuccess: (data) => {
			if (data) {
				storeUser(data);
				move("/setup")
			}
		},
		onError: (error) => console.error("Error creating user:", error)
	});

	useEffect(() => {
		if (!supabaseUser) {
			signOut();
			move("/login");
			return;
		}

		if (supabaseUser.id) {
			userRefetch();
		}

		if (user) {
			if (!user.is_setup) {
				move("/setup");
			} else {
				move("/dashboard");
			}
		}
	}, [supabaseUser, user]);

	useEffect(() => {
		if (userData === undefined) return;

		if (userData === null) {
			setShouldCreateUser(true);
		} else {
			storeUser(userData);
		}
	}, [userData]);

	useEffect(() => {
		if (shouldCreateUser && supabaseUser?.id) {
			createUser.mutate();
		}
	}, [shouldCreateUser, supabaseUser?.id]);

	return (
		<main className="flex items-center justify-center bg-background w-full min-h-screen">
			<div className="flex items-center">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					className=" mr-4 text-black dark:text-white animate-spin h-8 w-8"
				>
					<circle
						className="opacity-25"
						cx="12" cy="12" r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>

				<span className="text-2xl text-black dark:text-white">Loading...</span>
			</div>
		</main>
	);
} 