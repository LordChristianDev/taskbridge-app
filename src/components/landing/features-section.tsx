import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featuresData } from "@/services/authentication/landing-services";

const renderFeatures = featuresData.map((item) => {
	const { id, title, description } = item;

	return (
		<Card key={id + "feature"} className="hover:scale-105 transition-smooth duration-300 cursor-pointer">
			<CardHeader>
				<item.icon className="mb-4 text-primary w-10 h-10" />
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
});

export default function FeaturesSection() {
	return (
		<section id="features" className="py-20 px-4 bg-muted/30">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TaskBridge?</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">Built with modern professionals in mind</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{renderFeatures}
				</div>
			</div>
		</section>
	);
}