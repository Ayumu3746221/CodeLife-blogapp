import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          ページが見つかりませんでした
        </p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
