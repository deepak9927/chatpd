import { Metadata } from "next";
import { ProjectDashboard } from "@/components/dashboard/project-dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard - Project Hub",
  description: "Manage your projects and tasks",
};

export default async function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <ProjectDashboard />
      </div>
    </div>
  );
}
