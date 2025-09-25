import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeeMore from "@/components/common/see-more";

import { EmployerProp } from "@/types/personalization/profile-type";

export default function EmployerAbout({ profile }: { profile: EmployerProp }) {
	const { company, company_description, company_categories, specified_company_categories } = profile ?? {} as EmployerProp;

	const renderSkills = specified_company_categories && specified_company_categories.length > 0 && specified_company_categories.map((category) => {
		const { id, title } = category;
		return (<Badge key={id} variant="outline">{title}</Badge>);
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">About {company}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{company_description && <div className="mb-6">
					<SeeMore text={company_description} />
				</div>}

				{company_categories && company_categories?.length > 0 &&
					<div className="flex flex-col gap-2">
						<h2>Looking for</h2>
						<div className="flex flex-wrap gap-2">
							{renderSkills}
						</div>
					</div>
				}
			</CardContent>
		</Card>

	);
}