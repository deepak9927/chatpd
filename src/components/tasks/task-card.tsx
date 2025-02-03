"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const priorityColors: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  LOW: "bg-green-100 text-green-800",
};

export function TaskCard({ task, provided }: any) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mb-2"
    >
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{task.title}</h4>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(new Date(task.dueDate), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {task.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.image} />
                <AvatarFallback>
                  {task.assignee.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
