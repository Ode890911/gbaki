'use client'

import { Skeleton, SkeletonShimmer } from '@/components/ui/skeleton'

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Form fields */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <Skeleton className="h-4 w-32 mb-2 rounded" />
          <SkeletonShimmer className="h-12 w-full rounded-xl" />
        </div>
      ))}
      
      {/* Submit button */}
      <SkeletonShimmer className="h-12 w-full rounded-xl" />
    </div>
  )
}

// Inline form skeleton (for newsletter, contact, etc.)
export function InlineFormSkeleton() {
  return (
    <div className="flex gap-3">
      <SkeletonShimmer className="h-12 flex-1 rounded-xl" />
      <Skeleton className="h-12 w-32 rounded-xl" />
    </div>
  )
}

