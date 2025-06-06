export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-video bg-gray-100 animate-pulse" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="w-24 h-6 bg-gray-200 rounded mb-3 animate-pulse" />
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <div className="w-24 h-6 bg-gray-200 rounded mb-3 animate-pulse" />
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 animate-pulse" />
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 border-t pt-6 mt-2">
              <div className="grid gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="w-24 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 