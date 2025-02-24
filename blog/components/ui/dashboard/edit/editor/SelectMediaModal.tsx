import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { RequiredMediaList } from "@/types/RequiredMedia";
import useSWR, { mutate } from "swr";
import Loading from "@/components/ui/load/Loading";
import { UploadMediaAPIResponse } from "@/app/api/auth/media/route";

const fetcher = (url: string): Promise<{ response: RequiredMediaList }> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch media in SelectMedia component");
    }
    return response.json();
  });
};

interface SelectMediaModalProps {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  handleMediaChange: (url: string) => void;
}

const SelectMediaModal = ({
  isModalOpen,
  setModalOpen,
  handleMediaChange,
}: SelectMediaModalProps) => {
  const fetchUrl = "/api/auth/media";
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];

      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response: Response = await fetch("/api/auth/media", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          console.error("Failed to upload media");
          return;
        }
        const data = (await response.json()) as UploadMediaAPIResponse;

        if (data?.media?.url) {
          handleMediaChange(data.media.url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setModalOpen(false);
      }
    },
    [handleMediaChange]
  );

  useEffect(() => {
    if (isModalOpen) {
      mutate(fetchUrl);
    }
  }, [isModalOpen, fetchUrl]);

  if (error) {
    return <div>Error: faild data fetching</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const mediaList: RequiredMediaList | undefined = data?.response;

  return (
    <div>
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
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMediaModal;
