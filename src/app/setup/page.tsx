"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import type React from "react";

import { useAuth } from "@/context/use-auth";
import { useRoutes } from "@/hooks/use-routes";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import RegisterTypeSelection from "@/components/setup/register-type-selection";
import RegisterFreelancerForm from "@/components/setup/register-freelancer-form";
import RegisterEmployerForm from "@/components/setup/register-employer-form";

import { RegisterPageProp } from "@/types/authentication/register-types";

export default function RegisterPage() {
	const [userType, setUserType] = useState<RegisterPageProp["userType"]>("freelancer");
	const { user } = useAuth();
	const { move } = useRoutes();

	useEffect(() => {
		if (user) {
			if (user.is_setup) {
				move("/dashboard");
			}
		} else {
			move("/login");
		}
	}, [user, move]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-xl">
				<Card>
					<CardHeader className="text-center">
						<div className="mb-2 flex items-center justify-center">
							<div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
								<Image
									src="/taskbridge_white.png"
									alt="logo"
									width={250}
									height={250}
								/>
							</div>
						</div>

						<CardTitle className="text-2xl">Join TaskBridge</CardTitle>

						<CardDescription>Create your account to get started</CardDescription>
					</CardHeader>

					<CardContent>
						{/* User Type Selection */}
						<RegisterTypeSelection
							onChange={(updates) => {
								setUserType(updates.userType);
							}}
						/>

						{/* Register Form */}
						{userType === "freelancer" ? (
							<RegisterFreelancerForm />
						) : (
							<RegisterEmployerForm />
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
