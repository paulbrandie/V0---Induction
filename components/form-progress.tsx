"use client"

import { cn } from "@/lib/utils"

interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const stepLabels = ["Personal", "Emergency", "General", "Workshop", "Contractor", "Review"]

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold transition-all duration-300",
                index + 1 <= currentStep
                  ? "bg-primary text-white border-primary shadow-lg"
                  : index + 1 === currentStep + 1
                    ? "bg-blue-100 text-primary border-primary"
                    : "bg-gray-100 text-gray-400 border-gray-300",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-2 font-medium text-center",
                index + 1 <= currentStep ? "text-primary" : "text-gray-400",
              )}
            >
              {stepLabels[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-blue-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
