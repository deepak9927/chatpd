"use client";

import { Editor } from "slate";
import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
} from "lucide-react";

const MarkButton = ({ format, icon: Icon }: { format: string; icon: any }) => {
  const editor = useSlate();

  return (
    <Toggle
      pressed={isMarkActive(editor, format)}
      onPressedChange={(pressed) => {
        if (pressed) {
          Editor.addMark(editor, format, true);
        } else {
          Editor.removeMark(editor, format);
        }
      }}
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="border-b p-2 flex items-center gap-1">
      <MarkButton format="bold" icon={Bold} />
      <MarkButton format="italic" icon={Italic} />
      <MarkButton format="underline" icon={Underline} />
      <div className="w-px h-6 bg-border mx-2" />
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle list
        }}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-2" />
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle alignment
        }}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle alignment
        }}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle alignment
        }}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-2" />
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle heading
        }}
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={false}
        onPressedChange={() => {
          // Toggle heading
        }}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
