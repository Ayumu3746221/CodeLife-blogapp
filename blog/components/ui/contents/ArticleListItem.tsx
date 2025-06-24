"use client";

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { ContentListItem } from '@/models/contentList/ContentListItem'

const ArticleListItem = ( content : ContentListItem) => {
  return (
    <Link href={{ pathname: `/article/${content.id}` }} className="block group">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            priority={true}
            src={content.eyecatchUrl || "/placeholder.svg"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="eyecatch"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          <h2 className="text-gray-900 font-semibold text-lg leading-tight mb-3 h-14 overflow-hidden group-hover:text-blue-600 transition-colors duration-200">
            <span className="line-clamp-2">{content.title}</span>
          </h2>

          <div className="flex items-center justify-between">
            <time className="text-gray-500 text-sm font-medium">
              {content.updateAt}
            </time>

            {content.categoryName && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full">
                <Tag className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">
                  {content.categoryName}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleListItem