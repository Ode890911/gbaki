'use client'

import { Skeleton, SkeletonShimmer } from '@/components/ui/skeleton'

export function FAQSkeleton() {
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

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SkeletonShimmer className="h-16 w-full rounded-2xl" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-32 rounded-xl" />
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <SkeletonShimmer className="h-6 w-full max-w-xl mb-2 rounded-lg" />
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                </div>
                <Skeleton className="w-6 h-6 rounded flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 max-w-3xl mx-auto">
          <SkeletonShimmer className="w-full h-80 rounded-3xl" />
        </div>
      </div>
    </section>
  )
}

