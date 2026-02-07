'use client'

import { Skeleton, SkeletonCard, SkeletonShimmer } from '@/components/ui/skeleton'

export function PricingSkeleton() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <SkeletonShimmer className="h-10 w-48 rounded-full" />
          </div>
          <SkeletonShimmer className="h-14 w-full max-w-2xl mx-auto mb-6 rounded-2xl" />
          <Skeleton className="h-5 w-3/4 mx-auto rounded-lg" />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className={i === 2 ? 'lg:-mt-6' : ''}>
              <SkeletonCard>
                {/* Popular badge for middle card */}
                {i === 2 && (
                  <div className="flex justify-center -mt-14 mb-6">
                    <SkeletonShimmer className="h-8 w-32 rounded-full" />
                  </div>
                )}
                
                {/* Header */}
                <Skeleton className="h-7 w-32 mb-2 rounded" />
                <Skeleton className="h-4 w-full mb-8 rounded" />
                
                {/* Price */}
                <SkeletonShimmer className="h-12 w-48 mb-2 rounded-lg" />
                <Skeleton className="h-4 w-32 mb-8 rounded" />
                
                {/* CTA */}
                <SkeletonShimmer className="h-12 w-full mb-8 rounded-xl" />
                
                {/* Features */}
                <Skeleton className="h-4 w-32 mb-4 rounded" />
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 flex-1 rounded" />
                    </div>
                  ))}
                </div>
              </SkeletonCard>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} className="p-6">
              <Skeleton className="w-14 h-14 rounded-xl mx-auto mb-4" />
              <Skeleton className="h-5 w-32 mx-auto mb-2 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </SkeletonCard>
          ))}
        </div>
      </div>
    </section>
  )
}

