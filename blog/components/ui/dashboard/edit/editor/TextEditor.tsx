import React from "react";

interface TextEditorProps {
  subject: string;
  text: string;
  handleTextChange: (title: string) => void;
}

const TitleEditor = ({ subject, text, handleTextChange }: TextEditorProps) => {
  return (
    <div className="mt-4 mb-2">
      <h1 className="text-2xl font-bold text-gray-800">{subject}</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={text || ""}
        onChange={(e) => handleTextChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
      />
    </div>
  );
};

export default TitleEditor;
