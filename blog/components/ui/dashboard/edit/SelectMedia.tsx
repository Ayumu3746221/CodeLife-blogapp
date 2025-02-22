"use client";

import React, { useState } from "react";
import SelectMediaModal from "./editor/SelectMediaModal";

interface SelectMediaProps {
  url?: string;
  handleMediaChange: (url: string) => void;
}

const SelectMedia = ({ url, handleMediaChange }: SelectMediaProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-4">
        {url ? (
          <img
            src={url}
            alt="Eyecatch"
            className="w-[50%] max-h-64 object-cover cursor-pointer mx-auto"
            onClick={() => setModalOpen(true)}
          />
        ) : (
          <div
            className="w-[60%] mx-auto h-64 flex items-center justify-center bg-gray-200 text-gray-600"
            onClick={() => setModalOpen(true)}
          >
            No Image
          </div>
        )}
      </div>
      <SelectMediaModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        handleMediaChange={handleMediaChange}
      />
    </div>
  );
};

export default SelectMedia;
