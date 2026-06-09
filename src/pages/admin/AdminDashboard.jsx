import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip,
  Select, MenuItem, FormControl, useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import {
  People, School, EventNote, CreditCard,
} from '@mui/icons-material';
import {
  mockEvents, mockNotices, mockActivities,
  mockMonthlyFeeData, mockSubjectPerformance, mockEnrollmentTrend, mockTeachers
} from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Reusable Components
import KPIWidget from '../../components/dashboard/KPIWidget';
import ChartCard from '../../components/dashboard/ChartCard';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3 }
});

// Mock structured monthly attendance data for the filter
const attendanceDataByMonth = {
  'June 2025': [
    { name: 'Week 1', present: 94.2, absent: 5.8 },
    { name: 'Week 2', present: 95.8, absent: 4.2 },
    { name: 'Week 3', present: 93.5, absent: 6.5 },
    { name: 'Week 4', present: 96.4, absent: 3.6 },
  ],
  'May 2025': [
    { name: 'Week 1', present: 93.0, absent: 7.0 },
    { name: 'Week 2', present: 94.2, absent: 5.8 },
    { name: 'Week 3', present: 95.0, absent: 5.0 },
    { name: 'Week 4', present: 94.8, absent: 5.2 },
  ],
  'April 2025': [
    { name: 'Week 1', present: 92.5, absent: 7.5 },
    { name: 'Week 2', present: 93.8, absent: 6.2 },
    { name: 'Week 3', present: 94.1, absent: 5.9 },
    { name: 'Week 4', present: 93.2, absent: 6.8 },
  ]
};

