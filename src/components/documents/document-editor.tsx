"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { useSocket } from "@/components/providers/socket-provider";
import { Toolbar } from "./toolbar";
import { toast } from "react-hot-toast";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export function DocumentEditor({ documentId }: { documentId: string }) {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const { socket, isConnected } = useSocket();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}`);
        const data = await response.json();
        if (data.content) {
          setValue(JSON.parse(data.content));
        }
      } catch (error) {
        toast.error("Failed to load document");
      }
    };

    fetchDocument();
  }, [documentId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("document:change", ({ documentId: docId, content }) => {
      if (docId === documentId) {
        setValue(content);
      }
    });

    return () => {
      socket.off("document:change");
    };
  }, [socket, documentId]);

  const onChange = useCallback(
    async (newValue: Descendant[]) => {
      setValue(newValue);

      if (socket && isConnected) {
        socket.emit("document:update", {
          documentId,
          content: newValue,
        });
      }

      try {
        await fetch(`/api/documents/${documentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: JSON.stringify(newValue),
          }),
        });
      } catch (error) {
        toast.error("Failed to save changes");
      }
    },
    [socket, isConnected, documentId]
  );

  return (
    <div className="flex flex-col h-full">
      <Toolbar editor={editor} />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <Slate editor={editor} value={value} onChange={onChange}>
            <Editable
              className="min-h-[500px] outline-none"
              placeholder="Start typing..."
            />
          </Slate>
        </div>
      </div>
    </div>
  );
}
