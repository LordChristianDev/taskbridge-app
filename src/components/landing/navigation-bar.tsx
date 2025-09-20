import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { navigationBarData } from "@/services/authentication/landing-services";

const NavigationBarItems = navigationBarData.map((nav) => {
	const { title, url } = nav;

	return (
		<Link key={title} href={url} className="text-muted-foreground hover:text-foreground transition-colors">
			{title}
		</Link>
	);
});

export default function NavigationBar() {

	return (
		<header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-background/80">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
				<div className="flex items-center space-x-2 min-w-[12rem]">
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

				<nav className="hidden md:flex items-center space-x-6">
					{NavigationBarItems}
				</nav>

				<div className="flex items-center space-x-3">
					<Button variant="ghost" asChild>
						<Link href="/login">Sign In</Link>
					</Button>

					<Button asChild>
						<Link href="/setup">Get Started</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}