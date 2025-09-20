"use client"

import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query'

import { useAuth } from "@/context/useAuth";
import { useProfile } from "@/context/useProfile";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FreelancerAppbar from "@/components/dashboard/freelancer/freelancer-appbar";
import FreelancerStats from "@/components/dashboard/freelancer/freelancer-stats";
import FreelancerOverview from "@/components/dashboard/freelancer/freelancer-overview";
import FreelancerJobs from "@/components/dashboard/freelancer/freelancer-jobs";
import FreelancerProposals from "@/components/dashboard/freelancer/freelancer-proposals";
import FreelancerProjects from "@/components/dashboard/freelancer/freelancer-projects";

import { QUERIES } from "@/services/personalization/profile-service";

export function FreelancerDashboard() {
  const { user } = useAuth();
  const { storeProfile } = useProfile();

  const { data: profileData, isFetching: profileFetching } = useQuery({
    queryKey: ['freelancer-profile-dashboard', user?.id],
    queryFn: async () => QUERIES.fetchFreelancer(user!.id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!user?.id,
    staleTime: 0,
  });

  useEffect(() => {
    if (profileData && !profileFetching) {
      storeProfile(profileData);
    }
  }, [profileData, profileFetching]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <FreelancerAppbar />

      <div className="container mx-auto px-4 pt-8">
        {/* Dashboard Stats */}
        <FreelancerStats />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <FreelancerOverview />
          </TabsContent>

          {/* Browse Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <FreelancerJobs />
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <FreelancerProposals />
          </TabsContent>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <FreelancerProjects />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
