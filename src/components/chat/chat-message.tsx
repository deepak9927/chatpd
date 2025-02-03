"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  message: {
    content: string;
    createdAt: Date;
    user: {
      name: string;
      imageUrl: string;
    };
  };
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.user.imageUrl} />
        <AvatarFallback>
          {message.user.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2 text-sm",
          isOwn
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">
            {isOwn ? "You" : message.user.name}
          </span>
          <p>{message.content}</p>
          <span className="text-xs opacity-50">
            {format(new Date(message.createdAt), "HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
}
