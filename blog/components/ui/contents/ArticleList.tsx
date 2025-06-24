"use client";

import React from "react";
import useSWR from "swr";
import ArticleListItem from "./ArticleListItem";
import ArticleListSkeleton from "./ArticleListSkeleton";
import { ContentList } from "@/models/contentList/ContentList";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch content list");
    }
    return res.json();
  });

const ArticleList: React.FC = () => {
  const { data, error , isLoading } = useSWR("/api/article/list", fetcher ,{ refreshInterval: 30000 , dedupingInterval: 60000 });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <ArticleListSkeleton />;
  }

  const contentList = new ContentList(data.response);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 p-4">
      {contentList.contents.map((content) => (
        <div
          key={content.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm hover:shadow-2xl duration-100"
        >
          <ArticleListItem {...content} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;