import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BlogContent } from "@/type/RequiredContent";

interface ContentListItemProps {
  article: BlogContent;
  selectedArticle: string | null;
  toggleSelection: (id: string) => void;
}

const ContentListItem = ({
  article,
  selectedArticle,
  toggleSelection,
}: ContentListItemProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div
        className="relative w-8 h-8 border border-gray-400 cursor-pointer flex-shrink-0 hover:bg-blue-200"
        onClick={() => toggleSelection(article.id)}
      >
        {selectedArticle === article.id && (
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
  );
};

export default ContentListItem;
