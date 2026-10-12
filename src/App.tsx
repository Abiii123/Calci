import { useState, useEffect, useMemo, useCallback } from 'react'
import { Header } from './components/Header'
import { AmountInput } from './components/AmountInput'
import { PercentageInput } from './components/PercentageInput'
import { ResultCard } from './components/ResultCard'
import { CalculationHistory } from './components/CalculationHistory'
import { HelpModal } from './components/HelpModal'
import { Toast } from './components/Toast'
import type { CalculationItem } from './types'
import { formatINR } from './utils/formatters'
import { sound } from './utils/audio'

export function App() {
  // State for raw input strings
  const [amountStr, setAmountStr] = useState<string>('100000')
  const [percentageStr, setPercentageStr] = useState<string>('10')

  // History state
  const [history, setHistory] = useState<CalculationItem[]>(() => {
    try {
      const saved = localStorage.getItem('mycalci_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // UI state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(() => sound.isMuted())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Parse numbers safely
  const amountNum = useMemo(() => {
    const parsed = parseFloat(amountStr)
    return isNaN(parsed) || parsed < 0 ? 0 : parsed
  }, [amountStr])

  const percentageNum = useMemo(() => {
    const parsed = parseFloat(percentageStr)
    return isNaN(parsed) || parsed < 0 ? 0 : parsed
  }, [percentageStr])

  // Calculation formula: Result = Amount × Percentage ÷ 100
  const result = useMemo(() => {
    if (amountNum <= 0 || percentageNum < 0) return 0
    return (amountNum * percentageNum) / 100
  }, [amountNum, percentageNum])

  const hasCalculated = amountStr.trim() !== '' && percentageStr.trim() !== '' && amountNum > 0

  // Save calculation to history
  const saveToHistory = useCallback(() => {
    if (!hasCalculated || result <= 0) return

    const newItem: CalculationItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      amount: amountNum,
      percentage: percentageNum,
      result,
      totalAdd: amountNum + result,
      totalSubtract: Math.max(0, amountNum - result),
      timestamp: Date.now(),
      summary: `${percentageNum}% of ${formatINR(amountNum)} = ${formatINR(result)}`,
    }

    setHistory((prev) => {
      // Avoid duplicate consecutive calculations
      if (prev.length > 0 && prev[0].amount === newItem.amount && prev[0].percentage === newItem.percentage) {
        return prev
      }
      const updated = [newItem, ...prev.slice(0, 19)]
      try {
        localStorage.setItem('mycalci_history', JSON.stringify(updated))
      } catch {
        // Ignore storage errors
      }
      return updated
    })
  }, [hasCalculated, result, amountNum, percentageNum])

  // Debounce saving to history when user stops typing for 1.2s
  useEffect(() => {
    if (!hasCalculated) return
    const timer = setTimeout(() => {
      saveToHistory()
    }, 1200)

    return () => clearTimeout(timer)
  }, [amountStr, percentageStr, hasCalculated, saveToHistory])

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Action handlers
  const handleReset = () => {
    sound.playClick(300)
    setAmountStr('')
    setPercentageStr('')
    showToast('Calculator reset')
  }

  const handleAmountPreset = (presetVal: number) => {
    setAmountStr(presetVal.toString())
  }

  const handlePercentagePreset = (presetVal: number) => {
    setPercentageStr(presetVal.toString())
  }

  const handleSelectHistoryItem = (item: CalculationItem) => {
    setAmountStr(item.amount.toString())
    setPercentageStr(item.percentage.toString())
    showToast(`Loaded: ${item.percentage}% of ${formatINR(item.amount)}`)
  }

  const handleClearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem('mycalci_history')
    } catch {
      // Ignore
    }
    showToast('Calculation history cleared')
  }

  const handleToggleMute = () => {
    const muted = sound.toggleMute()
    setIsMuted(muted)
    showToast(muted ? 'Sound muted' : 'Sound unmuted')
  }

  // Keyboard navigation & shortcuts support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHistoryOpen) {
          setIsHistoryOpen(false)
          return
        }
        if (isHelpOpen) {
          setIsHelpOpen(false)
          return
        }
        handleReset()
      } else if (e.key === 'Enter') {
        // Prevent default submit behaviour if inside form
        e.preventDefault()
        saveToHistory()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isHistoryOpen, isHelpOpen, saveToHistory])

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background radial gradients for rich dark navy aesthetics */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-900/20 via-teal-950/15 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/3 -left-[10%] w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 -right-[10%] w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
        {/* Header */}
        <Header
          historyCount={history.length}
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        {/* Main Centered Calculator Card */}
        <main className="w-full">
          <div className="w-full bg-slate-900/70 border border-slate-800/90 rounded-3xl p-5 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-slate-950/80 flex flex-col gap-7 transition-all">
            {/* Section A: Amount Input */}
            <section aria-labelledby="amount-section-title">
              <AmountInput
                amountStr={amountStr}
                amountNum={amountNum}
                onChangeAmount={setAmountStr}
                onSelectPreset={handleAmountPreset}
              />
            </section>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800/80 w-full" />
              <div className="absolute bg-slate-900 px-3 text-slate-500 text-xs font-mono font-medium uppercase tracking-widest border border-slate-800 rounded-full py-0.5">
                × Percentage
              </div>
            </div>

            {/* Section B: Percentage Input */}
            <section aria-labelledby="percentage-section-title">
              <PercentageInput
                percentageStr={percentageStr}
                percentageNum={percentageNum}
                onChangePercentage={setPercentageStr}
                onSelectPreset={handlePercentagePreset}
              />
            </section>

            {/* Section C: Result Display */}
            <section aria-labelledby="result-section-title">
              <ResultCard
                amount={amountNum}
                percentage={percentageNum}
                result={result}
                hasCalculated={hasCalculated}
                onReset={handleReset}
                onToast={showToast}
              />
            </section>
          </div>
        </main>

        {/* Indian Rupee Context Banner / Help Tip */}
        <aside className="mt-8 text-center text-xs text-slate-500 max-w-md space-y-1">
          <p>
            Standard Indian Numbering Format: <span className="text-slate-400 font-mono">1,00,000 (1 Lakh)</span> and <span className="text-slate-400 font-mono">1,00,00,000 (1 Crore)</span>.
          </p>
          <p className="text-[11px] text-slate-600">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">Esc</kbd> to reset • Real-time instant calculations
          </p>
        </aside>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center border-t border-slate-900/90 text-xs text-slate-600">
        <p>© 2026 MyCalci — Indian Rupee (INR) Percentage Calculator</p>
      </footer>

      {/* History Modal / Drawer */}
      <CalculationHistory
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={handleSelectHistoryItem}
        onClear={handleClearHistory}
      />

      {/* Help & Guide Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Toast notifications */}
      <Toast message={toastMessage} />
    </div>
  )
}

export default App
