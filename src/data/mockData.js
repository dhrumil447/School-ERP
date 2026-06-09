// ─── MOCK DATA — School ERP ────────────────────────────────────────────────

// ── STUDENTS ──────────────────────────────────────────────────────────────────
export const mockStudents = [
  { id: 'S001', name: 'Aarav Sharma', rollNo: '2024001', class: '10', section: 'A', gender: 'Male', dob: '2009-03-15', phone: '9876543210', email: 'aarav@school.edu', parentName: 'Rajesh Sharma', parentPhone: '9876543211', address: '12, MG Road, Mumbai', feeStatus: 'paid', admissionDate: '2020-06-01', bloodGroup: 'O+', photo: null, status: 'Active', attendance: 94 },
  { id: 'S002', name: 'Priya Patel', rollNo: '2024002', class: '10', section: 'A', gender: 'Female', dob: '2009-07-22', phone: '9876543212', email: 'priya@school.edu', parentName: 'Suresh Patel', parentPhone: '9876543213', address: '45, Park Street, Ahmedabad', feeStatus: 'paid', admissionDate: '2020-06-01', bloodGroup: 'A+', photo: null, status: 'Active', attendance: 88 },
  { id: 'S003', name: 'Rohan Mehta', rollNo: '2024003', class: '10', section: 'B', gender: 'Male', dob: '2009-11-05', phone: '9876543214', email: 'rohan@school.edu', parentName: 'Amit Mehta', parentPhone: '9876543215', address: '78, Lake View, Pune', feeStatus: 'pending', admissionDate: '2021-06-01', bloodGroup: 'B+', photo: null, status: 'Active', attendance: 76 },
  { id: 'S004', name: 'Sneha Iyer', rollNo: '2024004', class: '9', section: 'A', gender: 'Female', dob: '2010-02-18', phone: '9876543216', email: 'sneha@school.edu', parentName: 'Ravi Iyer', parentPhone: '9876543217', address: '23, Gandhi Nagar, Chennai', feeStatus: 'paid', admissionDate: '2021-06-01', bloodGroup: 'AB+', photo: null, status: 'Active', attendance: 97 },
  { id: 'S005', name: 'Arjun Singh', rollNo: '2024005', class: '9', section: 'B', gender: 'Male', dob: '2010-05-30', phone: '9876543218', email: 'arjun@school.edu', parentName: 'Vikram Singh', parentPhone: '9876543219', address: '56, Civil Lines, Delhi', feeStatus: 'partial', admissionDate: '2022-06-01', bloodGroup: 'O-', photo: null, status: 'Active', attendance: 82 },
  { id: 'S006', name: 'Kavya Nair', rollNo: '2024006', class: '8', section: 'A', gender: 'Female', dob: '2011-08-12', phone: '9876543220', email: 'kavya@school.edu', parentName: 'Mohan Nair', parentPhone: '9876543221', address: '89, Residency Road, Bangalore', feeStatus: 'paid', admissionDate: '2022-06-01', bloodGroup: 'A-', photo: null, status: 'Active', attendance: 91 },
  { id: 'S007', name: 'Vivek Gupta', rollNo: '2024007', class: '8', section: 'B', gender: 'Male', dob: '2011-01-25', phone: '9876543222', email: 'vivek@school.edu', parentName: 'Dinesh Gupta', parentPhone: '9876543223', address: '34, Mall Road, Jaipur', feeStatus: 'pending', admissionDate: '2023-06-01', bloodGroup: 'B-', photo: null, status: 'Active', attendance: 68 },
  { id: 'S008', name: 'Ananya Reddy', rollNo: '2024008', class: '7', section: 'A', gender: 'Female', dob: '2012-04-08', phone: '9876543224', email: 'ananya@school.edu', parentName: 'Srinivas Reddy', parentPhone: '9876543225', address: '67, Banjara Hills, Hyderabad', feeStatus: 'paid', admissionDate: '2023-06-01', bloodGroup: 'O+', photo: null, status: 'Active', attendance: 93 },
  { id: 'S009', name: 'Rahul Joshi', rollNo: '2024009', class: '7', section: 'B', gender: 'Male', dob: '2012-09-14', phone: '9876543226', email: 'rahul@school.edu', parentName: 'Prakash Joshi', parentPhone: '9876543227', address: '12, Shivaji Nagar, Nagpur', feeStatus: 'paid', admissionDate: '2023-06-01', bloodGroup: 'A+', photo: null, status: 'Active', attendance: 85 },
  { id: 'S010', name: 'Meera Krishnan', rollNo: '2024010', class: '6', section: 'A', gender: 'Female', dob: '2013-12-03', phone: '9876543228', email: 'meera@school.edu', parentName: 'Gopal Krishnan', parentPhone: '9876543229', address: '45, Anna Salai, Chennai', feeStatus: 'pending', admissionDate: '2024-06-01', bloodGroup: 'AB-', photo: null, status: 'Active', attendance: 79 },
  { id: 'S011', name: 'Karan Malhotra', rollNo: '2024011', class: '6', section: 'B', gender: 'Male', dob: '2013-06-27', phone: '9876543230', email: 'karan@school.edu', parentName: 'Rajiv Malhotra', parentPhone: '9876543231', address: '78, Sector 15, Chandigarh', feeStatus: 'paid', admissionDate: '2024-06-01', bloodGroup: 'B+', photo: null, status: 'Active', attendance: 90 },
  { id: 'S012', name: 'Pooja Verma', rollNo: '2024012', class: '5', section: 'A', gender: 'Female', dob: '2014-02-14', phone: '9876543232', email: 'pooja@school.edu', parentName: 'Sunil Verma', parentPhone: '9876543233', address: '23, Hazratganj, Lucknow', feeStatus: 'paid', admissionDate: '2024-06-01', bloodGroup: 'O+', photo: null, status: 'Active', attendance: 96 },
];

