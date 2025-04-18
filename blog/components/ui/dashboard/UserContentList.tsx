"use client";

import React, { useCallback, useState } from "react";
import useSWR from "swr";
import Loading from "../load/Loading";
import { useRouter } from "next/navigation";
import { ContentList } from "@/models/contentList/ContentList";
import UserContentListItem from "./UserContentListItem";
import { ContentListItem } from "@/models/contentList/ContentListItem";

const fetcher = (url: string): Promise<{ response: ContentList }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch content list in ContentList component");
    }
    return response.json();
  });

const UserContentList = () => {
  const url = "/api/auth/contents/list";
  const { data, error, isLoading } = useSWR(url, fetcher);
  const [selectedArticle, setSelectedArticle] = useState<string | null>("");
  const router = useRouter();

  const toggleSelection = useCallback((id: string) => {
    setSelectedArticle((prevSelected) => (prevSelected === id ? null : id));
  }, []);

  const handleDeleteSelected = useCallback(async () => {
    const deletingArticleId = selectedArticle;
    try {
      const response = await fetch("/api/auth/contents", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deletingArticleId }),
      });

      if (!response.ok) {
        console.error("Failed to delete article");
        return;
      }
    } catch (error) {
      console.error("Failed to delete article");
    } finally {
      router.push("/dashboard");
    }
  }, [selectedArticle]);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading || !data || !data.response) {
    return <Loading />;
  }

  if (typeof data === "undefined") {
    return <div>Error: this request is faild</div>;
  }

  const contentList: ContentList = data.response;
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {selectedArticle && (
            <button
              className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 rounded"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          )}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Articles
          </h1>
        </div>
        <div className="space-y-4">
          {contentList.contents.map((article: ContentListItem) => (
            <div key={article.id}>
              <UserContentListItem
                article={article}
                selectedArticle={selectedArticle}
                toggleSelection={toggleSelection}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserContentList;
