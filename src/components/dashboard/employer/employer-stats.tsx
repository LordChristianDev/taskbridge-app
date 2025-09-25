"use client"

import { useQuery } from "@tanstack/react-query";

import { useProfile } from "@/context/use-profile";

import { Card, CardContent } from "@/components/ui/card";

import { EmployerDashboardStatProp, QUERIES } from "@/services/dashboard/stats-service";

export default function EmployerStats() {
	const { profile } = useProfile();

	const { data: stats, isFetching: statsFetching } = useQuery({
		queryKey: ['employer-dashboard-stats'],
		queryFn: () => QUERIES.fetchEmployerStats(profile!.user_id),
		refetchOnMount: (query) => !query.state.data || query.state.data.length === 0,
		refetchOnWindowFocus: true,
		enabled: !!profile!.user_id,
		staleTime: 0,
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
				{!stats || stats.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64">
						<p className="text-sm text-muted-foreground">No stats found</p>
					</div>
				) : (
					stats.map((stat) => {
						return (<StatCard key={stat.id} stat={stat} />);
					})
				)}
			</div>
		)
	);
};

function StatCard({ stat: item }: { stat: EmployerDashboardStatProp }) {
	const { id, title, stat } = item;

	return (
		<Card key={id + title} className="flex-1">
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
};