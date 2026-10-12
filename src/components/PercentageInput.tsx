import type { FC, ChangeEvent } from 'react'
import { Percent, X, Sparkles } from 'lucide-react'
import { sound } from '../utils/audio'

interface PercentageInputProps {
  percentageStr: string
  percentageNum: number
  onChangePercentage: (val: string) => void
  onSelectPreset: (presetValue: number) => void
}

// Exactly the presets specified in guide.txt:
// 1%, 5%, 10%, 12%, 18%, 20%, 25%, 30%, 50%, and 100%
const PERCENTAGE_PRESETS = [
  { label: '1%', value: 1 },
  { label: '5%', value: 5, tag: 'GST' },
  { label: '10%', value: 10 },
  { label: '12%', value: 12, tag: 'GST' },
  { label: '18%', value: 18, tag: 'GST' },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: '30%', value: 30 },
  { label: '50%', value: 50, tag: 'Half' },
  { label: '100%', value: 100, tag: 'Full' },
]

export const PercentageInput: FC<PercentageInputProps> = ({
  percentageStr,
  percentageNum,
  onChangePercentage,
  onSelectPreset,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // Allow numbers and decimal points, strip other chars
    const sanitized = raw.replace(/[^0-9.]/g, '')
    const parts = sanitized.split('.')
    const cleanVal = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitized

    onChangePercentage(cleanVal)
  }

  const handleClear = () => {
    sound.playClick(400)
    onChangePercentage('')
  }

  const handlePresetClick = (val: number) => {
    sound.playClick(720)
    onSelectPreset(val)
  }

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="percentage-input"
          className="text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-1.5"
        >
          <span>Enter Percentage (%)</span>
        </label>
        {percentageNum > 0 && (
          <span className="text-xs font-mono font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
            {percentageNum}%
          </span>
        )}
      </div>

      {/* Input Field Container with % indicator inside */}
      <div className="relative group">
        {/* Leading Percent Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
          <Percent className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          id="percentage-input"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 10, 18, 25"
          value={percentageStr}
          onChange={handleInputChange}
          className="w-full pl-11 pr-14 py-3.5 bg-slate-900/90 hover:bg-slate-900 focus:bg-slate-900 text-white placeholder-slate-500 font-mono text-lg rounded-xl border border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-inner"
        />

        {/* In-input % indicator badge and clear button */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-2">
          {percentageStr && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear percentage"
            >
              <div className="w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
                <X className="w-3 h-3" />
              </div>
            </button>
          )}
          <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 select-none">
            %
          </span>
        </div>
      </div>

      {/* Quick Percentage Presets: 1%, 5%, 10%, 12%, 18%, 20%, 25%, 30%, 50%, 100% */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Quick Percentage Presets:
          </span>
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-teal-400" /> Includes GST rates
          </span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {PERCENTAGE_PRESETS.map((preset) => {
            const isSelected = percentageNum === preset.value
            return (
              <button
                key={preset.value}
                type="button"
                id={`preset-percent-${preset.value}`}
                onClick={() => handlePresetClick(preset.value)}
                className={`py-2 px-1 rounded-lg text-xs font-semibold font-mono transition-all duration-150 flex flex-col items-center justify-center cursor-pointer border relative ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/25 scale-[1.03]'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 active:scale-95'
                }`}
              >
                <span>{preset.label}</span>
                {preset.tag && (
                  <span
                    className={`text-[8px] uppercase tracking-tighter ${
                      isSelected ? 'text-slate-950 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {preset.tag}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
