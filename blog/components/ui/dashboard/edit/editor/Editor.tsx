"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface EditorProps {
  content: string;
  handleArticleChange: (content: string) => void;
}

export default function Editor({ content, handleArticleChange }: EditorProps) {
  const editor = useCreateBlockNote();
  const initialHTML = content;

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor]);

  editor.onChange(async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    handleArticleChange(html);
  });

  return (
    <div className="my-4 py-4 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Content</h1>
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}
