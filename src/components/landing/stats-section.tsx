import { statsSectionData } from "@/services/authentication/landing-services";

const renderStats = statsSectionData.map((data) => {
	const { stat, title } = data;

	return (
		<div key={stat}>
			<div className="mb-2 text-4xl font-bold text-primary">{stat}</div>
			< div className="text-muted-foreground" > {title}</ div>
		</div >
	);
});

export default function StatsSection() {
	return (
		<section className="py-16 bg-primary/10">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-evenly gap-8 text-center">
					{renderStats}
				</div>
			</div>
		</section>
	);
}