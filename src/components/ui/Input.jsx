import { cn } from '../../lib'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn('h-11 w-full rounded-2xl border bg-white/80 px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:bg-white/5 dark:focus:ring-indigo-500/20', className)}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn('h-11 rounded-2xl border bg-white/80 px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:bg-white/5 dark:focus:ring-indigo-500/20', className)}
      {...props}
    >
      {children}
    </select>
  )
}
