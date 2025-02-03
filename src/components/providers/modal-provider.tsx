"use client";

import { useEffect, useState } from "react";
import { CreateProjectModal } from "@/components/modals/create-project-modal";
import { InviteMemberModal } from "@/components/modals/invite-member-modal";
import { CreateTaskModal } from "@/components/modals/create-task-modal";
import { VideoCallModal } from "@/components/modals/video-call-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateProjectModal />
      <InviteMemberModal />
      <CreateTaskModal />
      <VideoCallModal />
    </>
  );
};
