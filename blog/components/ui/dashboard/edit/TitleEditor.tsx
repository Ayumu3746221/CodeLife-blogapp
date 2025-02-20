import React from "react";

interface TitleEditorProps {
  title: string;
  handleTitleChange: (title: string) => void;
}

const TitleEditor = ({ title, handleTitleChange }: TitleEditorProps) => {
  return (
    <div className="mt-4 mb-2">
      <h1 className="text-2xl font-bold text-gray-800">Title</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
      />
    </div>
  );
};

export default TitleEditor;
