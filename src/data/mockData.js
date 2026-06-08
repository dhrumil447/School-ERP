export const mockStudents = [
 { "id": 1, "name": "Aarav Kumar",   "email": "aarav.kumar@school.com",   "class": "10-A", "rollNo": "001", "phone": "9876543210", "guardian": "Rajesh Kumar",  "dob": "2008-05-15", "status": "active", "attendance": 94, "feeStatus": "paid"    },
    { "id": 2, "name": "Zara Singh",    "email": "zara.singh@school.com",    "class": "10-B", "rollNo": "002", "phone": "9876543211", "guardian": "Priya Singh",   "dob": "2008-06-20", "status": "active", "attendance": 88, "feeStatus": "pending" },
    { "id": 3, "name": "Arjun Patel",   "email": "arjun.patel@school.com",   "class": "10-A", "rollNo": "003", "phone": "9876543212", "guardian": "Vikram Patel",  "dob": "2008-07-10", "status": "active", "attendance": 92, "feeStatus": "paid"    },
    { "id": 4, "name": "Ananya Verma",  "email": "ananya.verma@school.com",  "class": "10-C", "rollNo": "004", "phone": "9876543213", "guardian": "Deepak Verma",  "dob": "2008-08-25", "status": "active", "attendance": 96, "feeStatus": "paid"    },
    { "id": 5, "name": "Rohan Gupta",   "email": "rohan.gupta@school.com",   "class": "10-A", "rollNo": "005", "phone": "9876543214", "guardian": "Anil Gupta",    "dob": "2008-09-30", "status": "active", "attendance": 85, "feeStatus": "pending" }
 
];

export const mockTeachers = [
  { id: 1, name: 'Dr. Rajiv Kumar', email: 'rajiv.kumar@school.com', subject: 'Mathematics', classes: ['10-A', '10-B'] },
  { id: 2, name: 'Ms. Priya Sharma', email: 'priya.sharma@school.com', subject: 'English', classes: ['10-A', '10-C'] },
  { id: 3, name: 'Mr. Sanjay Desai', email: 'sanjay.desai@school.com', subject: 'Science', classes: ['10-B', '10-C'] },
  { id: 4, name: 'Ms. Neha Patel', email: 'neha.patel@school.com', subject: 'Social Studies', classes: ['10-A', '10-B', '10-C'] },
];

export const mockAttendance = [
  { studentId: 1, date: '2024-06-01', status: 'present' },
  { studentId: 1, date: '2024-06-02', status: 'present' },
  { studentId: 1, date: '2024-06-03', status: 'absent' },
  { studentId: 1, date: '2024-06-04', status: 'present' },
  { studentId: 2, date: '2024-06-01', status: 'present' },
  { studentId: 2, date: '2024-06-02', status: 'absent' },
  { studentId: 2, date: '2024-06-03', status: 'present' },
  { studentId: 2, date: '2024-06-04', status: 'present' },
  { studentId: 3, date: '2024-06-01', status: 'present' },
  { studentId: 3, date: '2024-06-02', status: 'present' },
  { studentId: 3, date: '2024-06-03', status: 'present' },
  { studentId: 3, date: '2024-06-04', status: 'absent' },
];

export const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day - June 15',
    content: 'We are excited to announce our Annual Sports Day on June 15, 2024. All students are requested to participate.',
    date: '2024-06-08',
    category: 'Events',
    important: true,
    author: 'Principal Office',
  },
  {
    id: 2,
    title: 'Mid-Term Exam Schedule Released',
    content: 'The mid-term examination schedule for Class 10 has been released. Please find the schedule in the attached document.',
    date: '2024-06-07',
    category: 'Academic',
    important: true,
    author: 'Academic Team',
  },
  {
    id: 3,
    title: 'Summer Vacation Starts',
    content: 'Summer vacation will start from June 20 and end on July 5. All students should submit their assignments before the vacation.',
    date: '2024-06-06',
    category: 'Holiday',
    important: false,
    author: 'Administration',
  },
  {
    id: 4,
    title: 'New Library Books Arrived',
    content: 'New books have been added to our school library. Students can issue books from next week.',
    date: '2024-06-05',
    category: 'General',
    important: false,
    author: 'Librarian',
  },
  {
    id: 5,
    title: 'Parent-Teacher Meeting Scheduled',
    content: 'Parent-Teacher meeting is scheduled for June 22, 2024. All parents are requested to attend.',
    date: '2024-06-04',
    category: 'General',
    important: true,
    author: 'Principal Office',
  },
];

