import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/settings/theme-toggle";

export default function FreelancerHeader() {
	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link href="/dashboard">
							<Button variant="ghost" size="sm">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Dashboard
							</Button>
						</Link>
						<h1 className="text-2xl font-bold">Settings</h1>
					</div>

					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}