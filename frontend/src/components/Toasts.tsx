import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

type Variant = 'loading' | 'success' | 'error' | 'info' | 'warning'

const IconMap = {
  loading: Loader2,
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
} as const

const AccentMap: Record<Variant, string> = {
  loading: 'text-muted-foreground',
  success: 'text-emerald-400',
  error: 'text-red-400',
  info: 'text-sky-400',
  warning: 'text-amber-400',
}

export function AppToast({t, title, description, variant = 'info',}: {
  t: { id: string; visible: boolean }
  title: string
  description?: string
  variant?: Variant
}) {
  const Icon = IconMap[variant]

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-md overflow-hidden rounded-lg border border-(--color-border-subtle) bg-background/95 shadow-lg backdrop-blur',
        'ring-1 ring-white/10',
        t.visible ? 'toast-enter' : 'toast-leave',
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-md bg-muted/40">
          <Icon
            className={cn(
              'h-5 w-5',
              AccentMap[variant],
              variant === 'loading' && 'animate-spin',
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-tight text-foreground">
            {title}
          </p>
          {description ? (
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {variant === 'loading' ? (
        <div className="h-1 w-full bg-muted/40">
          <div className="h-full w-1/3 animate-[slide_1.2s_linear_infinite] bg-primary" />
        </div>
      ) : null}
    </div>
  )
}