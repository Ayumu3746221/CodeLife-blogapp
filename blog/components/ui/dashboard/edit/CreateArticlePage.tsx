"use client";

import { Article } from "@/types/RequiredContent";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import SelectMedia from "./SelectMedia";
import TextEditor from "./editor/TextEditor";
import SelectCategory from "./editor/SelectCategory";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("./editor/Editor"), { ssr: false });

interface CreateArticlePageProps {
  mail: string;
}

const CreateArticlePage = ({ mail }: CreateArticlePageProps) => {
  const [article, setArticle] = useState<Article>({
    id: "",
    updatedAt: "",
    title: "",
    content: "",
    eyecatch: { url: "" },
    category: { id: "", name: "未選択" },
    user: {
      id: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    const fetchingUser = async () => {
      const response: void | Response = await fetch(
        `/api/auth/user/id?mail=${mail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((error) => {
        console.error("Error", error);
        return;
      });

      if (!response?.ok) {
        console.error("Failed to get user");
        return;
      }

      const data = await response.json();
      setArticle((prev) => ({
        ...prev,
        user: { id: data.payload.user.id },
      }));
    };
    fetchingUser();
  }, []);

  const handleArticleChange = useCallback((content: string) => {
    setArticle((prev) => ({
      ...prev,
      content: content,
    }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setArticle((prev) => ({
      ...prev,
      title: title,
    }));
  }, []);

  const handleMediaChange = useCallback((url: string) => {
    setArticle((prev) => ({
      ...prev,
      eyecatch: { url: url },
    }));
  }, []);

  const handleCategoryChange = useCallback((id: string, name: string) => {
    setArticle((prev) => ({
      ...prev,
      category: { id: id, name: name },
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (article.title === "" || article.content === "") {
      return;
    }

    if (!article.user?.id) {
      return;
    }

    try {
      const response: void | Response = await fetch("/api/auth/contents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          eyecatch: article.eyecatch?.url,
          categoryId: article.category?.id,
          userId: article.user.id,
        }),
      }).catch((error) => {
        console.error("Error", error);
        return;
      });

      if (!response?.ok) {
        console.error("Failed to save article");
        return;
      }
    } finally {
      router.push("/dashboard");
    }
  }, [article]);

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-[90%] mx-auto">
        <div>
          <SelectMedia
            url={article.eyecatch?.url}
            handleMediaChange={handleMediaChange}
          />
        </div>
        <div className="my-4">
          <TextEditor
            subject="Title"
            text={article.title}
            handleTextChange={handleTitleChange}
          />
        </div>
        <div className="mt-2">
          <Editor
            content={article.content}
            handleArticleChange={handleArticleChange}
          />
        </div>
        <div className="mt-2">
          <SelectCategory
            id={article.category?.id}
            name={article.category?.name}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex justify-center my-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArticlePage;
