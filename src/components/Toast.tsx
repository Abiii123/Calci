import type { FC } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  message: string | null
  onClose?: () => void
}

export const Toast: FC<ToastProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-2xl shadow-emerald-950/60 animate-bounce duration-300">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-xs sm:text-sm font-medium text-slate-100">{message}</span>
    </div>
  )
}
