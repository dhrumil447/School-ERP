import { ClipboardCheck, Megaphone, UsersRound } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { assignedClasses, notices } from '../data/mockData'

export default function TeacherDashboard() {
  return <><PageHeader eyebrow="Teacher dashboard" title="Today’s teaching workspace" description="Review assigned classes, mark attendance, read notices, and understand student load at a glance." action={<Button><ClipboardCheck size={18}/> Mark Attendance</Button>} />
    <div className="grid gap-6 xl:grid-cols-3"><Card className="xl:col-span-2"><CardHeader><CardTitle>Assigned Classes</CardTitle><UsersRound className="text-indigo-500"/></CardHeader><div className="grid gap-4 md:grid-cols-3">{assignedClasses.map(c => <div key={c.name} className="rounded-3xl bg-muted p-5"><p className="text-sm text-muted-foreground">{c.subject}</p><h3 className="mt-2 text-xl font-black">{c.name}</h3><p className="mt-4 text-sm">{c.students} students · {c.next}</p><Button className="mt-5 w-full" variant="secondary">Open class</Button></div>)}</div></Card><Card><CardHeader><CardTitle>Student Overview</CardTitle></CardHeader><p className="text-5xl font-black">101</p><p className="mt-2 text-muted-foreground">Students across active classes</p><div className="mt-6 space-y-3"><div className="h-3 rounded-full bg-muted"><div className="h-3 w-[88%] rounded-full bg-indigo-600"/></div><p className="text-sm text-muted-foreground">88% assignments submitted</p></div></Card></div>
    <Card className="mt-6"><CardHeader><CardTitle>Recent Notices</CardTitle><Megaphone className="text-indigo-500"/></CardHeader><div className="grid gap-4 md:grid-cols-3">{notices.map(n => <div key={n.title} className="rounded-2xl bg-muted p-4"><p className="font-bold">{n.title}</p><p className="text-sm text-muted-foreground">{n.date}</p></div>)}</div></Card></>
}
