import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DangerGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DangerGauge({ value, size = "md", className }: DangerGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const normalizedValue = Math.min(Math.max(animatedValue, 0), 100);

  const getColor = (val: number) => {
    if (val < 25) return "rgba(18, 234, 68, 0.8)";
    if (val < 50) return "rgba(242, 255, 0, 0.8)";
    if (val < 75) return "rgba(234, 12, 12, 0.824)";
    return "rgba(239, 68, 68, 0.8)";
  };

  const sizeClasses = {
    sm: "w-16 h-16 sm:w-20 sm:h-20 md:w-50 md:h-30 lg:w-80 lg:h-40",
    md: "w-50 h-30 sm:w-50 sm:h-30 md:w-60 md:h-40 lg:w-80 lg:h-40",
    lg: "w-80 h-40 sm:w-80 sm:h-40 md:w-80 md:h-40 lg:w-80 lg:h-40",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  useEffect(() => {
    let start = animatedValue;
    let startTime: number | null = null;
    const duration = 1000;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const nextValue = start + (value - start) * Math.min(progress, 1);

      setAnimatedValue(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value); // Ensure exact final value
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div
      className={cn("relative", sizeClasses[size], className)}
      role='meter'
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}>
      <svg viewBox='0 0 100 50'>
        <circle
          cx='50'
          cy='50'
          r='45'
          fill='none'
          stroke='#e5e7eb'
          strokeWidth='10'
          strokeDasharray='141.37'
          strokeDashoffset='0'
          strokeLinecap='butt'
          transform='rotate(180, 50, 50)'
        />

        <circle
          cx='50'
          cy='50'
          r='45'
          fill='none'
          stroke={getColor(normalizedValue)}
          strokeWidth='10'
          strokeDasharray='141.37'
          strokeDashoffset={`${141.37 - (normalizedValue / 10) * 141.37}`}
          strokeLinecap='butt'
          transform='rotate(180, 50, 50)'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center xl:mt-28 lg:mt-28 md:mt-24 sm:mt-24 xs:mt-16'>
        <span className={cn("font-bold", textSizeClasses[size])} aria-hidden='true'>
          {normalizedValue.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