// ── TEACHERS ─────────────────────────────────────────────────────────────────
export const mockTeachers = [
  { id: 'T001', name: 'Dr. Sanjay Kumar', employeeId: 'EMP001', subject: 'Mathematics', classes: ['10A', '10B', '9A'], gender: 'Male', dob: '1980-05-15', phone: '9811223344', email: 'sanjay@school.edu', qualification: 'M.Sc, B.Ed', experience: 15, joinDate: '2009-07-01', address: '12, Teacher Colony', salary: 65000, status: 'Active', attendance: 97 },
  { id: 'T002', name: 'Mrs. Anita Sharma', employeeId: 'EMP002', subject: 'English', classes: ['10A', '9A', '8A'], gender: 'Female', dob: '1985-08-22', phone: '9811223345', email: 'anita@school.edu', qualification: 'M.A English, B.Ed', experience: 10, joinDate: '2014-07-01', address: '34, Green Park', salary: 55000, status: 'Active', attendance: 99 },
  { id: 'T003', name: 'Mr. Ramesh Patel', employeeId: 'EMP003', subject: 'Science', classes: ['9A', '9B', '8B'], gender: 'Male', dob: '1978-11-10', phone: '9811223346', email: 'ramesh@school.edu', qualification: 'M.Sc Physics, B.Ed', experience: 18, joinDate: '2006-07-01', address: '56, Shastri Nagar', salary: 70000, status: 'Active', attendance: 95 },
  { id: 'T004', name: 'Ms. Preethi Nair', employeeId: 'EMP004', subject: 'Social Studies', classes: ['8A', '8B', '7A'], gender: 'Female', dob: '1990-03-28', phone: '9811223347', email: 'preethi@school.edu', qualification: 'M.A History, B.Ed', experience: 7, joinDate: '2017-07-01', address: '78, Rose Garden', salary: 48000, status: 'Active', attendance: 98 },
  { id: 'T005', name: 'Mr. Vijay Krishnan', employeeId: 'EMP005', subject: 'Hindi', classes: ['7A', '7B', '6A'], gender: 'Male', dob: '1983-07-04', phone: '9811223348', email: 'vijay@school.edu', qualification: 'M.A Hindi, B.Ed', experience: 12, joinDate: '2012-07-01', address: '90, Lal Bagh', salary: 52000, status: 'Active', attendance: 96 },
  { id: 'T006', name: 'Mrs. Deepa Menon', employeeId: 'EMP006', subject: 'Computer Science', classes: ['10A', '10B', '9B'], gender: 'Female', dob: '1988-12-15', phone: '9811223349', email: 'deepa@school.edu', qualification: 'MCA, B.Ed', experience: 8, joinDate: '2016-07-01', address: '23, IT Park Road', salary: 58000, status: 'Active', attendance: 100 },
  { id: 'T007', name: 'Mr. Suresh Yadav', employeeId: 'EMP007', subject: 'Physical Education', classes: ['All Classes'], gender: 'Male', dob: '1975-09-20', phone: '9811223350', email: 'suresh@school.edu', qualification: 'B.P.Ed, M.P.Ed', experience: 22, joinDate: '2002-07-01', address: '45, Sports Colony', salary: 45000, status: 'Active', attendance: 94 },
  { id: 'T008', name: 'Ms. Kavitha Reddy', employeeId: 'EMP008', subject: 'Art & Craft', classes: ['6A', '6B', '5A'], gender: 'Female', dob: '1992-04-11', phone: '9811223351', email: 'kavitha@school.edu', qualification: 'M.F.A, B.Ed', experience: 5, joinDate: '2019-07-01', address: '67, Artist Lane', salary: 42000, status: 'Active', attendance: 97 },
];

