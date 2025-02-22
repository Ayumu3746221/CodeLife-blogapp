import React from "react";

interface TextAreaEditorProps {
  subject: string;
  text: string;
  handleTextChange: (title: string) => void;
}

const TextAreaEditor = ({
  subject,
  text,
  handleTextChange,
}: TextAreaEditorProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">{subject}</h1>
      <textarea
        id="introduction"
        value={text || ""}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter your introduction here"
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        rows={4}
      />
    </div>
  );
};

export default TextAreaEditor;
