"use client";

import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";

export function DashboardHeader() {
  const { onOpen } = useModal();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button
            onClick={() => onOpen("createProject")}
            size="sm"
            className="h-8 px-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <NotificationBell />
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
