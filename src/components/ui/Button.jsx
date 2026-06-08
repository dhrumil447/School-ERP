import { cn } from '../../lib'

const variants = {
  primary: 'bg-primary text-primary-foreground shadow-lg shadow-indigo-500/20 hover:bg-indigo-500',
  secondary: 'bg-muted text-foreground hover:bg-indigo-100 dark:hover:bg-white/10',
  ghost: 'hover:bg-muted text-muted-foreground hover:text-foreground',
  danger: 'bg-rose-500 text-white hover:bg-rose-600'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-4', lg: 'h-12 px-6 text-base' }
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-60 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
