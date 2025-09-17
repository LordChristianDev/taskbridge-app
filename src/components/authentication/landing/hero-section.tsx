import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="py-32 px-4">
			<div className="container mx-auto text-center max-w-7xl">
				<Badge variant="secondary" className="mb-12 text-sm md:text-md">
					Trusted by 10,000+ professionals
				</Badge>
				<h1 className="mb-8 text-4xl md:text-6xl font-bold text-balance">
					Connect with Top <span className="text-primary">Freelancers</span> & Dream Projects
				</h1>
				<p className="mb-12 mx-auto text-xl text-muted-foreground text-balance max-w-2xl">
					The simplest way to find skilled freelancers or land your next project. Professional, secure, and built for
					modern work.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" className="text-lg px-8" asChild>
						<Link href="/register?type=employer">
							Hire Freelancers <ArrowRight className="ml-2 w-5 h-5" />
						</Link>
					</Button>

					<Button size="lg" variant="outline" className="px-8 text-lg bg-transparent" asChild>
						<Link href="/register?type=freelancer">Find Work</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}