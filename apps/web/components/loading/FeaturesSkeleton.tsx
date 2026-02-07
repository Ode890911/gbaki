'use client'

import { Skeleton, SkeletonCard, SkeletonShimmer } from '@/components/ui/skeleton'

export function FeaturesSkeleton() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <SkeletonShimmer className="h-10 w-48 rounded-full" />
          </div>
          <SkeletonShimmer className="h-14 w-full max-w-2xl mx-auto mb-6 rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full max-w-xl mx-auto rounded-lg" />
            <Skeleton className="h-5 w-3/4 mx-auto rounded-lg" />
          </div>
          
          {/* Quick benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-32 rounded" />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i}>
              {/* Icon */}
              <SkeletonShimmer className="w-14 h-14 rounded-xl mb-5" />
              
              {/* Title */}
              <Skeleton className="h-7 w-3/4 mb-3 rounded-lg" />
              
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Skeleton className="h-5 w-64 mx-auto mb-6 rounded" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SkeletonShimmer className="h-12 w-48 rounded-xl" />
            <Skeleton className="h-12 w-48 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

