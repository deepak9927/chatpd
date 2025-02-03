"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  user: {
    name: string;
    imageUrl: string;
  };
}

export function ChatPanel({ projectId }: { projectId: string }) {
  const { socket } = useSocket();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [projectId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:new", ({ projectId: pid, message }) => {
      if (pid === projectId) {
        setMessages((prev) => [...prev, message]);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      socket.off("chat:new");
    };
  }, [socket, projectId]);

  const sendMessage = async (content: string) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/projects/${projectId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          userId: user.id,
        }),
      });

      if (!response.ok) throw new Error();

      const message = await response.json();

      if (socket) {
        socket.emit("chat:message", {
          projectId,
          message: {
            ...message,
            user: {
              name: user.fullName,
              imageUrl: user.imageUrl,
            },
          },
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.userId === user?.id}
            />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
