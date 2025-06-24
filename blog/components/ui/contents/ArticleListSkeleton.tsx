import { Skeleton } from "@/components/ui/skeleton";

const ArticleListItemSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
      <div className="relative h-48 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center space-x-2 px-2 py-1 pb-4">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

const ArticleListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <ArticleListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default ArticleListSkeleton;