// ── ACTIVITIES ────────────────────────────────────────────────────────────────
export const mockActivities = [
  { id: 1, type: 'Student Added', description: 'New student Arjun Singh enrolled in Class 9B', timestamp: '2 min ago', user: 'Admin' },
  { id: 2, type: 'Fee Payment', description: 'Fee payment of ₹15,000 received from Aarav Sharma (S001)', timestamp: '15 min ago', user: 'Cashier' },
  { id: 3, type: 'Attendance Updated', description: 'Attendance marked for Class 10A — 38/40 present', timestamp: '1 hour ago', user: 'Mrs. Anita Sharma' },
  { id: 4, type: 'Notice Published', description: 'Annual Day celebration notice published for all students', timestamp: '2 hours ago', user: 'Principal' },
  { id: 5, type: 'Report Generated', description: 'Monthly fee collection report generated for May 2025', timestamp: '3 hours ago', user: 'Admin' },
  { id: 6, type: 'Student Added', description: 'New student Pooja Verma enrolled in Class 5A', timestamp: '4 hours ago', user: 'Admin' },
  { id: 7, type: 'Fee Payment', description: 'Fee payment of ₹18,000 received from Kavya Nair (S006)', timestamp: '5 hours ago', user: 'Cashier' },
  { id: 8, type: 'Attendance Updated', description: 'Attendance marked for Class 9B — 35/38 present', timestamp: '6 hours ago', user: 'Mr. Ramesh Patel' },
];

// ── EVENTS ────────────────────────────────────────────────────────────────────
export const mockEvents = [
  { id: 1, name: 'Annual Sports Day', date: '2025-07-15', time: '09:00 AM', location: 'School Ground', category: 'Sports', description: 'Annual inter-house sports competition', organizer: 'Mr. Suresh Yadav' },
  { id: 2, name: 'Parent-Teacher Meeting', date: '2025-07-20', time: '10:00 AM', location: 'School Hall', category: 'Academic', description: 'Quarterly PTM for all classes', organizer: 'Principal' },
  { id: 3, name: 'Science Exhibition', date: '2025-07-28', time: '11:00 AM', location: 'Science Lab', category: 'Academic', description: 'Annual science project exhibition', organizer: 'Mr. Ramesh Patel' },
  { id: 4, name: 'Independence Day Celebration', date: '2025-08-15', time: '08:00 AM', location: 'School Ground', category: 'Cultural', description: 'Flag hoisting and cultural program', organizer: 'Admin' },
  { id: 5, name: 'Annual Day Function', date: '2025-09-05', time: '05:00 PM', location: 'Auditorium', category: 'Cultural', description: 'School annual cultural night', organizer: 'Ms. Kavitha Reddy' },
  { id: 6, name: 'Mid-Term Examinations', date: '2025-08-01', time: '09:00 AM', location: 'Classrooms', category: 'Exam', description: 'Mid-term examinations for all classes', organizer: 'Principal' },
];

// ── NOTICES ───────────────────────────────────────────────────────────────────
export const mockNotices = [
  { id: 1, title: 'Annual Day Function — Save the Date!', content: 'The Annual Day Function will be held on 5th September 2025 at the school auditorium. All students and parents are invited.', date: '2025-06-05', author: 'Principal', category: 'Cultural', important: true, targetAudience: 'All' },
  { id: 2, title: 'Mid-Term Exam Schedule Released', content: 'The mid-term examination schedule for all classes has been released. Students are requested to check the timetable section.', date: '2025-06-04', author: 'Exam Cell', category: 'Exam', important: true, targetAudience: 'Students' },
  { id: 3, title: 'Fee Payment Reminder', content: 'Parents are reminded that the last date for fee payment for Term 2 is 15th June 2025. Late fee will be charged after the due date.', date: '2025-06-03', author: 'Accounts', category: 'Finance', important: false, targetAudience: 'Parents' },
  { id: 4, title: 'Library Book Return Notice', content: 'All students who have borrowed library books are requested to return them by 10th June 2025.', date: '2025-06-02', author: 'Librarian', category: 'General', important: false, targetAudience: 'Students' },
  { id: 5, title: 'Holiday Notice — Eid-ul-Adha', content: 'The school will remain closed on 7th June 2025 on account of Eid-ul-Adha. Classes will resume on 9th June 2025.', date: '2025-06-01', author: 'Admin', category: 'Holiday', important: false, targetAudience: 'All' },
  { id: 6, title: 'Parent-Teacher Meeting — 20th July', content: 'The quarterly PTM will be held on 20th July 2025. Parents of all classes are requested to attend.', date: '2025-05-30', author: 'Principal', category: 'Academic', important: false, targetAudience: 'Parents' },
];

