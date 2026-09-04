import { cn } from '@/lib/utils'
import { formatPoints } from '@/lib/formatters'

interface PointsDisplayProps {
  value: number
  className?: string
  variant?: 'default' | 'compact' | 'large'
  label?: string
}

export function PointsDisplay({
  value,
  className,
  variant = 'default',
  label,
}: PointsDisplayProps) {
  const formatted = formatPoints(Math.abs(value))
  
  return (
    <div className={cn('inline-flex flex-col', className)}>
      {label && (
        <span className="text-xs text-muted-foreground">{label}</span>
      )}
      <span
        className={cn(
          'font-semibold tabular-nums',
          variant === 'compact' && 'text-sm',
          variant === 'default' && 'text-base',
          variant === 'large' && 'text-2xl',
          value >= 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {value >= 0 ? '+' : '-'}{formatted}
      </span>
    </div>
  )
}
