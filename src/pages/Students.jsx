import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Edit3, Eye, Filter, Search, Trash2, UserPlus } from 'lucide-react'
import { PageHeader } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input, Select } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { students } from '../data/mockData'

export default function Students() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { register } = useForm()
  const filtered = useMemo(() => students.filter((s) => `${s.name} ${s.id} ${s.className}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <><PageHeader eyebrow="Student management" title="Manage every learner profile" description="Search, filter, add, inspect, and update student records with enterprise-grade table interactions." action={<Button onClick={() => setOpen(true)}><UserPlus size={18} /> Add Student</Button>} />
    <Card><div className="mb-5 flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-3 text-muted-foreground" size={18}/><Input className="pl-11" placeholder="Search by name, ID, or class" value={query} onChange={(e) => setQuery(e.target.value)} /></div><Select><option>All Classes</option><option>Grade 10-A</option><option>Grade 9-B</option></Select><Button variant="secondary"><Filter size={18}/> Filters</Button></div>
      {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="text-muted-foreground"><tr>{['Student','Class','Guardian','Attendance','Fees','Status','Actions'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>{filtered.map((s) => <tr key={s.id} className="border-t hover:bg-muted/60"><td className="px-4 py-4"><p className="font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.id}</p></td><td className="px-4 py-4">{s.className}</td><td className="px-4 py-4">{s.guardian}</td><td className="px-4 py-4"><span className="font-bold text-indigo-600">{s.attendance}%</span></td><td className="px-4 py-4"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10">{s.fees}</span></td><td className="px-4 py-4">{s.status}</td><td className="px-4 py-4"><div className="flex gap-2"><Button size="sm" variant="ghost"><Eye size={16}/></Button><Button size="sm" variant="ghost"><Edit3 size={16}/></Button><Button size="sm" variant="ghost"><Trash2 size={16}/></Button></div></td></tr>)}</tbody></table></div> : <div className="grid min-h-64 place-items-center rounded-3xl bg-muted text-center"><div><p className="text-lg font-bold">No students found</p><p className="text-muted-foreground">Try another search or add a new profile.</p></div></div>}
    </Card><Modal open={open} title="Add Student" onClose={() => setOpen(false)}><div className="grid gap-4 sm:grid-cols-2"><Input placeholder="Full name" {...register('name')} /><Input placeholder="Student ID" {...register('id')} /><Input placeholder="Class" {...register('className')} /><Input placeholder="Guardian" {...register('guardian')} /></div><Button className="mt-5 w-full">Save student</Button></Modal></>
}
