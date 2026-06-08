export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-2xl bg-gradient-to-r from-indigo-100 via-slate-100 to-indigo-100 dark:from-white/10 dark:via-white/5 dark:to-white/10 ${className}`} />
}