export const mockActivities = [
  { id: 1, type: 'Student Added', description: 'New student Arjun Patel added to class 10-A', timestamp: '2024-06-08 10:30' },
  { id: 2, type: 'Attendance Updated', description: 'Attendance marked for class 10-A', timestamp: '2024-06-08 09:15' },
  { id: 3, type: 'Notice Published', description: 'Annual Sports Day notice published', timestamp: '2024-06-07 14:45' },
  { id: 4, type: 'Fee Payment', description: 'Fee payment received from Aarav Kumar', timestamp: '2024-06-07 11:20' },
  { id: 5, type: 'Report Generated', description: 'Monthly attendance report generated', timestamp: '2024-06-06 16:00' },
];

export const mockEvents = [
  { id: 1, name: 'Annual Sports Day', date: '2024-06-15', time: '09:00 AM', location: 'School Ground' },
  { id: 2, name: 'Science Exhibition', date: '2024-06-20', time: '10:00 AM', location: 'Auditorium' },
  { id: 3, name: 'Cultural Program', date: '2024-06-28', time: '04:00 PM', location: 'Auditorium' },
];

export const mockFeeData = [
  { month: 'Jan', collected: 45000, target: 50000 },
  { month: 'Feb', collected: 48000, target: 50000 },
  { month: 'Mar', collected: 42000, target: 50000 },
  { month: 'Apr', collected: 50000, target: 50000 },
  { month: 'May', collected: 47000, target: 50000 },
  { month: 'Jun', collected: 43000, target: 50000 },
];

export const mockAttendanceData = [
  { day: 'Mon', percentage: 92 },
  { day: 'Tue', percentage: 89 },
  { day: 'Wed', percentage: 94 },
  { day: 'Thu', percentage: 91 },
  { day: 'Fri', percentage: 88 },
];

export const mockStudentResults = [
  { subject: 'Mathematics', marks: 92, totalMarks: 100, percentage: 92 },
  { subject: 'English', marks: 88, totalMarks: 100, percentage: 88 },
  { subject: 'Science', marks: 95, totalMarks: 100, percentage: 95 },
  { subject: 'Social Studies', marks: 85, totalMarks: 100, percentage: 85 },
];

export const mockQuickActions = [
  { id: 1, label: 'Mark Attendance', icon: 'check', action: 'attendance' },
  { id: 2, label: 'Add Notice', icon: 'bell', action: 'notice' },
  { id: 3, label: 'View Reports', icon: 'chart', action: 'reports' },
  { id: 4, label: 'Manage Fees', icon: 'wallet', action: 'fees' },
];

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

// Enhanced Analytics Data for Premium Dashboard
export const mockWeeklyAttendance = {
  thisWeek: [
    { day: 'Monday', percentage: 94, count: 587 },
    { day: 'Tuesday', percentage: 91, count: 569 },
    { day: 'Wednesday', percentage: 95, count: 594 },
    { day: 'Thursday', percentage: 92, count: 575 },
    { day: 'Friday', percentage: 88, count: 550 },
  ],
  lastWeek: [
    { day: 'Monday', percentage: 89, count: 556 },
    { day: 'Tuesday', percentage: 87, count: 544 },
    { day: 'Wednesday', percentage: 91, count: 569 },
    { day: 'Thursday', percentage: 88, count: 550 },
    { day: 'Friday', percentage: 85, count: 531 },
  ],
  thisMonth: [
    { day: 'Week 1', percentage: 89, count: 2800 },
    { day: 'Week 2', percentage: 91, count: 2850 },
    { day: 'Week 3', percentage: 88, count: 2775 },
    { day: 'Week 4', percentage: 92, count: 2900 },
  ],
};

export const mockMonthlyFeeData = {
  current: [
    { month: 'January', collected: 450000, target: 500000 },
    { month: 'February', collected: 480000, target: 500000 },
    { month: 'March', collected: 420000, target: 500000 },
    { month: 'April', collected: 500000, target: 500000 },
    { month: 'May', collected: 470000, target: 500000 },
    { month: 'June', collected: 430000, target: 500000 },
  ],
};

export const mockStudentGrowth = [
  { month: 'January', students: 580 },
  { month: 'February', students: 595 },
  { month: 'March', students: 612 },
  { month: 'April', students: 628 },
  { month: 'May', students: 645 },
  { month: 'June', students: 658 },
];

export const mockTeacherPerformance = [
  { name: 'Dr. Rajiv Kumar', rating: 4.8, studentsCount: 75 },
  { name: 'Ms. Priya Sharma', rating: 4.6, studentsCount: 68 },
  { name: 'Mr. Sanjay Desai', rating: 4.9, studentsCount: 70 },
  { name: 'Ms. Neha Patel', rating: 4.7, studentsCount: 85 },
];

