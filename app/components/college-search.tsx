"use client"
import { Input } from "@/components/ui/input"
import { GraduationCap } from "lucide-react"

interface CollegeSearchProps {
  value: string
  onChange: (value: string) => void
}

export function CollegeSearch({ value, onChange }: CollegeSearchProps) {
  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter your college or university name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-200 pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <GraduationCap className="h-5 w-5 text-purple-600" />
        </div>
      </div>
    </div>
  )
}
