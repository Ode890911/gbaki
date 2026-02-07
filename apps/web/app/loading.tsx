import { HeroSkeleton } from '@/components/loading/HeroSkeleton'
import { FeaturesSkeleton } from '@/components/loading/FeaturesSkeleton'
import { PricingSkeleton } from '@/components/loading/PricingSkeleton'

export default function Loading() {
  return (
    <div>
      <HeroSkeleton />
      <FeaturesSkeleton />
      <PricingSkeleton />
    </div>
  )
}

