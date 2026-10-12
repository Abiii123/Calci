import type { FC } from 'react'
import { X, Keyboard, Sparkles, BookOpen, Calculator } from 'lucide-react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export const HelpModal: FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-white">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">MyCalci Guide & Shortcuts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-xs uppercase tracking-wider text-emerald-400">
              <Keyboard className="w-4 h-4" /> Keyboard Shortcuts
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-sans">Reset Inputs & Result</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400 font-bold border border-slate-700">
                  Esc
                </kbd>
              </div>
              <div className="flex justify-between items-center py-1 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-sans">Calculate & Save to History</span>
                <kbd className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400 font-bold border border-slate-700">
                  Enter
                </kbd>
              </div>
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2 text-xs uppercase tracking-wider text-teal-400">
              <BookOpen className="w-4 h-4" /> Formula Used
            </h4>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
              Result = (Amount × Percentage) ÷ 100
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-white mb-1.5 text-xs uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" /> Indian Numbering System
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Amounts are automatically grouped according to the Indian standard (e.g., <strong>₹1,00,000</strong> for 1 Lakh, <strong>₹10,00,000</strong> for 10 Lakhs, and <strong>₹1,00,00,000</strong> for 1 Crore).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
