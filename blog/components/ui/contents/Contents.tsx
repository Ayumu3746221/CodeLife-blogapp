"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useSWR from "swr";
import Loading from "../load/Loading";
import { ContentList } from "@/models/ContentList";

const fetcher = (url: string): Promise<{ response: ContentList }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch content list in ContentList component");
    }
    return response.json();
  });

const Contents: React.FC = () => {
  const url = "/api/contents";
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (typeof data === "undefined") {
    return <div>Error: this request is faild</div>;
  }

  const contentList: ContentList = data.response;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 p-4">
      {contentList.contents.map((content) => (
        <div
          key={content.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm hover:shadow-2xl duration-100"
        >
          <Link href={{ pathname: `/article/${content.id}` }}>
            <div className="relative h-48 w-full">
              <Image
                src={content.eyecatchUrl}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="eyecatch"
              />
            </div>
            <div className="p-4">
              <h2 className="text-black font-semibold text-xl mb-2 truncate">
                {content.title}
              </h2>
            </div>
            {content.categoryName && (
              <div className="flex items-center space-x-2 px-2 py-1">
                <FontAwesomeIcon
                  icon={faTag}
                  className="h-4 w-4 text-gray-500"
                />
                <span className="text-sm text-gray-600">
                  {content.categoryName}
                </span>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Contents;
