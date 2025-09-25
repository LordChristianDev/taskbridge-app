"use client"

import { use } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { useRoutes } from "@/hooks/use-routes";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { JobDetailContent } from "@/components/job/details/job-detail-content";

import { JobProp } from "@/types/dashboard/job-type";
import { QUERIES as JOB_QUERIES } from "@/services/dashboard/job-service";
import { QUERIES as PROPOSAL_QUERIES } from "@/services/dashboard/proposal-service";

export default function JobDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { back } = useRoutes();

  const { id } = use(params);

  const { data: jobData, isFetching: jobFetching } = useQuery({
    queryKey: ['job-details', id],
    queryFn: () => JOB_QUERIES.fetchJobWithId(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!id,
    staleTime: 0,
  });

  const { data: proposalsData, isFetching: proposalsFetching, refetch: refetchProposal } = useQuery({
    queryKey: ['job-proposals', id],
    queryFn: () => PROPOSAL_QUERIES.fetchProposalsByJobId(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!id,
    staleTime: 0,
  });

  return (
    jobFetching || proposalsFetching ? (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => back()}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Image
                    src="/taskbridge_white.png"
                    alt="logo"
                    width={250}
                    height={250}
                  />
                </div>
                <span className="text-xl font-bold text-foreground">TaskBridge</span>
              </div>
            </div>

            <ThemeToggle />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-48 w-full bg-muted rounded"></div>
                <div className="h-48 w-full bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-1 space-y-4">
                <div className="h-48 w-full bg-muted rounded"></div>
                <div className="h-48 w-full bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <JobDetailContent
        job={jobData ?? {} as JobProp}
        proposals={proposalsData ?? []}
        update={() => refetchProposal()}
      />
    )
  );
}