export default function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Selected Month state for Attendance Chart Monthly Filter
  const [attendanceMonth, setAttendanceMonth] = useState('June 2025');

  // KPI Calculations
  const totalStudentsStr = (mockEnrollmentTrend.at(-1)?.enrollment || 5020).toLocaleString('en-IN');
  const totalTeachersStr = mockTeachers.length.toString();
  const currentMonthFee = mockMonthlyFeeData.current.at(-1) || { collected: 495000, target: 500000 };
  const collectionPct = Math.round((currentMonthFee.collected / currentMonthFee.target) * 100);
  const feeCollectedStr = `₹${(currentMonthFee.collected / 100000).toFixed(2)}L`;

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const quickActions = [
    { label: 'Add Student', icon: '👨‍🎓', path: '/admin/students' },
    { label: 'Mark Attendance', icon: '📋', path: '/admin/attendance' },
    { label: 'Collect Fee', icon: '💰', path: '/admin/fees' },
    { label: 'Add Notice', icon: '📢', path: '/admin/notices' },
    { label: 'View Results', icon: '📊', path: '/admin/results' },
    { label: 'Analytics', icon: '📈', path: '/admin/analytics' },
  ];

  // Map fee collection data to ₹K (Thousands) for cleaner rendering
  const formattedFeeData = mockMonthlyFeeData.current.map(item => ({
    month: item.month,
    Collected: item.collected / 1000,
    Target: item.target / 1000,
  }));

  // ApexCharts: Attendance Trend (Area Chart)
  const attendanceOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, Roboto, sans-serif',
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    colors: ['#4f46e5'],
    dataLabels: { enabled: false },
    xaxis: {
      categories: attendanceDataByMonth[attendanceMonth].map(d => d.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '11px' } }
    },
    yaxis: {
      min: 80,
      max: 100,
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '11px' } }
    },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 4 },
    tooltip: {
      theme: theme.palette.mode,
      y: { formatter: (val) => `${val}%` }
    },
    legend: { show: true, position: 'top', horizontalAlign: 'right' }
  };
  const attendanceSeries = [
    { name: 'Attendance Rate', data: attendanceDataByMonth[attendanceMonth].map(d => d.present) }
  ];

  // ApexCharts: Fee Collection Analytics (Bar Chart)
  const feeOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, Roboto, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        borderRadiusApplication: 'around'
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    colors: ['#4f46e5', '#cbd5e1'],
    xaxis: {
      categories: formattedFeeData.map(d => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '11px' } }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.secondary, fontSize: '11px' },
        formatter: (val) => `₹${val}K`
      }
    },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 4 },
    tooltip: {
      theme: theme.palette.mode,
      y: { formatter: (val) => `₹${val}K` }
    },
    legend: { show: true, position: 'top', horizontalAlign: 'right' }
  };
  const feeSeries = [
    { name: 'Collected', data: formattedFeeData.map(d => d.Collected) },
    { name: 'Target', data: formattedFeeData.map(d => d.Target) }
  ];

  // ApexCharts: Student Enrollment Trend (Area Chart)
  const enrollmentOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, Roboto, sans-serif',
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    colors: ['#6366f1'],
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockEnrollmentTrend.map(d => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '13px', fontWeight: 500 } }
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '13px', fontWeight: 500 } }
    },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 4 },
    tooltip: {
      theme: theme.palette.mode,
      y: { formatter: (val) => `${val} Students` }
    },
    legend: { show: true, position: 'top', horizontalAlign: 'right' }
  };
  const enrollmentSeries = [
    { name: 'Enrollment', data: mockEnrollmentTrend.map(d => d.enrollment) }
  ];

  // ApexCharts: Subject Performance (Horizontal Bar Chart)
  const subjectOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, Roboto, sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        dataLabels: { position: 'inside' }
      }
    },
    colors: ['#4f46e5'],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
      style: { fontSize: '11px', colors: ['#ffffff'], fontWeight: 700 }
    },
    xaxis: {
      categories: mockSubjectPerformance.map(d => d.subject),
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
      max: 100
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.secondary, fontSize: '11px', fontWeight: 500 } }
    },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 4 },
    tooltip: {
      theme: theme.palette.mode,
      y: { formatter: (val) => `${val}%` }
    }
  };
  const subjectSeries = [
    { name: 'Average Score', data: mockSubjectPerformance.map(d => d.average) }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: '100%', maxWidth: '100%', boxSizing: 'border-box', backgroundColor: 'background.default' }}>

      {/* 1. Welcome Banner */}
      <motion.div {...fadeUp(0)}>
        <Box sx={{
          mb: 3, p: 3, borderRadius: '16px',
          bgcolor: theme.palette.mode === 'dark' ? 'action.selected' : '#f0f4ff',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'divider' : '#dbeafe',
          color: 'text.primary',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 600 }}>{today}</Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em', color: 'primary.dark' }}>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.825rem' }}>
            Welcome back. Here is the operational dashboard overview for EduVerse school management.
          </Typography>
        </Box>
      </motion.div>

      {/* 2. KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div {...fadeUp(0.04)} style={{ width: '100%', height: '100%' }}>
            <KPIWidget
              label="Total Students"
              value={totalStudentsStr}
              sub="+140 this term"
              trend={1}
              icon={<People fontSize="small" />}
              onClick={() => navigate('/admin/students')}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div {...fadeUp(0.08)} style={{ width: '100%', height: '100%' }}>
            <KPIWidget
              label="Total Teachers"
              value={totalTeachersStr}
              sub="All active status"
              trend={0}
              icon={<School fontSize="small" />}
              onClick={() => navigate('/admin/teachers')}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div {...fadeUp(0.12)} style={{ width: '100%', height: '100%' }}>
            <KPIWidget
              label="Attendance %"
              value="94.2%"
              sub="+0.8% today average"
              trend={1}
              icon={<EventNote fontSize="small" />}
              onClick={() => navigate('/admin/attendance')}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div {...fadeUp(0.16)} style={{ width: '100%', height: '100%' }}>
            <KPIWidget
              label="Fee Collection"
              value={feeCollectedStr}
              sub={`${collectionPct}% of target`}
              trend={1}
              icon={<CreditCard fontSize="small" />}
              onClick={() => navigate('/admin/fees')}
            />
          </motion.div>
        </Grid>
      </Grid>

      {/* Quick Actions (Simple flat white/gray grids) */}
      <motion.div {...fadeUp(0.2)} style={{ width: '100%' }}>
        <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)', border: 'none' }}>
          <CardContent sx={{ p: '24px', '&:last-child': { pb: '24px' } }}>
            <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ⚡ Admin Operations Quicklinks
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((a, i) => (
                <Grid item xs={6} sm={4} md={2} key={i}>
                  <Box
                    onClick={() => navigate(a.path)}
                    sx={{
                      p: 2, borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      bgcolor: '#ffffff',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'primary.main', bgcolor: '#f8fafc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)' },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.4rem', mb: 0.5 }}>{a.icon}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.primary' }}>{a.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. Row 1: Attendance & Fee Collection Charts */}
      <DashboardLayout>

        {/* Attendance Trend Chart */}
        <Grid item xs={12} sm={6}>
          <motion.div {...fadeUp(0.24)} style={{ width: '100%', height: '100%' }}>
            <ChartCard
              title="Attendance Trend Chart"
              subtitle="Weekly attendance status metrics"
              action={
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={attendanceMonth}
                    onChange={(e) => setAttendanceMonth(e.target.value)}
                    sx={{ fontSize: '0.75rem', borderRadius: '8px' }}
                  >
                    <MenuItem value="June 2025" sx={{ fontSize: '0.75rem' }}>June 2025</MenuItem>
                    <MenuItem value="May 2025" sx={{ fontSize: '0.75rem' }}>May 2025</MenuItem>
                    <MenuItem value="April 2025" sx={{ fontSize: '0.75rem' }}>April 2025</MenuItem>
                  </Select>
                </FormControl>
              }
            >
              <Chart
                options={attendanceOptions}
                series={attendanceSeries}
                type="area"
                height={350}
                width={450}
              />
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Fee Collection Chart */}
        <Grid item xs={12} sm={6}>
          <motion.div {...fadeUp(0.28)} style={{ width: '100%', height: '100%' }}>
            <ChartCard title="Fee Collection Chart" subtitle="Target vs. Collected (in Thousands ₹)">
              <Chart
                options={feeOptions}
                series={feeSeries}
                type="bar"
                height={350}
                width={450}
              />
            </ChartCard>
          </motion.div>
        </Grid>

      </DashboardLayout>

      {/* 4. Row 2: Enrollment & Subject Performance Charts */}
      <Box sx={{ mt: 3 }}>
        <DashboardLayout>

          {/* Student Enrollment Trend */}
          <Grid item xs={12} sm={6}>
            <motion.div {...fadeUp(0.32)} style={{ width: '100%', height: '100%' }}>
              <ChartCard title="Student Enrollment Trend" subtitle="Registration growth trend over past 8 months">
                <Chart
                  options={enrollmentOptions}
                  series={enrollmentSeries}
                  type="area"
                  height={350}
                  width={450}
                />
              </ChartCard>
            </motion.div>
          </Grid>

          {/* Subject Performance */}
          <Grid item xs={12} sm={6}>
            <motion.div {...fadeUp(0.36)} style={{ width: '100%', height: '100%' }}>
              <ChartCard title="Subject Performance" subtitle="Average test scores by subject (%)">
                <Chart
                  options={subjectOptions}
                  series={subjectSeries}
                  type="bar"
                  height={350}
                  width={450}
                />
              </ChartCard>
            </motion.div>
          </Grid>

        </DashboardLayout>
      </Box>

      {/* 5. Recent Activities (Full Width) */}
      <Grid container spacing={3} sx={{ mt: 0.5, mb: 3 }}>
        <Grid item xs={12}>
          <motion.div {...fadeUp(0.4)} style={{ width: '100%' }}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)', border: 'none' }}>
              <CardContent sx={{ p: '24px', '&:last-child': { pb: '24px' } }}>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>🕐 Recent System Logs & Audit Activities</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {mockActivities.map((a, i) => {
                    const colorMap = { 'Student Added': '#06b6d4', 'Attendance Updated': '#4f46e5', 'Notice Published': '#d97706', 'Fee Payment': '#10b981', 'Report Generated': '#8b5cf6' };
                    const color = colorMap[a.type] || '#4f46e5';
                    return (
                      <Box key={a.id} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: i < mockActivities.length - 1 ? '1px solid' : 'none', borderColor: 'divider', alignItems: 'flex-start' }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, mt: 0.8, flexShrink: 0 }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={a.type} size="small" sx={{ fontSize: '0.625rem', height: 18, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', color: 'text.secondary', fontWeight: 700, borderRadius: '4px' }} />
                            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{a.description}</Typography>
                          </Box>
                        </Box>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.disabled', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.timestamp}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* 6. Notice Board & 7. Upcoming Events (Side-by-side or stacked on mobile) */}
      <Grid container spacing={3} sx={{ mb: 3 }}>

        {/* Notice Board */}
        <Grid item xs={12} sm={6}>
          <motion.div {...fadeUp(0.44)} style={{ width: '100%', height: '100%' }}>
            <ChartCard title="📢 Notice Board" subtitle="Recent administrative announcements"
              action={<Button size="small" variant="text" onClick={() => navigate('/admin/notices')} sx={{ fontSize: '0.75rem', fontWeight: 600 }}>View All</Button>}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {mockNotices.slice(0, 4).map(n => (
                  <Box key={n.id} sx={{
                    p: 1.8, borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderLeft: `3px solid ${n.important ? '#ef4444' : '#4f46e5'}`,
                    bgcolor: 'background.paper',
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontSize: '0.825rem', fontWeight: 700, flex: 1 }}>{n.title}</Typography>
                      {n.important && <Chip label="Urgent" size="small" color="error" sx={{ fontSize: '0.6rem', height: 18, borderRadius: '4px' }} />}
                    </Box>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                      {new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · Author: {n.author}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} sm={6}>
          <motion.div {...fadeUp(0.48)} style={{ width: '100%', height: '100%' }}>
            <ChartCard title="📅 Upcoming Events" subtitle="Institutional calendar highlights"
              action={<Button size="small" variant="text" onClick={() => navigate('/admin/events')} sx={{ fontSize: '0.75rem', fontWeight: 600 }}>View All</Button>}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {mockEvents.slice(0, 4).map(ev => (
                  <Box key={ev.id} sx={{
                    p: 1.8, borderRadius: '12px', border: '1px solid', borderColor: 'divider',
                    bgcolor: 'background.paper', transition: 'border-color 0.2s', '&:hover': { borderColor: 'primary.main' },
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontSize: '0.825rem', fontWeight: 700 }}>{ev.name}</Typography>
                      <Chip label={ev.category} size="small" sx={{ fontSize: '0.65rem', height: 18, borderRadius: '4px' }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                      Date: {new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · Time: {ev.time} · Location: {ev.location}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}