// ── ATTENDANCE DATA ────────────────────────────────────────────────────────────
export const mockWeeklyAttendance = {
  thisWeek: [
    { day: 'Mon', count: 4720, absent: 280 },
    { day: 'Tue', count: 4650, absent: 350 },
    { day: 'Wed', count: 4780, absent: 220 },
    { day: 'Thu', count: 4690, absent: 310 },
    { day: 'Fri', count: 4550, absent: 450 },
  ],
  lastWeek: [
    { day: 'Mon', count: 4680, absent: 320 },
    { day: 'Tue', count: 4710, absent: 290 },
    { day: 'Wed', count: 4600, absent: 400 },
    { day: 'Thu', count: 4730, absent: 270 },
    { day: 'Fri', count: 4590, absent: 410 },
  ],
};

export const mockClassAttendance = [
  { class: 'Class 5A', attendance: 96 },
  { class: 'Class 5B', attendance: 93 },
  { class: 'Class 6A', attendance: 91 },
  { class: 'Class 6B', attendance: 88 },
  { class: 'Class 7A', attendance: 94 },
  { class: 'Class 7B', attendance: 87 },
  { class: 'Class 8A', attendance: 92 },
  { class: 'Class 8B', attendance: 85 },
  { class: 'Class 9A', attendance: 89 },
  { class: 'Class 9B', attendance: 83 },
  { class: 'Class 10A', attendance: 95 },
  { class: 'Class 10B', attendance: 90 },
];

export const mockMonthlyAttendance = [
  { month: 'Jan', present: 4750, absent: 250 },
  { month: 'Feb', present: 4680, absent: 320 },
  { month: 'Mar', present: 4720, absent: 280 },
  { month: 'Apr', present: 4600, absent: 400 },
  { month: 'May', present: 4790, absent: 210 },
  { month: 'Jun', present: 4710, absent: 290 },
];

// ── FEE DATA ──────────────────────────────────────────────────────────────────
export const mockMonthlyFeeData = {
  current: [
    { month: 'Jan', collected: 420000, target: 500000 },
    { month: 'Feb', collected: 480000, target: 500000 },
    { month: 'Mar', collected: 510000, target: 500000 },
    { month: 'Apr', collected: 390000, target: 500000 },
    { month: 'May', collected: 465000, target: 500000 },
    { month: 'Jun', collected: 495000, target: 500000 },
  ],
};

export const mockFeeCollectionExpenses = [
  { month: 'Jan', feeCollection: 420, expenses: 280 },
  { month: 'Feb', feeCollection: 480, expenses: 310 },
  { month: 'Mar', feeCollection: 510, expenses: 290 },
  { month: 'Apr', feeCollection: 390, expenses: 260 },
  { month: 'May', feeCollection: 465, expenses: 305 },
  { month: 'Jun', feeCollection: 495, expenses: 320 },
];

export const mockFeeTransactions = [
  { id: 'TXN001', studentId: 'S001', studentName: 'Aarav Sharma', class: '10A', amount: 15000, date: '2025-06-01', method: 'Online', status: 'Paid', receiptNo: 'REC2025001', term: 'Term 2' },
  { id: 'TXN002', studentId: 'S002', studentName: 'Priya Patel', class: '10A', amount: 15000, date: '2025-06-02', method: 'Cash', status: 'Paid', receiptNo: 'REC2025002', term: 'Term 2' },
  { id: 'TXN003', studentId: 'S004', studentName: 'Sneha Iyer', class: '9A', amount: 13500, date: '2025-06-03', method: 'UPI', status: 'Paid', receiptNo: 'REC2025003', term: 'Term 2' },
  { id: 'TXN004', studentId: 'S006', studentName: 'Kavya Nair', class: '8A', amount: 12000, date: '2025-06-04', method: 'Online', status: 'Paid', receiptNo: 'REC2025004', term: 'Term 2' },
  { id: 'TXN005', studentId: 'S008', studentName: 'Ananya Reddy', class: '7A', amount: 11000, date: '2025-06-05', method: 'Cheque', status: 'Paid', receiptNo: 'REC2025005', term: 'Term 2' },
  { id: 'TXN006', studentId: 'S003', studentName: 'Rohan Mehta', class: '10B', amount: 15000, date: null, method: '-', status: 'Pending', receiptNo: '-', term: 'Term 2' },
  { id: 'TXN007', studentId: 'S007', studentName: 'Vivek Gupta', class: '8B', amount: 12000, date: null, method: '-', status: 'Pending', receiptNo: '-', term: 'Term 2' },
  { id: 'TXN008', studentId: 'S010', studentName: 'Meera Krishnan', class: '6A', amount: 10000, date: null, method: '-', status: 'Pending', receiptNo: '-', term: 'Term 2' },
  { id: 'TXN009', studentId: 'S005', studentName: 'Arjun Singh', class: '9B', amount: 7500, date: '2025-05-15', method: 'Cash', status: 'Partial', receiptNo: 'REC2025006', term: 'Term 2' },
];

