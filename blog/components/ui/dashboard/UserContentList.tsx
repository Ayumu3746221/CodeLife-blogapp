"use client";
import { RequiredContentList } from "@/type/RequiredContent";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import Loading from "../load/Loading";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string): Promise<{ response: RequiredContentList }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch content list in ContentList component");
    }
    return response.json();
  });

const ContentList = () => {
  const url = "/api/auth/contents/list";
  const { data, error, isLoading } = useSWR(url, fetcher);

  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(
    new Set()
  );

  const toggleSelection = useCallback((id: string) => {
    setSelectedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      console.log(newSet);
      return newSet;
    });
  }, []);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading || !data || !data.response) {
    return <Loading />;
  }

  if (typeof data === "undefined") {
    return <div>Error: this request is faild</div>;
  }

  const contentList: RequiredContentList = data.response;
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Articles
        </h1>
        <div className="space-y-4">
          {contentList.contents.map((article) => (
            <div key={article.id} className="flex items-center space-x-4">
              <div
                className="relative w-8 h-8 border border-gray-400 cursor-pointer flex-shrink-0 hover:bg-blue-200"
                onClick={() => toggleSelection(article.id)}
              >
                {selectedArticles.has(article.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
                    ✓
                  </div>
                )}
              </div>
              <Link
                href={`/dashboard/edit/article/${article.id}`}
                className="block flex-1"
              >
                <div className="bg-white shadow-md rounded p-4 flex flex-col md:flex-row items-center w-full">
                  {article.eyecatch?.url && (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mr-4">
                      <Image
                        src={article.eyecatch.url}
                        alt="eyecatch"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-black">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Last Updated: {article.updatedAt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
