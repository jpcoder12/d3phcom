'use client'

import React from 'react'
import { cn } from "@/lib/utils"

interface DangerGaugeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function DangerGauge({ value, size = 'md', className }: DangerGaugeProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100)
  const angle = (normalizedValue / 100) * 360

  const getColor = (value: number) => {
    if (value < 25) return '#22c55e' // green
    if (value < 50) return '#eab308' // yellow
    if (value < 75) return '#f97316' // orange
    return '#ef4444' // red
  }

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  }

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)} role="meter" aria-valuenow={normalizedValue} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        {/* Colored arc based on value */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getColor(normalizedValue)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${angle} 360`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("font-bold", textSizeClasses[size])} aria-hidden="true">{normalizedValue}</span>
      </div>
    </div>
  )
}