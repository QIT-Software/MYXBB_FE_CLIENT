import { cn } from '@/lib/utils'
import React from 'react'

const FinalStep = ({ isFace }: { isFace?: boolean }) => {
  return (
    <div className={cn('text-center', { 'text-primary-red': isFace })}>
      Thank you! Your booking is complete. An email with details of your booking has been sent to you.
    </div>
  )
}

export default FinalStep
