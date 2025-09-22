import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EmployerHeader from "@/components/settings/employer/employer-header";
import EmployerProfile from "@/components/settings/employer/employer-profile";
import EmployerHiring from "@/components/settings/employer/employer-hiring";
import EmployerAccount from "@/components/settings/employer/employer-account";

export function EmployerSettings() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EmployerHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="employer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="employer">Employer Profile</TabsTrigger>
            <TabsTrigger value="hiring">Hiring Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Company Profile Tab */}
          <TabsContent value="employer" className="space-y-6">
            <EmployerProfile />
          </TabsContent>

          {/* Hiring Preferences Tab */}
          <TabsContent value="hiring" className="space-y-6">
            <EmployerHiring />
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <EmployerAccount />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
