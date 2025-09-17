import { Briefcase, Users } from "lucide-react";

import { HowItWorksDataProp } from "@/types/authentication/landing/landing-types";
import { forEmployersData, forFreelancersData } from "@/services/authentication/landing/landing-services";

const renderHowItWorks = (list: HowItWorksDataProp[]) => list.map((item) => {
	const { id, title, description } = item;

	return (
		<div key={id + title} className="flex items-start space-x-4">
			<div className="mt-1 flex items-center justify-center flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full">
				<span className="text-primary font-semibold">{id}</span>
			</div>
			<div>
				<h4 className="mb-2 font-semibold">{title}</h4>
				<p className="text-muted-foreground">{description}</p>
			</div>
		</div>
	);
});

export default function HowItWorksSection() {
	return (
		<section id="how-it-works" className="py-20 px-4">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="mb-4 text-3xl md:text-4xl font-bold">How TaskBridge Works</h2>
					<p className="mx-auto text-xl text-muted-foreground max-w-2xl">
						Simple steps to connect talent with opportunity
					</p>
				</div>

				<div className="mx-auto flex flex-wrap justify-around gap-12 max-w-7xl">
					{/* For Employers */}
					<div>
						<h3 className="mb-8 flex items-center text-2xl font-semibold">
							<Users className="mr-3 text-primary w-6 h-6" />
							For Employers
						</h3>

						<div className="space-y-6">
							{renderHowItWorks(forEmployersData)}
						</div>
					</div>

					{/* For Freelancers */}
					<div>
						<h3 className="mb-8 flex items-center text-2xl font-semibold">
							<Briefcase className="mr-3 text-primary w-6 h-6" />
							For Freelancers
						</h3>

						<div className="space-y-6">
							{renderHowItWorks(forFreelancersData)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}