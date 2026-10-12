import type { FC } from 'react'
import { History, Trash2, X, ArrowRight, Clock } from 'lucide-react'
import type { CalculationItem } from '../types'
import { formatINR } from '../utils/formatters'
import { sound } from '../utils/audio'

interface CalculationHistoryProps {
  isOpen: boolean
  history: CalculationItem[]
  onClose: () => void
  onSelect: (item: CalculationItem) => void
  onClear: () => void
}

export const CalculationHistory: FC<CalculationHistoryProps> = ({
  isOpen,
  history,
  onClose,
  onSelect,
  onClear,
}) => {
  if (!isOpen) return null

  const handleSelectItem = (item: CalculationItem) => {
    sound.playClick(650)
    onSelect(item)
    onClose()
  }

  const handleClearHistory = () => {
    sound.playClick(300)
    onClear()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-white">
            <History className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Calculation History</h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
              {history.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Clear all history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close history"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="overflow-y-auto p-4 space-y-2.5 divide-y-0">
          {history.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500">
              <Clock className="w-10 h-10 mb-2 opacity-40 text-slate-400" />
              <p className="text-sm font-medium">No calculations yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Your recent calculations will be automatically saved here for quick recall.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="group p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/90 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="font-semibold text-teal-300">{item.percentage}%</span>
                    <span>of</span>
                    <span className="text-slate-300">{formatINR(item.amount)}</span>
                  </div>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                    {formatINR(item.result)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>

                <div className="flex items-center text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 text-center">
          Click any calculation to load it into the calculator
        </div>
      </div>
    </div>
  )
}