export const mockRevenueData = [
  { month: 'January', revenue: 450000, previousYear: 420000 },
  { month: 'February', revenue: 480000, previousYear: 460000 },
  { month: 'March', revenue: 420000, previousYear: 410000 },
  { month: 'April', revenue: 500000, previousYear: 480000 },
  { month: 'May', revenue: 470000, previousYear: 450000 },
  { month: 'June', revenue: 430000, previousYear: 400000 },
];

export const mockFeeCollectionExpenses = [
  { month: 'Jan', feeCollection: 2000, expenses: 800 },
  { month: 'Feb', feeCollection: 2200, expenses: 900 },
  { month: 'Mar', feeCollection: 1800, expenses: 750 },
  { month: 'Apr', feeCollection: 2400, expenses: 1000 },
  { month: 'May', feeCollection: 2100, expenses: 950 },
  { month: 'Jun', feeCollection: 2300, expenses: 1100 },
  { month: 'Jul', feeCollection: 2500, expenses: 1200 },
  { month: 'Aug', feeCollection: 2200, expenses: 1050 },
  { month: 'Sep', feeCollection: 2000, expenses: 900 },
  { month: 'Oct', feeCollection: 2400, expenses: 1000 },
  { month: 'Nov', feeCollection: 2100, expenses: 950 },
  { month: 'Dec', feeCollection: 2600, expenses: 1100 },
];

export const mockIncomeBreakdown = [
  { name: 'Donation', value: 450000, color: '#10B981' },
  { name: 'Rent', value: 280000, color: '#F59E0B' },
  { name: 'Miscellaneous', value: 159234, color: '#EC4899' },
  { name: 'Book Sale', value: 120000, color: '#8B5CF6' },
  { name: 'Uniform Sale', value: 90000, color: '#6B7280' },
];

export const mockExpenseBreakdown = [
  { name: 'Telephone Bill', value: 45000, color: '#8B5CF6' },
  { name: 'Flower', value: 35000, color: '#F59E0B' },
  { name: 'Electricity Bill', value: 120000, color: '#EF4444' },
  { name: 'Stationery', value: 67000, color: '#10B981' },
  { name: 'Miscellaneous', value: 48000, color: '#9CA3AF' },
];

// Additional Charts Data
export const mockStudentPerformance = [
  { range: '90-100', students: 45, color: '#10B981' },
  { range: '80-89', students: 85, color: '#3B82F6' },
  { range: '70-79', students: 120, color: '#F59E0B' },
  { range: '60-69', students: 95, color: '#EF4444' },
  { range: 'Below 60', students: 30, color: '#8B5CF6' },
];

export const mockClassAttendance = [
  { class: 'Grade 7-A', attendance: 94 },
  { class: 'Grade 7-B', attendance: 89 },
  { class: 'Grade 8-A', attendance: 91 },
  { class: 'Grade 8-B', attendance: 87 },
  { class: 'Grade 9-A', attendance: 93 },
  { class: 'Grade 9-B', attendance: 88 },
  { class: 'Grade 10-A', attendance: 95 },
  { class: 'Grade 10-B', attendance: 90 },
];

export const mockFeeStatusSummary = [
  { status: 'Paid', count: 580, color: '#10B981' },
  { status: 'Pending', count: 78, color: '#F59E0B' },
];

export const mockEnrollmentTrend = [
  { month: 'Jan', enrollment: 520 },
  { month: 'Feb', enrollment: 545 },
  { month: 'Mar', enrollment: 568 },
  { month: 'Apr', enrollment: 592 },
  { month: 'May', enrollment: 615 },
  { month: 'Jun', enrollment: 658 },
];

export const mockSubjectPerformance = [
  { subject: 'Mathematics', average: 82 },
  { subject: 'English', average: 78 },
  { subject: 'Science', average: 85 },
  { subject: 'Social Studies', average: 80 },
  { subject: 'Hindi', average: 88 },
  { subject: 'Computer Science', average: 87 },
];

export const mockTeacherWorkload = [
  { name: 'Dr. Rajiv Kumar', classes: 6, students: 180 },
  { name: 'Ms. Priya Sharma', classes: 5, students: 155 },
  { name: 'Mr. Sanjay Desai', classes: 4, students: 120 },
  { name: 'Ms. Neha Patel', classes: 7, students: 210 },
];

export const mockMonthlyExpenseTrend = [
  { month: 'Jan', expenses: 450 },
  { month: 'Feb', expenses: 520 },
  { month: 'Mar', expenses: 480 },
  { month: 'Apr', expenses: 590 },
  { month: 'May', expenses: 510 },
  { month: 'Jun', expenses: 620 },
];

