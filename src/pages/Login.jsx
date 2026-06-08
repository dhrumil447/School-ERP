import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Login() {
  const { register, handleSubmit } = useForm()
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.25),transparent_28%),linear-gradient(135deg,#ffffff,#eef2ff)] p-4 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border bg-white/80 shadow-premium backdrop-blur-xl dark:bg-slate-950/80 lg:grid-cols-2">
        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <div className="mb-10 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white"><GraduationCap /></div><div><p className="text-xl font-black">Elevate ERP</p><p className="text-sm text-muted-foreground">Premium school operations suite</p></div></div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">Welcome back</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Run your entire campus from one elegant dashboard.</h1>
            <p className="mt-4 text-muted-foreground">Securely manage attendance, fees, academics, notices, teachers, and student journeys.</p>
            <form onSubmit={handleSubmit(() => {})} className="mt-8 space-y-4">
              <Input type="email" placeholder="Email address" {...register('email')} />
              <Input type="password" placeholder="Password" {...register('password')} />
              <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="rounded" /> Remember me</label><a className="font-semibold text-indigo-600" href="#">Forgot Password?</a></div>
              <Button className="w-full" size="lg">Sign in to dashboard <ArrowRight size={18} /></Button>
              <Link to="/admin" className="block text-center text-sm font-semibold text-indigo-600">View client demo without signing in</Link>
            </form>
          </motion.div>
        </section>
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-950 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.28),transparent_24%)]" />
          <motion.div className="relative z-10 mt-12 rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-premium backdrop-blur-2xl" initial={{ rotate: -2, y: 20 }} animate={{ rotate: 0, y: 0 }} transition={{ duration: .6 }}>
            <div className="mb-6 flex items-center justify-between"><span className="rounded-full bg-white/15 px-4 py-2 text-sm">Live campus pulse</span><ShieldCheck /></div>
            <div className="grid grid-cols-2 gap-4">
              {['2,846 Students', '94.6% Attendance', '$318K Collected', '184 Teachers'].map((item) => <div key={item} className="rounded-3xl bg-white/15 p-5"><BookOpen className="mb-6" /><p className="text-2xl font-black">{item.split(' ')[0]}</p><p className="text-sm text-indigo-100">{item.substring(item.indexOf(' ') + 1)}</p></div>)}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
