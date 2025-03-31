import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ContentListItem } from "@/models/contentList/ContentListItem";

interface UserContentListItemProps {
  article: ContentListItem;
  selectedArticle: string | null;
  toggleSelection: (id: string) => void;
}

const UserContentListItem = ({
  article,
  selectedArticle,
  toggleSelection,
}: UserContentListItemProps) => {
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
          {article.eyecatchUrl && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mr-4">
              <Image
                src={article.eyecatchUrl}
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
              Last Updated: {article.updateAt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserContentListItem;
