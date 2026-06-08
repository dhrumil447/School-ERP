import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCircle2, GraduationCap, Home, LogOut, Megaphone, Menu, Moon, Sun, UserRound, UsersRound, ClipboardCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { cn } from '../../lib'

const nav = [
  { to: '/admin', label: 'Admin Dashboard', icon: Home },
  { to: '/students', label: 'Students', icon: UsersRound },
  { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/notices', label: 'Notices', icon: Megaphone },
  { to: '/student', label: 'Student Portal', icon: UserRound },
  { to: '/teacher', label: 'Teacher Portal', icon: GraduationCap },
]

export function AppShell() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_30%),linear-gradient(180deg,#fbfcff,#eef2ff)] dark:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),linear-gradient(180deg,#070b1a,#111827)]">
      <ToastStack />
      <MobileNav open={open} />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/70 bg-white/80 p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 lg:block">
        <Brand />
        <NavItems />
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white shadow-soft">
          <p className="text-sm font-semibold">Premium support</p>
          <p className="mt-1 text-xs text-indigo-100">Client demo workspace synced 2 min ago.</p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/70 bg-white/70 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/60 sm:px-6">
          <div className="flex items-center gap-3">
            <Button className="lg:hidden" variant="secondary" size="sm" onClick={() => setOpen(!open)}><Menu size={18} /></Button>
            <div className="hidden max-w-md flex-1 md:block"><Input placeholder="Search students, classes, notices..." className="bg-white/70" /></div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</Button>
              <Button variant="secondary" size="sm"><Bell size={18} /></Button>
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2 shadow-sm dark:bg-white/5">
                <img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="Principal avatar" />
                <div className="hidden sm:block"><p className="text-sm font-bold">Dr. Amelia Hart</p><p className="text-xs text-muted-foreground">Principal</p></div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function Brand() {
  return <div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/30"><GraduationCap /></div><div><p className="text-lg font-black tracking-tight">Elevate ERP</p><p className="text-xs text-muted-foreground">School command center</p></div></div>
}

function NavItems() {
  return <nav className="space-y-2">{nav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition', isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}><Icon size={18} />{label}</NavLink>)}<NavLink to="/" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><LogOut size={18} />Logout</NavLink></nav>
}

function MobileNav({ open }) {
  return <AnimatePresence>{open && <motion.aside className="fixed inset-x-4 top-20 z-50 rounded-3xl border bg-card p-4 shadow-premium lg:hidden" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}><Brand /><NavItems /></motion.aside>}</AnimatePresence>
}

function ToastStack() {
  const items = [
    { title: 'Demo ready', body: 'All modules are populated with mock school data.' },
    { title: 'Autosaved', body: 'Dashboard preferences synced securely.' },
  ]
  return <div className="pointer-events-none fixed right-4 top-20 z-50 hidden w-80 space-y-3 xl:block">{items.map((item, index) => <motion.div key={item.title} className="rounded-2xl border bg-card/95 p-4 shadow-soft backdrop-blur-xl" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + index * 0.12 }}><div className="flex gap-3"><CheckCircle2 className="mt-0.5 text-emerald-500" size={18} /><div><p className="text-sm font-bold">{item.title}</p><p className="text-xs text-muted-foreground">{item.body}</p></div></div></motion.div>)}</div>
}

export function PageHeader({ eyebrow, title, description, action }) {
  return <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-muted-foreground">{description}</p></div>{action}</div>
}
