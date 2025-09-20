import { Card, CardContent } from "@/components/ui/card";
import { categoriesData } from "@/services/authentication/landing-services";

const renderCategories = categoriesData.map((category) => {
	return (
		<Card key={category} className="hover:scale-105 transition-smooth duration-300 cursor-pointer">
			<CardContent className="p-6 text-center">
				<h3 className="font-semibold">{category}</h3>
			</CardContent>
		</Card>
	);
})

export default function CategoriesSection() {
	return (
		<section className="py-20 px-4">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
					<p className="text-xl text-muted-foreground">Find talent across all industries</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
					{renderCategories}
				</div>
			</div>
		</section>
	);
}