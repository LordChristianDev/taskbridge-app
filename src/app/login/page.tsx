"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";;
import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/context/use-auth";
import { useRoutes } from "@/hooks/use-routes";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { move } = useRoutes();
	const { user, supabaseUser, googleSignIn } = useAuth();

	useEffect(() => {
		if (user) {
			if (!user.is_setup) {
				move("/setup");
			} else if (user.is_setup) {
				move("/dashboard");
			}
		} else if (supabaseUser && !user) {
			move("/loading");
		}
	}, [user, supabaseUser, move]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		await googleSignIn();
		setIsLoading(false);
	}

	return (
		<div className="min-h-screen p-4 bg-background flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="mb-8 flex items-center justify-center">
					<Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
						<ArrowLeft className="w-4 h-4" />
						<span>Back to home</span>
					</Link>
				</div>

				<Card>
					<CardHeader className="py-4 space-y-1 text-center">
						<div className="flex items-center justify-center">
							<div className="flex items-center space-x-2 mb-4">
								<div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
									<Image
										src="/taskbridge_white.png"
										alt="logo"
										width={250}
										height={250}
									/>
								</div>
								<span className="text-xl font-bold text-foreground">TaskBridge</span>
							</div>

						</div>
						<CardTitle className="text-2xl">Grab Opportunities</CardTitle>

						<CardDescription>
							Sign in to your Taskbridge account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Button
							type="submit"
							onClick={handleSubmit}
							className="mb-2 bg-primary w-full hover:scale-103 transition-smooth duration-300 cursor-pointer" disabled={isLoading}
						>
							{isLoading ? (
								<span className="flex items-center">
									<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									<span className="p-18-semibold text-white">Logging in...</span>
								</span>
							) : (
								<span className="flex items-center gap-2">
									<Image
										src="/svgs/google.svg"
										alt="google"
										width={20}
										height={20}
										style={{ width: 'auto', height: '20px' }}
									/>
									<span className="p-18-semibold text-white"> Sign in with Google</span>
								</span>
							)}
						</Button>

						<div className="mt-4 p-3 bg-muted rounded-lg">
							<p className="text-xs text-muted-foreground text-center">
								Countless opportunities are waiting for you, ready to be discovered, embraced, and turned into meaningful experiences.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
