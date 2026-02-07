'use client'

import { Skeleton, SkeletonShimmer } from '@/components/ui/skeleton'

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950">
      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <SkeletonShimmer className="h-10 w-64 rounded-full" />
          </div>

          {/* Headline */}
          <div className="space-y-4 mb-6">
            <SkeletonShimmer className="h-16 w-full max-w-3xl mx-auto rounded-2xl" />
            <SkeletonShimmer className="h-16 w-3/4 mx-auto rounded-2xl" />
          </div>

          {/* Subheadline */}
          <div className="space-y-3 mb-8">
            <SkeletonShimmer className="h-6 w-full max-w-2xl mx-auto rounded-lg" />
            <SkeletonShimmer className="h-6 w-2/3 mx-auto rounded-lg" />
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <SkeletonShimmer key={i} className="h-6 w-40 rounded-lg" />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <SkeletonShimmer className="h-14 w-64 rounded-xl" />
            <SkeletonShimmer className="h-14 w-48 rounded-xl" />
          </div>

          {/* Country Flags */}
          <div className="mb-8">
            <Skeleton className="h-4 w-48 mx-auto mb-4 rounded" />
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Video/Image Placeholder */}
          <SkeletonShimmer className="aspect-video rounded-2xl" />
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="w-12 h-12 mx-auto mb-3 rounded-xl" />
              <SkeletonShimmer className="h-8 w-20 mx-auto mb-2 rounded" />
              <Skeleton className="h-4 w-24 mx-auto rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

