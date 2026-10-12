import { useState, type FC } from 'react'
import { Copy, Check, RotateCcw, ArrowUpRight, ArrowDownRight, Share2, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { formatINR, numberToIndianWords } from '../utils/formatters'
import { sound } from '../utils/audio'

interface ResultCardProps {
  amount: number
  percentage: number
  result: number
  hasCalculated: boolean
  onReset: () => void
  onToast: (msg: string) => void
}

export const ResultCard: FC<ResultCardProps> = ({
  amount,
  percentage,
  result,
  hasCalculated,
  onReset,
  onToast,
}) => {
  const [copied, setCopied] = useState(false)

  // Calculations for breakdowns:
  // Additive total (Amount + Result): GST / Markup / Total Price
  const totalWithAddition = amount + result
  // Subtractive total (Amount - Result): Discount / Net / TDS
  const totalWithDeduction = Math.max(0, amount - result)

  // Summary sentence according to specification:
  // e.g. "10% of ₹1,00,000 = ₹10,000.00"
  const formattedAmount = formatINR(amount)
  const formattedResult = formatINR(result)
  const summaryText = `${percentage}% of ${formattedAmount} = ${formattedResult}`

  const handleCopyResult = async () => {
    sound.playSuccess()
    try {
      await navigator.clipboard.writeText(formattedResult)
      setCopied(true)
      onToast(`Copied ${formattedResult} to clipboard!`)

      // Confetti burst on copy
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#34D399', '#059669', '#6EE7B7'],
        })
      } catch {
        // Ignore confetti error if any
      }

      setTimeout(() => setCopied(false), 2000)
    } catch {
      onToast('Failed to copy to clipboard')
    }
  }

  const handleCopySummary = async () => {
    sound.playClick(600)
    try {
      await navigator.clipboard.writeText(summaryText)
      onToast(`Copied summary: "${summaryText}"`)
    } catch {
      onToast('Failed to copy to clipboard')
    }
  }

  const resultWords = result > 0 ? numberToIndianWords(result) : ''

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/40 p-5 sm:p-7 backdrop-blur-xl transition-all duration-300">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header of Result Card */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-sm uppercase tracking-wider font-bold text-slate-300">
            Calculated Result
          </h2>
        </div>

        {/* Action buttons: Reset & Share */}
        <div className="flex items-center gap-2">
          {hasCalculated && (
            <button
              type="button"
              id="copy-summary-button"
              onClick={handleCopySummary}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/90 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Copy calculation summary"
            >
              <Share2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Copy Text</span>
            </button>
          )}

          <button
            type="button"
            id="reset-button"
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition-all cursor-pointer"
            title="Reset calculation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Centerpiece Hero Result */}
      <div className="flex flex-col items-center justify-center text-center py-2 relative z-10">
        {/* Dynamic calculation statement: e.g. "10% of ₹1,00,000" */}
        <div className="text-sm sm:text-base font-medium text-slate-400 mb-2 tracking-wide font-sans">
          {hasCalculated ? (
            <span className="flex items-center justify-center gap-1.5">
              <span className="text-teal-300 font-semibold">{percentage}%</span>
              <span>of</span>
              <span className="text-slate-200 font-semibold font-mono">{formattedAmount}</span>
            </span>
          ) : (
            <span className="text-slate-500">Enter an amount & percentage to see result</span>
          )}
        </div>

        {/* Giant Highlighted Amount */}
        <div className="relative group/val my-1">
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 drop-shadow-[0_0_25px_rgba(16,185,129,0.35)] select-all py-1">
            {formattedResult}
          </div>
        </div>

        {/* Words description */}
        {resultWords && (
          <div className="mt-1 text-xs sm:text-sm font-medium text-emerald-300/80 italic font-sans flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{resultWords}</span>
          </div>
        )}

        {/* Summary Pill: "10% of ₹1,00,000 = ₹10,000.00" */}
        {hasCalculated && (
          <div
            id="calculation-summary"
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-mono text-slate-200 shadow-sm flex items-center gap-2 max-w-full overflow-x-auto"
          >
            <span className="text-slate-400 font-sans text-xs">Summary:</span>
            <span className="font-semibold text-emerald-400">{summaryText}</span>
          </div>
        )}

        {/* Copy Result Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            id="copy-result-button"
            onClick={handleCopyResult}
            disabled={!hasCalculated}
            className={`w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg cursor-pointer ${
              hasCalculated
                ? copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-95'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 stroke-[2.5]" />
                <span>Copy Result</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Breakdown Cards: Total with Addition & Total with Deduction */}
      {hasCalculated && (
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          {/* Amount + Percentage (GST / Markup / Total Payable) */}
          <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-medium text-slate-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                Amount + Percentage
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-mono">
                Total Gross
              </span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {formatINR(totalWithAddition)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Ideal for GST, Sales Tax, Markup, or Tips
            </div>
          </div>

          {/* Amount - Percentage (Discount / Deduction / Net Payable) */}
          <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-medium text-slate-300">
                <ArrowDownRight className="w-3.5 h-3.5 text-teal-400" />
                Amount - Percentage
              </span>
              <span className="text-[10px] uppercase tracking-wider text-teal-400/80 font-mono">
                Total Net
              </span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {formatINR(totalWithDeduction)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Ideal for Discounts, TDS, or Deductions
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
