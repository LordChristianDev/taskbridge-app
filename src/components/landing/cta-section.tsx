import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section className="py-20 px-4 bg-primary text-primary-foreground">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
				<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
					Join thousands of professionals who trust FreelanceHub for their projects
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" variant="secondary" className="text-lg px-8" asChild>
						<Link href="/login">Start Hiring Today</Link>
					</Button>

					<Button
						size="lg"
						variant="outline"
						className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
						asChild
					>
						<Link href="/login">Find Your Next Gig</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}