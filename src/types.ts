export interface CalculationItem {
  id: string
  amount: number
  percentage: number
  result: number
  totalAdd: number
  totalSubtract: number
  timestamp: number
  summary: string
}

export type PresetAmount = {
  label: string
  value: number
  displayLabel: string
}

export type PresetPercentage = {
  label: string
  value: number
  tag?: string
}
