import { useState } from 'react'
import { CheckCircle2, ClipboardCheck, XCircle } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Select } from '../components/ui/Input'
import { attendanceData, classes, students } from '../data/mockData'

export default function Attendance() {
  const [present, setPresent] = useState(Object.fromEntries(students.map((s) => [s.id, true])))
  return <><PageHeader eyebrow="Attendance management" title="Fast daily attendance workflow" description="Select a class, toggle student presence, and review monthly trends with summary analytics." action={<Select>{classes.map(c => <option key={c}>{c}</option>)}</Select>} />
    <div className="grid gap-4 sm:grid-cols-3">{[['Present', '92%', CheckCircle2], ['Absent', '8%', XCircle], ['Monthly Average', '94.6%', ClipboardCheck]].map(([l,v,Icon]) => <Card key={l}><Icon className="mb-4 text-indigo-500"/><p className="text-sm text-muted-foreground">{l}</p><p className="text-3xl font-black">{v}</p></Card>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-5"><Card className="xl:col-span-3"><CardHeader><CardTitle>Student Attendance Table</CardTitle><Button>Submit attendance</Button></CardHeader><div className="space-y-3">{students.map(s => <div key={s.id} className="flex items-center justify-between rounded-2xl bg-muted p-4"><div><p className="font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.className}</p></div><button onClick={() => setPresent({...present, [s.id]: !present[s.id]})} className={`rounded-full px-4 py-2 text-sm font-bold transition ${present[s.id] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>{present[s.id] ? 'Present' : 'Absent'}</button></div>)}</div></Card><Card className="xl:col-span-2"><CardHeader><CardTitle>Monthly Overview</CardTitle></CardHeader><div className="h-80"><ResponsiveContainer><AreaChart data={attendanceData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area dataKey="present" stroke="#6366f1" fill="#c7d2fe" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></Card></div></>
}
