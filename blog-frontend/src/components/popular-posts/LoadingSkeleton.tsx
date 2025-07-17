export default function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
