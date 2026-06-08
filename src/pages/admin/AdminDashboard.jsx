import React, { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  mockStudents,
  mockTeachers,
  mockActivities,
  mockEvents,
  mockNotices,
  mockWeeklyAttendance,
  mockMonthlyFeeData,
  mockStudentGrowth,
  mockTeacherPerformance,
  mockRevenueData,
  mockFeeCollectionExpenses,
  mockIncomeBreakdown,
  mockExpenseBreakdown,
  mockStudentPerformance,
  mockClassAttendance,
  mockFeeStatusSummary,
  mockEnrollmentTrend,
  mockSubjectPerformance,
  mockTeacherWorkload,
  mockMonthlyExpenseTrend,
} from '../../data/mockData';


// Premium KPI Card Component
const PremiumKPICard = ({ label, value, icon: Icon, trend, trendUp, color, description }) => (
  <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
    <Card
      sx={{
        p: 2.5,
        background: color ? `linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%)` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(20px, -20px)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {label}
            </Typography>
          </Box>
          {Icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Icon sx={{ fontSize: '20px' }} />
            </Box>
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          {value}
        </Typography>

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                px: 1.2,
                py: 0.5,
                borderRadius: '8px',
              }}
            >
              {trendUp ? (
                <ArrowUpwardIcon sx={{ fontSize: '14px' }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: '14px' }} />
              )}
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {trend}
              </Typography>
            </Box>
            {description && (
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {description}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Card>
  </motion.div>
);

// Premium Chart Card Component
const PremiumChartCard = ({ title, children, subtitle, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card
      sx={{
        p: 3,
        borderRadius: '16px',
        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#111827',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && <Box>{action}</Box>}
      </Box>
      {children}
    </Card>
  </motion.div>
);

export default function AdminDashboard() {
  const [openNoticeDialog, setOpenNoticeDialog] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', important: false });
  const [attendanceTimeframe, setAttendanceTimeframe] = useState('thisWeek');

  const handleAddNotice = () => {
    setOpenNoticeDialog(false);
    setNoticeForm({ title: '', content: '', important: false });
  };

  // Calculate metrics
  const currentAttendanceData = mockWeeklyAttendance[attendanceTimeframe];
  const avgAttendance = Math.round(
    currentAttendanceData.reduce((sum, item) => sum + item.percentage, 0) / currentAttendanceData.length
  );
  const previousAvgAttendance = Math.round(
    mockWeeklyAttendance.lastWeek.reduce((sum, item) => sum + item.percentage, 0) / mockWeeklyAttendance.lastWeek.length
  );
  const attendanceTrend = avgAttendance - previousAvgAttendance;
  const feeDataCurrent = mockMonthlyFeeData.current;
  const totalCollected = feeDataCurrent.reduce((sum, item) => sum + item.collected, 0);
  const totalTarget = feeDataCurrent.reduce((sum, item) => sum + item.target, 0);
  const collectionPercentage = Math.round((totalCollected / totalTarget) * 100);

  const totalIncome = mockIncomeBreakdown.reduce((sum, item) => sum + item.value, 0);
  const totalExpense = mockExpenseBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 4 }}>
      {/* Page Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#111827' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Monitor your school's performance and analytics.
        </Typography>
      </Box>

      {/* Main KPI Cards Grid - 4 columns */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Fee Awaiting"
            value={`₹${mockStudents.filter((s) => s.feeStatus === 'pending').length * 15000}`}
            icon={AttachMoneyIcon}
            trend="2450/5000"
            trendUp={false}
            color={['#ec4899', '#f472b6']}
            description="students pending"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Monthly Fee Collection"
            value={`₹${(totalCollected / 100000).toFixed(1)}L`}
            icon={AttachMoneyIcon}
            trend={`₹ 9,00,000`}
            trendUp={true}
            color={['#10b981', '#34d399']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Expenses this Month"
            value={`₹ ${(totalExpense / 100000).toFixed(2)}L`}
            icon={TrendingDownIcon}
            trend="₹ 5,72,136"
            trendUp={false}
            color={['#ef4444', '#f87171']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Profits this Month"
            value={`₹ ${((totalCollected - totalExpense) / 100000).toFixed(2)}L`}
            icon={TrendingUpIcon}
            trend="₹ 3,27,864"
            trendUp={true}
            color={['#f59e0b', '#fbbf24']}
          />
        </Grid>
      </Grid>

      {/* Second Row of KPI Cards - Additional Metrics */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Teachers Present"
            value={`${mockTeachers.length}/${mockTeachers.length}`}
            icon={SchoolIcon}
            trend="Today"
            trendUp={true}
            color={['#8b5cf6', '#a78bfa']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Students Present"
            value={`4396/5000`}
            icon={PeopleIcon}
            trend="Today"
            trendUp={true}
            color={['#06b6d4', '#22d3ee']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Staff Present"
            value={`40/40`}
            icon={PeopleIcon}
            trend="Today"
            trendUp={true}
            color={['#ef4444', '#f87171']}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PremiumKPICard
            label="Converted Leads"
            value={`2/10`}
            icon={TrendingUpIcon}
            trend="this Month"
            trendUp={true}
            color={['#eab308', '#facc15']}
          />
        </Grid>
      </Grid>

      {/* Fee Collection and Expenses Chart */}
      <Grid item xs={12}>
        <PremiumChartCard
          title="Fee Collection and Expenses"
          subtitle="Monthly comparison"
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '2px', backgroundColor: '#10b981' }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>Fee Collection</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '2px', backgroundColor: '#ef4444' }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>Expenses</Typography>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockFeeCollectionExpenses} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '13px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '13px' }} />
              <ChartTooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value) => `₹ ${value}k`}
              />
              <Legend />
              <Bar dataKey="feeCollection" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </PremiumChartCard>
      </Grid>

      {/* Additional Analytics Charts */}
      <Grid container spacing={3}>
        {/* Student Performance Distribution */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Student Performance Distribution"
            subtitle="Grade-wise breakdown"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStudentPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis dataKey="range" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={90} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="students" fill="#667eea" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Class-wise Attendance */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Class-wise Attendance"
            subtitle="Attendance by class"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockClassAttendance} margin={{ top: 5, right: 30, left: 0, bottom: 50 }}>
                <defs>
                  <linearGradient id="classGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00f2fe" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="class" stroke="#9ca3af" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="attendance" fill="url(#classGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Fee Status Summary */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Fee Status Summary"
            subtitle="Overall collection status"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockFeeStatusSummary}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockFeeStatusSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip formatter={(value) => `${value} students`} />
              </PieChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Enrollment Trend */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Enrollment Trend"
            subtitle="Last 6 months"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockEnrollmentTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f093fb" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#f093fb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '13px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '13px' }} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="enrollment" fill="url(#enrollmentGradient)" stroke="#f093fb" strokeWidth={3} dot={{ fill: '#f093fb', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Subject Performance */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Subject Performance"
            subtitle="Average scores by subject"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSubjectPerformance} margin={{ top: 5, right: 30, left: 0, bottom: 50 }}>
                <defs>
                  <linearGradient id="subjectGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="subject" stroke="#9ca3af" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="average" fill="url(#subjectGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Monthly Expense Trend */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Monthly Expense Trend"
            subtitle="Expense tracking"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMonthlyExpenseTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="expenseTrendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '13px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '13px' }} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => `₹ ${value}k`}
                />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>

        {/* Teacher Workload */}
        <Grid item xs={12}>
          <PremiumChartCard
            title="Teacher Workload Distribution"
            subtitle="Classes and students assigned"
          >
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={mockTeacherWorkload} margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={90} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="classes" fill="#667eea" radius={[0, 8, 8, 0]} />
                <Bar dataKey="students" fill="#f093fb" radius={[0, 8, 8, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </PremiumChartCard>
        </Grid>
      </Grid>

      {/* Upcoming Events & Recent Notices */}
      <Grid container spacing={3}>
        {/* Events */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Upcoming Events"
            subtitle="Next scheduled events"
            action={
              <Button size="small" startIcon={<AddIcon />}>
                Add Event
              </Button>
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockEvents.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#111827' }}>
                    {event.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, fontSize: '0.875rem', color: '#6b7280', mb: 0.5 }}>
                    <Typography variant="caption">📅 {event.date}</Typography>
                    <Typography variant="caption">•</Typography>
                    <Typography variant="caption">🕐 {event.time}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    📍 {event.location}
                  </Typography>
                </Box>
              ))}
            </Box>
          </PremiumChartCard>
        </Grid>

        {/* Recent Notices */}
        <Grid item xs={12} md={6}>
          <PremiumChartCard
            title="Notice Board"
            subtitle="Latest updates"
            action={
              <Button size="small" startIcon={<AddIcon />} onClick={() => setOpenNoticeDialog(true)}>
                Add Notice
              </Button>
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {mockNotices.slice(0, 5).map((notice) => (
                <Box
                  key={notice.id}
                  sx={{
                    p: 1.5,
                    borderRadius: '10px',
                    backgroundColor: notice.important ? 'rgba(239, 68, 68, 0.05)' : 'rgba(102, 126, 234, 0.05)',
                    borderLeft: `3px solid ${notice.important ? '#ef4444' : '#667eea'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: notice.important ? 'rgba(239, 68, 68, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.85rem', flex: 1 }}>
                      {notice.title}
                    </Typography>
                    {notice.important && (
                      <Chip
                        label="Important"
                        size="small"
                        color="error"
                        sx={{ height: '18px', fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {notice.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </PremiumChartCard>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Card
        sx={{
          p: 3,
          borderRadius: '16px',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#111827',
            mb: 2,
          }}
        >
          Recent Activities
        </Typography>

        <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(102, 126, 234, 0.05)' }}>
                <TableCell sx={{ fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb' }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockActivities.map((activity) => (
                <TableRow key={activity.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.03)' } }}>
                  <TableCell sx={{ borderBottom: '1px solid #e5e7eb' }}>
                    <Chip
                      label={activity.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#4b5563' }}>
                    {activity.description}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#9ca3af' }}>
                    {activity.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add Notice Dialog */}
      <Dialog open={openNoticeDialog} onClose={() => setOpenNoticeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Create New Notice</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Notice Title"
            fullWidth
            value={noticeForm.title}
            onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
            variant="outlined"
          />
          <TextField
            label="Notice Content"
            fullWidth
            multiline
            rows={4}
            value={noticeForm.content}
            onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenNoticeDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNotice} variant="contained" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            Create Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
