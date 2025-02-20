import { RequiredMediaList } from "@/type/RequiredMedia";
import React, { useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Loading from "../../load/Loading";

interface SelectMediaProps {
  url?: string;
  handleMediaChange: (url: string) => void;
}

const fetcher = (url: string): Promise<{ response: RequiredMediaList }> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch media in SelectMedia component");
    }
    return response.json();
  });
};

const SelectMedia = ({ url, handleMediaChange }: SelectMediaProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fecthUrl = "/api/auth/media";
  const { data, error, isLoading } = useSWR(fecthUrl, fetcher);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const mediaList: RequiredMediaList | undefined = data?.response;
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
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-600">
            No Image
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-[60%] min-h-80 max-w-5xl bg-gray-100 rounded shadow-lg p-6 flex flex-col">
            <button
              className="absolute top-2 right-2 text-black text-2xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <div className="p-4 flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center overflow-y-auto max-h-96">
              {mediaList?.media.map((media) => {
                return (
                  <div
                    key={media.id}
                    className="m-2"
                    onClick={() => {
                      handleMediaChange(media.url);
                      setModalOpen(false);
                    }}
                  >
                    <Image
                      src={media.url}
                      alt="selected eyecatch"
                      width={256}
                      height={144}
                      className="w-64 h-36 object-cover cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </button>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMedia;
