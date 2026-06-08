import { cn } from '../../lib'

export function Card({ className, ...props }) {
  return <section className={cn('glass-card rounded-2xl p-5', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('mb-4 flex items-center justify-between gap-3', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-bold tracking-tight', className)} {...props} />
}
