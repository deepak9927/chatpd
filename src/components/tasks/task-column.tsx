"use client";

import { Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const statusMap: Record<string, { label: string; color: string }> = {
  TODO: { label: "To Do", color: "bg-gray-100" },
  IN_PROGRESS: { label: "In Progress", color: "bg-blue-100" },
  IN_REVIEW: { label: "In Review", color: "bg-yellow-100" },
  DONE: { label: "Done", color: "bg-green-100" },
};

export function TaskColumn({ status, tasks, provided }: any) {
  const { onOpen } = useModal();

  return (
    <div
      className={`${statusMap[status].color} p-4 rounded-lg flex flex-col h-full`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {statusMap[status].label} ({tasks.length})
        </h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onOpen("createTask", { status })}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div
        className="flex-1 overflow-y-auto"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {tasks.map((task: any, index: number) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <TaskCard task={task} provided={provided} />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
}
