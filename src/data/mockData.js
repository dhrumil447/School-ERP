export const stats = [
  { label: 'Total Students', value: '2,846', delta: '+12.4%', tone: 'from-indigo-500 to-violet-500' },
  { label: 'Total Teachers', value: '184', delta: '+8 new', tone: 'from-sky-500 to-indigo-500' },
  { label: 'Attendance %', value: '94.6%', delta: '+3.1%', tone: 'from-emerald-500 to-teal-500' },
  { label: 'Pending Fees', value: '$42.8K', delta: '-6.8%', tone: 'from-amber-500 to-orange-500' },
]

export const attendanceData = [
  { month: 'Jan', present: 91, absent: 9 },
  { month: 'Feb', present: 93, absent: 7 },
  { month: 'Mar', present: 88, absent: 12 },
  { month: 'Apr', present: 95, absent: 5 },
  { month: 'May', present: 94, absent: 6 },
  { month: 'Jun', present: 97, absent: 3 },
]

export const feeData = [
  { month: 'Jan', collected: 84, pending: 16 },
  { month: 'Feb', collected: 78, pending: 22 },
  { month: 'Mar', collected: 90, pending: 10 },
  { month: 'Apr', collected: 88, pending: 12 },
  { month: 'May', collected: 92, pending: 8 },
  { month: 'Jun', collected: 86, pending: 14 },
]

export const notices = [
  { title: 'Annual Science Expo', date: 'Jun 14, 2026', type: 'Important', body: 'Project submissions close this Friday for all senior classes.' },
  { title: 'Parent Teacher Conference', date: 'Jun 19, 2026', type: 'Academic', body: 'Slots are open in the parent portal for grades 6 to 12.' },
  { title: 'Transport Route Update', date: 'Jun 22, 2026', type: 'Operations', body: 'Route B pickup timing changes by 10 minutes starting Monday.' },
]

export const students = [
  { id: 'ST-1024', name: 'Aarav Patel', className: 'Grade 10-A', guardian: 'Riya Patel', attendance: 96, fees: 'Paid', status: 'Active' },
  { id: 'ST-1031', name: 'Mia Johnson', className: 'Grade 9-B', guardian: 'Emma Johnson', attendance: 91, fees: 'Pending', status: 'Active' },
  { id: 'ST-1088', name: 'Noah Williams', className: 'Grade 8-C', guardian: 'Liam Williams', attendance: 88, fees: 'Partial', status: 'Review' },
  { id: 'ST-1092', name: 'Sophia Chen', className: 'Grade 11-A', guardian: 'Lina Chen', attendance: 98, fees: 'Paid', status: 'Active' },
  { id: 'ST-1101', name: 'Ethan Brown', className: 'Grade 7-A', guardian: 'Olivia Brown', attendance: 93, fees: 'Paid', status: 'Active' },
]

export const classes = ['Grade 7-A', 'Grade 8-C', 'Grade 9-B', 'Grade 10-A', 'Grade 11-A']

export const activities = [
  'Mia Johnson fee reminder sent',
  'Grade 10-A attendance submitted',
  'New teacher account provisioned',
  'Library notice published',
]

export const assignedClasses = [
  { name: 'Grade 10-A', subject: 'Mathematics', students: 38, next: '09:30 AM' },
  { name: 'Grade 9-B', subject: 'Physics', students: 34, next: '11:15 AM' },
  { name: 'Grade 8-C', subject: 'Robotics Lab', students: 29, next: '02:00 PM' },
]
