"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { TaskColumn } from "./task-column";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const taskStatuses = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

export function TaskBoard({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${draggableId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: destination.droppableId,
        }),
      });

      if (!response.ok) throw new Error();

      // Optimistically update the UI
      const updatedTasks = tasks.map((task) => {
        if (task.id === draggableId) {
          return { ...task, status: destination.droppableId };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
        {taskStatuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <TaskColumn
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
                provided={provided}
              />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
