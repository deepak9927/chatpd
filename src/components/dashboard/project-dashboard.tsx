"use client";

import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";
import { DashboardTabs } from "./dashboard-tabs";
import { ProjectMetrics } from "./project-metrics";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProjectDashboard() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <ProjectMetrics projects={projects} />
      <DashboardTabs>
        <ProjectGrid>
          {projects?.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectGrid>
      </DashboardTabs>
    </div>
  );
}
