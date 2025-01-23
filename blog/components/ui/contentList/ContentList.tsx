"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RequiredContent } from "@/type/RequiredContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ContentList: React.FC = () => {
  const [contentList, setContentList] = useState<RequiredContent>({
    contents: [],
  });

  const handleContentList = async (Content: RequiredContent) => {
    console.log(Content);
    setContentList(Content);
  };
  useEffect(() => {
    const fetchContentList = async () => {
      try {
        const response: Response = await fetch("/api/contents/list");

        if (!response.ok) {
          console.error(
            "Fetch failed in ContentList.tsx at fetchContentList(), not response.ok"
          );
        }

        const contentList = await response.json();
        await handleContentList(contentList.response);
      } catch (error) {
        console.error(
          "Fetch failed in ContentList.tsx at fetchContentList(), catch error",
          error
        );
        throw new Error("Failed to fetch content list in ContentList.tsx");
      }
    };
    fetchContentList();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {contentList.contents.map((content) => (
        <div
          key={content.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm hover:shadow-2xl duration-100"
        >
          <Link href={{ pathname: "/article", query: { id: content.id } }}>
            <div className="relative h-48 w-full">
              <Image
                src={content.eyecatch?.url || "./github-icon.png"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="eyecatch"
              />
            </div>
            <div className="p-4">
              <h2 className="text-black font-semibold text-xl mb-2">
                {content.title}
              </h2>
            </div>
            {content.category && (
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faTag}
                  className="h-4 w-4 text-gray-500"
                />
                <span className="text-sm text-gray-600">
                  {content.category.name}
                </span>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
