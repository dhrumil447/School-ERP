import { Award, Bell, CalendarCheck, UserRound } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { notices } from '../data/mockData'

export default function StudentDashboard() {
  return <><PageHeader eyebrow="Student dashboard" title="Good morning, Sophia" description="A focused portal for attendance, latest results, notices, and student profile details." />
    <div className="grid gap-6 lg:grid-cols-3"><Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white"><CalendarCheck className="mb-8"/><p className="text-sm text-indigo-100">Attendance Percentage</p><p className="text-5xl font-black">98%</p><div className="mt-5 h-3 rounded-full bg-white/20"><div className="h-3 w-[98%] rounded-full bg-white"/></div></Card><Card><Award className="mb-8 text-indigo-500"/><p className="text-sm text-muted-foreground">Latest Results</p><p className="text-5xl font-black">A+</p><p className="mt-2 text-muted-foreground">Mathematics term assessment</p></Card><Card><UserRound className="mb-8 text-indigo-500"/><p className="text-sm text-muted-foreground">Profile</p><p className="text-2xl font-black">Sophia Chen</p><p className="text-muted-foreground">Grade 11-A · ST-1092</p></Card></div>
    <Card className="mt-6"><CardHeader><CardTitle>Recent Notices</CardTitle><Bell className="text-indigo-500"/></CardHeader><div className="grid gap-4 md:grid-cols-3">{notices.map(n => <div key={n.title} className="rounded-2xl bg-muted p-4"><p className="font-bold">{n.title}</p><p className="mt-1 text-sm text-muted-foreground">{n.body}</p></div>)}</div></Card></>
}
