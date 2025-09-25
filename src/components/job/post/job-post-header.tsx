import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/settings/theme-toggle";

export default function JobPostHeader() {
	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link href="/dashboard">
							<Button variant="ghost" size="sm">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Dashboard
							</Button>
						</Link>

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
			</div>
		</header>
	);
}