export const mockFeeStatusSummary = [
  { status: 'Paid', count: 320, color: '#22c55e' },
  { status: 'Pending', count: 95, color: '#ef4444' },
  { status: 'Partial', count: 45, color: '#f59e0b' },
  { status: 'Waived', count: 12, color: '#06b6d4' },
];

export const mockIncomeBreakdown = [
  { name: 'Tuition Fee', value: 380000, color: '#4f46e5' },
  { name: 'Transport Fee', value: 52000, color: '#06b6d4' },
  { name: 'Lab Fee', value: 28000, color: '#8b5cf6' },
  { name: 'Sports Fee', value: 18000, color: '#22c55e' },
  { name: 'Library Fee', value: 12000, color: '#f59e0b' },
  { name: 'Misc', value: 5000, color: '#ec4899' },
];

export const mockExpenseBreakdown = [
  { name: 'Salaries', value: 210000, color: '#4f46e5' },
  { name: 'Infrastructure', value: 45000, color: '#06b6d4' },
  { name: 'Utilities', value: 22000, color: '#f59e0b' },
  { name: 'Supplies', value: 18000, color: '#22c55e' },
  { name: 'Events', value: 15000, color: '#ec4899' },
  { name: 'Misc', value: 10000, color: '#ef4444' },
];

export const mockMonthlyExpenseTrend = [
  { month: 'Jan', expenses: 280 },
  { month: 'Feb', expenses: 310 },
  { month: 'Mar', expenses: 290 },
  { month: 'Apr', expenses: 260 },
  { month: 'May', expenses: 305 },
  { month: 'Jun', expenses: 320 },
  { month: 'Jul', expenses: 275 },
  { month: 'Aug', expenses: 295 },
];

// ── RESULTS / MARKS ───────────────────────────────────────────────────────────
export const mockResults = [
  { id: 'R001', studentId: 'S001', studentName: 'Aarav Sharma', class: '10A', term: 'Term 1', subjects: { Math: 88, English: 92, Science: 85, Hindi: 78, SST: 80, CS: 95 }, total: 518, grade: 'A', percentage: 86.3, rank: 3, status: 'Published' },
  { id: 'R002', studentId: 'S002', studentName: 'Priya Patel', class: '10A', term: 'Term 1', subjects: { Math: 95, English: 88, Science: 91, Hindi: 82, SST: 88, CS: 90 }, total: 534, grade: 'A+', percentage: 89, rank: 1, status: 'Published' },
  { id: 'R003', studentId: 'S003', studentName: 'Rohan Mehta', class: '10B', term: 'Term 1', subjects: { Math: 72, English: 78, Science: 65, Hindi: 70, SST: 68, CS: 80 }, total: 433, grade: 'B', percentage: 72.2, rank: 8, status: 'Published' },
  { id: 'R004', studentId: 'S004', studentName: 'Sneha Iyer', class: '9A', term: 'Term 1', subjects: { Math: 91, English: 86, Science: 93, Hindi: 75, SST: 84, CS: 88 }, total: 517, grade: 'A', percentage: 86.2, rank: 2, status: 'Published' },
  { id: 'R005', studentId: 'S005', studentName: 'Arjun Singh', class: '9B', term: 'Term 1', subjects: { Math: 68, English: 72, Science: 75, Hindi: 65, SST: 70, CS: 78 }, total: 428, grade: 'B', percentage: 71.3, rank: 12, status: 'Published' },
];

export const mockStudentPerformance = [
  { range: '90–100%', students: 45 },
  { range: '80–90%', students: 110 },
  { range: '70–80%', students: 145 },
  { range: '60–70%', students: 98 },
  { range: 'Below 60%', students: 34 },
];

