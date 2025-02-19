"use client";
import { RequiredContentList } from "@/type/RequiredContent";
import React from "react";
import useSWR from "swr";
import Loading from "../load/Loading";

const fetcher = (url: string): Promise<{ response: RequiredContentList }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch content list in ContentList component");
    }
    return response.json();
  });

const ContentList = () => {
  const url = "/api/auth/contents/user/list";
  const { data, error, isLoading } = useSWR(url, fetcher);

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
    <div>
      {contentList.contents.map((article) => {
        return (
          <div key={article.id}>
            <h2>{article.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
