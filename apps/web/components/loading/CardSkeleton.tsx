'use client'

import { Skeleton, SkeletonCard, SkeletonShimmer } from '@/components/ui/skeleton'

export function BlogCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonShimmer className="aspect-video w-full rounded-xl mb-4" />
      <Skeleton className="h-6 w-24 mb-3 rounded-full" />
      <SkeletonShimmer className="h-7 w-full mb-2 rounded-lg" />
      <Skeleton className="h-7 w-3/4 mb-4 rounded-lg" />
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </SkeletonCard>
  )
}

export function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  )
}

