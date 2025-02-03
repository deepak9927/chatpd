"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    progress: number;
    dueDate: string;
    members: Array<{
      id: string;
      name: string;
      image?: string;
    }>;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <Card className="hover:bg-accent hover:text-accent-foreground p-6 cursor-pointer transition-colors">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-none tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Progress value={project.progress} className="h-2" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <div className="flex -space-x-2">
                {project.members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={member.image} />
                    <AvatarFallback>
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 3 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
