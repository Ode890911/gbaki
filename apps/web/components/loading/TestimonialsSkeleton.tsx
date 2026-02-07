'use client'

import { Skeleton, SkeletonCard, SkeletonShimmer } from '@/components/ui/skeleton'

export function TestimonialsSkeleton() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <SkeletonShimmer className="h-10 w-48 rounded-full" />
          </div>
          <SkeletonShimmer className="h-14 w-full max-w-2xl mx-auto mb-6 rounded-2xl" />
          <Skeleton className="h-5 w-3/4 mx-auto rounded-lg" />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <SkeletonShimmer className="h-12 w-24 mb-2 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} className="p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="w-5 h-5 rounded-sm" />
                ))}
              </div>
              
              {/* Quote */}
              <div className="space-y-2 mb-8">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
              
              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-gray-800 mb-6" />
              
              {/* Author */}
              <div className="flex items-start gap-4">
                <SkeletonShimmer className="w-16 h-16 rounded-2xl flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Skeleton className="h-5 w-32 rounded" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-24 mb-2 rounded" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-2 h-2 rounded-full" />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-8 rounded-2xl" />
          <Skeleton className="h-7 w-96 mx-auto mb-4 rounded-lg" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-8 rounded" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SkeletonShimmer className="h-12 w-48 rounded-xl" />
            <Skeleton className="h-12 w-48 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

