"use client"

import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { useRoutes } from "@/hooks/use-routes";

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/settings/theme-toggle";

export default function JobDetailHeader() {
	const { back } = useRoutes();

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="sm" onClick={() => back()}>
						<ArrowLeft className="mr-2 w-4 h-4" />
						Back
					</Button>

					<div className="flex items-center space-x-2">
						<div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
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

				<ThemeToggle />
			</div>
		</header>
	);
}