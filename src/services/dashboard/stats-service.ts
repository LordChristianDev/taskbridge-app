import { Briefcase, Clock, DollarSign, LucideIcon, TrendingUp, Users } from "lucide-react";

import { QUERIES as PROJECT_QUERIES } from "@/services/dashboard/project-service";
import { QUERIES as PROPOSAL_QUERIES } from "@/services/dashboard/proposal-service";

export const QUERIES = {
	fetchEmployerStats: async function (user_id: number): Promise<EmployerDashboardStatProp[]> {
		let stats: EmployerDashboardStatProp[] = []

		const activeProjects = await PROJECT_QUERIES.fetchProjectsByEmployerId({
			id: user_id,
			status_list: ["negotiation", "contract-signed", "preparing", "in-progress", "review", "revisions"]
		});
		stats = [...stats, {
			id: 1,
			title: "Active Jobs",
			stat: activeProjects.length ? activeProjects.length.toString() : "0",
			icon: Briefcase,
		}];

		const proposals = await PROPOSAL_QUERIES.fetchProposalsByEmployerId(user_id);
		stats = [...stats, {
			id: 2,
			title: "Total Proposals",
			stat: proposals.length ? proposals.length.toString() : "0",
			icon: Users,
		}];

		const inProgressProjects = await PROJECT_QUERIES.fetchProjectsByEmployerId({
			id: user_id,
			status: "in-progress",
		});
		stats = [...stats, {
			id: 3,
			title: "In Progress",
			stat: inProgressProjects.length ? inProgressProjects.length.toString() : "0",
			icon: Clock,
		}];

		const projects = await PROJECT_QUERIES.fetchProjectsByEmployerId({ id: user_id });
		stats = [...stats, {
			id: 4,
			title: "Total Spent",
			stat: `₱ ${projects.reduce(
				(acc, item) => acc + Number(item.proposal?.proposed_budget ?? 0),
				0
			)}`,
			icon: DollarSign,
		}];

		return stats;
	},
	fetchFreelancerStats: async function (user_id: number): Promise<EmployerDashboardStatProp[]> {
		let stats: EmployerDashboardStatProp[] = [];

		const activeProjects = await PROJECT_QUERIES.fetchProjectsByFreelancerId({
			id: user_id,
			status_list: ["negotiation", "contract-signed", "preparing", "in-progress", "review", "revisions"]
		});
		stats = [...stats, {
			id: 1,
			title: "Active Jobs",
			stat: activeProjects.length ? activeProjects.length.toString() : "0",
			icon: Briefcase,
		}];

		const proposals = await PROPOSAL_QUERIES.fetchProposalsByFreelancerId(user_id);
		stats = [...stats, {
			id: 2,
			title: "Total Proposals",
			stat: proposals.length ? proposals.length.toString() : "0",
			icon: Users,
		}];

		const projects = await PROJECT_QUERIES.fetchProjectsByFreelancerId({ id: user_id });
		stats = [...stats, {
			id: 3,
			title: "Total Earned",
			stat: `₱ ${projects.reduce(
				(acc, item) => acc + Number(item.proposal?.proposed_budget ?? 0),
				0
			)}`,
			icon: DollarSign,
		}];

		const completedProjects = await PROJECT_QUERIES.fetchProjectsByFreelancerId({
			id: user_id,
			status_list: ["delivered", "archived"]
		});

		stats = [...stats, {
			id: 4,
			title: "Success Rate",
			stat: completedProjects.length ? `${((completedProjects.length / projects.length) * 100).toFixed(2)}%` : "0%",
			icon: TrendingUp,
		}];

		return stats;
	}
};

export type EmployerDashboardStatProp = {
	id: number;
	title: string;
	stat: string;
	icon: LucideIcon;
}
