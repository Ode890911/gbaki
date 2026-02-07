'use client'

import { Skeleton, SkeletonShimmer } from '@/components/ui/skeleton'

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Skeleton className="h-4 w-24 rounded" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <SkeletonShimmer className="h-4 w-full max-w-[200px] rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

