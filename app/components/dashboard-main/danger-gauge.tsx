"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DangerGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  animatedValue?: number;
}

export function DangerGauge({ value, size = "md", className }: DangerGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const normalizedValue = Math.min(Math.max(animatedValue, 0), 100);
  const angle = (normalizedValue / 100) * 360;

  // Color function for the gauge
  const getColor = (value: number) => {
    if (value < 25) return "rgba(34, 197, 94, 0.8)"; // neon green
    if (value < 50) return "rgba(234, 179, 8, 0.8)"; // neon yellow
    if (value < 75) return "rgba(249, 115, 22, 0.8)"; // neon orange
    return "rgba(239, 68, 68, 0.8)"; // neon red
  };

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  useEffect(() => {
    let startValue = 0;
    const endValue = value;

    const duration = 2000; // Duration of the animation in ms
    const frameRate = 1000 / 60; // Approximately 60 frames per second
    const totalFrames = Math.round(duration / frameRate);

    const increment = (endValue - startValue) / totalFrames;

    const animate = () => {
      if (startValue < endValue) {
        startValue += increment;
        setAnimatedValue(Math.min(Math.round(startValue), endValue));
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(endValue);
      }
    };

    animate();

    return () => {
      setAnimatedValue(0);
    };
  }, [value]);

  return (
    <div
      className={cn("relative", sizeClasses[size], className)}
      role='meter'
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}>
      <svg viewBox='0 0 100 100' className='w-full h-full transform -rotate-90'>
        {/* Background circle */}
        <circle cx='50' cy='50' r='45' fill='none' stroke='#e5e7eb' strokeWidth='10' />
        {/* Colored arc based on value */}
        <circle
          cx='50'
          cy='50'
          r='45'
          fill='none'
          stroke={getColor(normalizedValue)}
          strokeWidth='10'
          strokeLinecap='round'
          strokeDasharray={`${angle} 360`}
          strokeDashoffset='0'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className={cn("font-bold", textSizeClasses[size])} aria-hidden='true'>
          {normalizedValue}
        </span>
      </div>
    </div>
  );
}