export const mockSubjectPerformance = [
  { subject: 'Mathematics', average: 74 },
  { subject: 'English', average: 82 },
  { subject: 'Science', average: 79 },
  { subject: 'Hindi', average: 76 },
  { subject: 'Social Studies', average: 80 },
  { subject: 'Computer Science', average: 88 },
  { subject: 'Physical Education', average: 90 },
];

// ── TIMETABLE ─────────────────────────────────────────────────────────────────
export const mockTimetable = {
  '10A': {
    Monday:    ['Mathematics', 'English', 'Science', 'Hindi', 'Computer Science', 'Physical Education', 'Mathematics'],
    Tuesday:   ['Science', 'Mathematics', 'English', 'Social Studies', 'Hindi', 'Art', 'Science'],
    Wednesday: ['English', 'Science', 'Mathematics', 'Computer Science', 'Social Studies', 'Hindi', 'English'],
    Thursday:  ['Hindi', 'Computer Science', 'Social Studies', 'Mathematics', 'English', 'Science', 'Hindi'],
    Friday:    ['Computer Science', 'Social Studies', 'Hindi', 'Science', 'Mathematics', 'English', 'Art'],
  },
  '9A': {
    Monday:    ['Science', 'Mathematics', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Science'],
    Tuesday:   ['Mathematics', 'Science', 'Hindi', 'English', 'Computer Science', 'Social Studies', 'Mathematics'],
    Wednesday: ['Hindi', 'English', 'Social Studies', 'Science', 'Mathematics', 'Hindi', 'Physical Education'],
    Thursday:  ['English', 'Social Studies', 'Mathematics', 'Computer Science', 'Science', 'English', 'Social Studies'],
    Friday:    ['Social Studies', 'Hindi', 'Computer Science', 'Mathematics', 'English', 'Science', 'Computer Science'],
  },
};

export const mockPeriods = ['8:00–8:45', '8:45–9:30', '9:30–10:15', '10:30–11:15', '11:15–12:00', '12:45–1:30', '1:30–2:15'];
export const mockDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const mockSubjectColors = {
  Mathematics: '#4f46e5',
  Math: '#4f46e5',
  English: '#22c55e',
  Science: '#06b6d4',
  Hindi: '#f59e0b',
  'Social Studies': '#8b5cf6',
  SST: '#8b5cf6',
  'Computer Science': '#ec4899',
  CS: '#ec4899',
  'Physical Education': '#ef4444',
  PE: '#ef4444',
  Art: '#84cc16',
  'Art & Craft': '#84cc16',
  Default: '#94a3b8',
};

// ── LIBRARY ───────────────────────────────────────────────────────────────────
export const mockBooks = [
  { id: 'B001', title: 'Mathematics Class 10', author: 'R.D. Sharma', isbn: '978-1234567890', category: 'Textbook', copies: 20, available: 15, price: 350, addedDate: '2020-01-01' },
  { id: 'B002', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', isbn: '978-0234567891', category: 'Biography', copies: 5, available: 3, price: 299, addedDate: '2021-03-15' },
  { id: 'B003', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '978-0345543345', category: 'Fiction', copies: 8, available: 6, price: 499, addedDate: '2020-06-01' },
  { id: 'B004', title: 'NCERT Science Class 9', author: 'NCERT', isbn: '978-3234567892', category: 'Textbook', copies: 25, available: 18, price: 280, addedDate: '2020-01-01' },
  { id: 'B005', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-4234567893', category: 'Fiction', copies: 6, available: 4, price: 350, addedDate: '2022-01-10' },
  { id: 'B006', title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-5234567894', category: 'Science', copies: 4, available: 2, price: 599, addedDate: '2021-09-01' },
  { id: 'B007', title: 'India After Gandhi', author: 'Ramachandra Guha', isbn: '978-6234567895', category: 'History', copies: 3, available: 3, price: 899, addedDate: '2022-04-01' },
  { id: 'B008', title: 'English Grammar in Use', author: 'Raymond Murphy', isbn: '978-7234567896', category: 'Reference', copies: 10, available: 7, price: 450, addedDate: '2020-01-01' },
];

export const mockIssuedBooks = [
  { id: 'ISS001', bookId: 'B002', bookTitle: 'Wings of Fire', studentId: 'S001', studentName: 'Aarav Sharma', issueDate: '2025-05-20', dueDate: '2025-06-03', returnDate: null, fine: 0, status: 'Overdue' },
  { id: 'ISS002', bookId: 'B003', bookTitle: 'Harry Potter', studentId: 'S002', studentName: 'Priya Patel', issueDate: '2025-05-25', dueDate: '2025-06-08', returnDate: null, fine: 0, status: 'Issued' },
  { id: 'ISS003', bookId: 'B005', bookTitle: 'The Alchemist', studentId: 'S004', studentName: 'Sneha Iyer', issueDate: '2025-05-10', dueDate: '2025-05-24', returnDate: '2025-05-22', fine: 0, status: 'Returned' },
  { id: 'ISS004', bookId: 'B006', bookTitle: 'A Brief History of Time', studentId: 'S009', studentName: 'Rahul Joshi', issueDate: '2025-05-15', dueDate: '2025-05-29', returnDate: null, fine: 20, status: 'Overdue' },
];

// ── TRANSPORT ─────────────────────────────────────────────────────────────────
export const mockBusRoutes = [
  { id: 'RT001', routeNo: 'R-01', routeName: 'North Zone', stops: ['City Center', 'Park Street', 'Mall Road', 'Green Colony', 'School'], driver: 'Ramu Prasad', vehicle: 'MH-12-AB-1234', capacity: 40, students: 35, timing: '7:30 AM' },
  { id: 'RT002', routeNo: 'R-02', routeName: 'South Zone', stops: ['Railway Station', 'Civil Lines', 'Sector 5', 'Lake View', 'School'], driver: 'Shyam Singh', vehicle: 'MH-12-CD-5678', capacity: 40, students: 38, timing: '7:45 AM' },
  { id: 'RT003', routeNo: 'R-03', routeName: 'East Zone', stops: ['Airport Road', 'IT Park', 'Banjara Hills', 'Jubilee Hills', 'School'], driver: 'Gopal Kumar', vehicle: 'MH-12-EF-9012', capacity: 45, students: 42, timing: '7:15 AM' },
  { id: 'RT004', routeNo: 'R-04', routeName: 'West Zone', stops: ['Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'School'], driver: 'Ramesh Yadav', vehicle: 'MH-12-GH-3456', capacity: 40, students: 30, timing: '7:30 AM' },
];

export const mockDrivers = [
  { id: 'DR001', name: 'Ramu Prasad', license: 'MH-123456', phone: '9922334455', experience: 10, route: 'R-01', status: 'Active' },
  { id: 'DR002', name: 'Shyam Singh', license: 'MH-234567', phone: '9922334456', experience: 8, route: 'R-02', status: 'Active' },
  { id: 'DR003', name: 'Gopal Kumar', license: 'MH-345678', phone: '9922334457', experience: 12, route: 'R-03', status: 'Active' },
  { id: 'DR004', name: 'Ramesh Yadav', license: 'MH-456789', phone: '9922334458', experience: 6, route: 'R-04', status: 'Active' },
];

export const mockVehicles = [
  { id: 'V001', regNo: 'MH-12-AB-1234', model: 'Tata Starbus', capacity: 40, fuelType: 'Diesel', lastService: '2025-04-15', nextService: '2025-07-15', status: 'Good', route: 'R-01' },
  { id: 'V002', regNo: 'MH-12-CD-5678', model: 'Ashok Leyland', capacity: 40, fuelType: 'Diesel', lastService: '2025-05-01', nextService: '2025-08-01', status: 'Good', route: 'R-02' },
  { id: 'V003', regNo: 'MH-12-EF-9012', model: 'Tata Starbus', capacity: 45, fuelType: 'CNG', lastService: '2025-03-20', nextService: '2025-06-20', status: 'Service Due', route: 'R-03' },
  { id: 'V004', regNo: 'MH-12-GH-3456', model: 'Force Traveller', capacity: 40, fuelType: 'Diesel', lastService: '2025-05-10', nextService: '2025-08-10', status: 'Good', route: 'R-04' },
];

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
export const mockEnrollmentTrend = [
  { month: 'Jan', enrollment: 4420, newAdmissions: 12 },
  { month: 'Feb', enrollment: 4455, newAdmissions: 35 },
  { month: 'Mar', enrollment: 4510, newAdmissions: 55 },
  { month: 'Apr', enrollment: 4580, newAdmissions: 70 },
  { month: 'May', enrollment: 4680, newAdmissions: 100 },
  { month: 'Jun', enrollment: 4820, newAdmissions: 140 },
  { month: 'Jul', enrollment: 4950, newAdmissions: 130 },
  { month: 'Aug', enrollment: 5020, newAdmissions: 70 },
];

export const mockRevenueAnalytics = [
  { month: 'Jan', revenue: 420000, expenses: 280000, profit: 140000 },
  { month: 'Feb', revenue: 480000, expenses: 310000, profit: 170000 },
  { month: 'Mar', revenue: 510000, expenses: 290000, profit: 220000 },
  { month: 'Apr', revenue: 390000, expenses: 260000, profit: 130000 },
  { month: 'May', revenue: 465000, expenses: 305000, profit: 160000 },
  { month: 'Jun', revenue: 495000, expenses: 320000, profit: 175000 },
];

export const mockTeacherWorkload = [
  { name: 'Dr. Sanjay', classes: 3, students: 120 },
  { name: 'Mrs. Anita', classes: 3, students: 115 },
  { name: 'Mr. Ramesh', classes: 3, students: 112 },
  { name: 'Ms. Preethi', classes: 3, students: 108 },
  { name: 'Mr. Vijay', classes: 3, students: 105 },
];

export const mockTeacherPerformance = [
  { name: 'Dr. Sanjay Kumar', rating: 4.8, studentAvg: 82, attendance: 97 },
  { name: 'Mrs. Anita Sharma', rating: 4.9, studentAvg: 85, attendance: 99 },
  { name: 'Mr. Ramesh Patel', rating: 4.7, studentAvg: 79, attendance: 95 },
  { name: 'Ms. Preethi Nair', rating: 4.6, studentAvg: 80, attendance: 98 },
  { name: 'Mr. Vijay Krishnan', rating: 4.5, studentAvg: 76, attendance: 96 },
  { name: 'Mrs. Deepa Menon', rating: 4.8, studentAvg: 88, attendance: 100 },
];

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
export const mockNotifications = [
  { id: 1, title: 'New Fee Payment', message: 'Aarav Sharma paid ₹15,000 for Term 2', time: '2 min ago', read: false, type: 'payment' },
  { id: 2, title: 'Attendance Alert', message: 'Class 10B has 78% attendance today — below threshold', time: '1 hour ago', read: false, type: 'alert' },
  { id: 3, title: 'New Admission', message: 'Pooja Verma has been admitted to Class 5A', time: '3 hours ago', read: true, type: 'admission' },
  { id: 4, title: 'Library Overdue', message: '2 books are overdue and need to be returned', time: '1 day ago', read: true, type: 'library' },
  { id: 5, title: 'Bus Service Alert', message: 'Route R-03 vehicle is due for service', time: '2 days ago', read: true, type: 'transport' },
];

// ── STUDENT DASHBOARD DATA ────────────────────────────────────────────────────
export const mockStudentProfile = {
  id: 'S001',
  name: 'Aarav Sharma',
  rollNo: '2024001',
  class: '10',
  section: 'A',
  admissionNo: 'ADM2020001',
  dob: '2009-03-15',
  photo: null,
  bloodGroup: 'O+',
  parentName: 'Rajesh Sharma',
  parentPhone: '9876543211',
  address: '12, MG Road, Mumbai',
  busRoute: 'R-01',
  email: 'aarav@school.edu',
};

export const mockStudentAttendanceCalendar = {
  June: {
    1: 'present', 2: 'present', 3: 'absent', 4: 'present', 5: 'present',
    6: 'weekend', 7: 'weekend', 8: 'present', 9: 'present', 10: 'present',
    11: 'present', 12: 'present', 13: 'weekend', 14: 'weekend', 15: 'present',
    16: 'present', 17: 'present', 18: 'present', 19: 'absent', 20: 'weekend',
    21: 'weekend', 22: 'present', 23: 'present', 24: 'present', 25: 'present',
    26: 'present', 27: 'weekend', 28: 'weekend', 29: 'present', 30: 'present',
  },
};

// ── TEACHER DASHBOARD DATA ────────────────────────────────────────────────────
export const mockTeacherProfile = {
  id: 'T001',
  name: 'Dr. Sanjay Kumar',
  employeeId: 'EMP001',
  subject: 'Mathematics',
  classes: ['10A', '10B', '9A'],
  email: 'sanjay@school.edu',
  phone: '9811223344',
  qualification: 'M.Sc, B.Ed',
};

export const mockTeacherTasks = [
  { id: 1, task: 'Mark attendance for Class 10A', due: 'Today', priority: 'High', done: false },
  { id: 2, task: 'Submit mid-term marks for Class 9A', due: 'Tomorrow', priority: 'High', done: false },
  { id: 3, task: 'Prepare lesson plan for next week', due: 'This week', priority: 'Medium', done: true },
  { id: 4, task: 'Review student assignments', due: 'This week', priority: 'Medium', done: false },
  { id: 5, task: 'Submit monthly report', due: 'End of month', priority: 'Low', done: false },
];
