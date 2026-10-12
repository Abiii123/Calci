import type { FC, ChangeEvent } from 'react'
import { IndianRupee, X, TrendingUp } from 'lucide-react'
import { formatINR, numberToIndianWords } from '../utils/formatters'
import { sound } from '../utils/audio'

interface AmountInputProps {
  amountStr: string
  amountNum: number
  onChangeAmount: (val: string) => void
  onSelectPreset: (presetValue: number) => void
  onAddAmount?: (increment: number) => void
}

const AMOUNT_PRESETS = [
  { label: '₹1,000', value: 1000, short: '1K' },
  { label: '₹10,000', value: 10000, short: '10K' },
  { label: '₹50,000', value: 50000, short: '50K' },
  { label: '₹1,00,000', value: 100000, short: '1 Lakh' },
  { label: '₹10,00,000', value: 1000000, short: '10 Lakhs' },
]

export const AmountInput: FC<AmountInputProps> = ({
  amountStr,
  amountNum,
  onChangeAmount,
  onSelectPreset,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // Allow numbers, single decimal dot, commas
    // Clean out any invalid characters
    const sanitized = raw.replace(/[^0-9.]/g, '')
    // Prevent multiple dots
    const parts = sanitized.split('.')
    const cleanVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitized

    onChangeAmount(cleanVal)
  }

  const handleClear = () => {
    sound.playClick(400)
    onChangeAmount('')
  }

  const handlePresetClick = (value: number) => {
    sound.playClick(650)
    onSelectPreset(value)
  }

  // Generate words preview if valid positive amount
  const words = amountNum > 0 ? numberToIndianWords(amountNum) : ''

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Label and Formatted Indian Format Indicator */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="amount-input"
          className="text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-1.5"
        >
          <span>Enter Amount (₹)</span>
          <span className="text-xs font-normal text-slate-400">INR</span>
        </label>
        {amountNum > 0 && (
          <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 animate-fade-in">
            {formatINR(amountNum, true)}
          </span>
        )}
      </div>

      {/* Input Field Container */}
      <div className="relative group">
        {/* Leading Rupee Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
          <IndianRupee className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          id="amount-input"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 1,00,000"
          value={amountStr}
          onChange={handleInputChange}
          className="w-full pl-11 pr-11 py-3.5 bg-slate-900/90 hover:bg-slate-900 focus:bg-slate-900 text-white placeholder-slate-500 font-mono text-lg rounded-xl border border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-inner"
        />

        {/* Clear Button */}
        {amountStr && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Clear amount"
          >
            <div className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
              <X className="w-3.5 h-3.5" />
            </div>
          </button>
        )}
      </div>

      {/* Words Representation for Indian Numbering Clarity */}
      {words && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 italic px-1 font-sans">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{words}</span>
        </div>
      )}

      {/* Quick Amount Presets (₹1,000, ₹10,000, ₹50,000, ₹1,00,000, ₹10,00,000) */}
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Quick Amount Presets:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {AMOUNT_PRESETS.map((preset) => {
            const isSelected = amountNum === preset.value
            return (
              <button
                key={preset.value}
                type="button"
                id={`preset-amount-${preset.value}`}
                onClick={() => handlePresetClick(preset.value)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium font-mono transition-all duration-150 flex flex-col items-center justify-center cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/25 scale-[1.02]'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 active:scale-95'
                }`}
              >
                <span>{preset.label}</span>
                <span
                  className={`text-[10px] font-sans ${
                    isSelected ? 'text-slate-900 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {preset.short}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
