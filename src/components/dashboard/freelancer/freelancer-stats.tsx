import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";

import { FreelancerDashboardStatProp } from "@/types/dashboard/freelancer-type";
import { QUERIES } from "@/services/dashboard/freelancer/freelancer-service";

export default function FreelancerStats() {
	const { data: stats, isFetching: statsFetching } = useQuery({
		queryKey: ['freelancer-stats'],
		queryFn: () => QUERIES.fetchMockStats(),
		initialData: [] as FreelancerDashboardStatProp[],
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
	});

	const renderStats = stats.map((item) => {
		const { id, title, stat } = item;

		return (
			<Card key={id + title}>
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">{title}</p>
							<p className="text-2xl font-bold">{stat}</p>
						</div>
						<item.icon className="w-8 h-8 text-primary" />
					</div>
				</CardContent>
			</Card>
		);
	});

	return (
		statsFetching ? (
			<div className="mb-8 animate-pulse space-y-4">
				<div className="flex flex-wrap gap-6">
					<div className="flex-1 h-38 bg-muted rounded" />
					<div className="flex-1 h-38 bg-muted rounded" />
					<div className="flex-1 h-38 bg-muted rounded" />
					<div className="flex-1 h-38 bg-muted rounded" />
				</div>
			</div>
		) : (
			<div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
				{renderStats}
			</div>
		)
	);
}