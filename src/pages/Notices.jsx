import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Megaphone, Plus, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { activities, notices } from '../data/mockData'

export default function Notices() {
  const [open, setOpen] = useState(false)
  const { register } = useForm()
  return <><PageHeader eyebrow="Notices & announcements" title="Broadcast beautiful campus updates" description="Create announcements, highlight important notices, and track recent communication activity." action={<Button onClick={() => setOpen(true)}><Plus size={18}/> Create Notice</Button>} />
    <div className="grid gap-6 lg:grid-cols-3"><div className="grid gap-4 lg:col-span-2">{notices.map((n, i) => <Card key={n.title} className="relative overflow-hidden"><div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-indigo-100 dark:bg-indigo-500/10"/><div className="relative"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10">{n.type}</span>{i === 0 && <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700"><Sparkles size={14}/> Important</span>}</div><h3 className="text-xl font-black">{n.title}</h3><p className="mt-2 text-muted-foreground">{n.body}</p><p className="mt-4 text-sm font-semibold text-indigo-600">{n.date}</p></div></Card>)}</div><Card><CardHeader><CardTitle>Recent Activity</CardTitle><Megaphone className="text-indigo-500"/></CardHeader><div className="space-y-4">{activities.map((a) => <div key={a} className="border-l-4 border-indigo-500 pl-4"><p className="font-semibold">{a}</p><p className="text-xs text-muted-foreground">Just now</p></div>)}</div></Card></div><Modal open={open} title="Create Notice" onClose={() => setOpen(false)}><div className="space-y-4"><Input placeholder="Notice title" {...register('title')} /><textarea className="min-h-32 w-full rounded-2xl border bg-white/80 p-4 outline-none focus:ring-4 focus:ring-indigo-100 dark:bg-white/5" placeholder="Write announcement details..." {...register('body')} /></div><Button className="mt-5 w-full">Publish notice</Button></Modal></>
}
