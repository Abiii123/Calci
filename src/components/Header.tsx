import type { FC } from 'react'
import { Calculator, History, Volume2, VolumeX, Sparkles, HelpCircle } from 'lucide-react'

interface HeaderProps {
  historyCount: number
  isHistoryOpen: boolean
  onToggleHistory: () => void
  isMuted: boolean
  onToggleMute: () => void
  onOpenHelp: () => void
}

export const Header: FC<HeaderProps> = ({
  historyCount,
  isHistoryOpen,
  onToggleHistory,
  isMuted,
  onToggleMute,
  onOpenHelp,
}) => {
  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-slate-800/80 mb-6">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 group">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center transition-all group-hover:bg-slate-900/80">
            <Calculator className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>My</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Calci
              </span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> INR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
            Your money. Your calculations. Instantly.
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80 backdrop-blur-sm">
        {/* Sound toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute audio clicks' : 'Mute audio clicks'}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all duration-150 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Keyboard / Shortcuts Help */}
        <button
          onClick={onOpenHelp}
          title="Keyboard shortcuts & guide"
          aria-label="View shortcuts"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all duration-150 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* History drawer toggle */}
        <button
          onClick={onToggleHistory}
          title="Calculation History"
          aria-label="Toggle calculation history"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
            isHistoryOpen
              ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
          {historyCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isHistoryOpen
                  ? 'bg-slate-950 text-emerald-300'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {historyCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
