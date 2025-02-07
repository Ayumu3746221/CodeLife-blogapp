import React from "react";
import Link from "next/link";

const NotExistArticle: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">記事が存在しません</h1>
        <p className="text-gray-600 mb-6">
          お探しの記事は見つかりませんでした。
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          ホームページへ戻る
        </Link>
      </div>
    </div>
  );
};

export default NotExistArticle;
