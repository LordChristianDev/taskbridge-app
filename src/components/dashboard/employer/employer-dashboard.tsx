import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EmployerAppbar from "@/components/dashboard/employer/employer-appbar";
import EmployerStats from "@/components/dashboard/employer/employer-stats";
import EmployerOverview from "@/components/dashboard/employer/employer-overview";
import EmployerJobs from "@/components/dashboard/employer/employer-jobs";
import EmployerTalent from "@/components/dashboard/employer/employer-talent";
import EmployerProjects from "@/components/dashboard/employer/employer-projects";

export function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EmployerAppbar />

      <div className="container mx-auto px-4 pt-8">
        {/* Dashboard Stats */}
        <EmployerStats />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="freelancers">Find Talent</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <EmployerOverview />
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <EmployerJobs />
          </TabsContent>

          {/* Find Talent Tab */}
          <TabsContent value="freelancers" className="space-y-6">
            <EmployerTalent />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <EmployerProjects />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
