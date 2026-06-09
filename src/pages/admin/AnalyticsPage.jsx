import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, useTheme,
} from '@mui/material';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend, ComposedChart,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  mockEnrollmentTrend, mockRevenueAnalytics, mockMonthlyAttendance,
  mockSubjectPerformance, mockTeacherPerformance, mockIncomeBreakdown,
  mockExpenseBreakdown, mockFeeCollectionExpenses, mockStudentPerformance,
} from '../../data/mockData';

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.4 } });

function ChartCard({ title, subtitle, children }) {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.3 }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 2 }}>{subtitle}</Typography>}
        {!subtitle && <Box sx={{ mb: 2 }} />}
        {children}
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const theme = useTheme();
  const TTStyle = { backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#0f172a', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <motion.div {...fadeUp(0)}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Analytics & Reports</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Comprehensive school performance insights</Typography>
        </Box>
      </motion.div>

      <Grid container spacing={2.5}>
        {/* Enrollment Trend */}
        <Grid item xs={12} md={8}>
          <motion.div {...fadeUp(0.05)}>
            <ChartCard title="Student Enrollment Trend" subtitle="Monthly new admissions & total enrollment">
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={mockEnrollmentTrend} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <ChartTooltip contentStyle={TTStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area yAxisId="left" type="monotone" dataKey="enrollment" fill="rgba(79,70,229,0.15)" stroke="#4f46e5" strokeWidth={2.5} name="Total Enrollment" dot={false} />
                  <Bar yAxisId="right" dataKey="newAdmissions" fill="#22c55e" radius={[4, 4, 0, 0]} name="New Admissions" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Student Performance */}
        <Grid item xs={12} md={4}>
          <motion.div {...fadeUp(0.1)}>
            <ChartCard title="Performance Distribution" subtitle="Score range breakdown">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockStudentPerformance} layout="vertical" margin={{ top: 0, right: 10, left: 50, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} horizontal={false} />
                  <XAxis type="number" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="range" type="category" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
                  <ChartTooltip contentStyle={TTStyle} />
                  <Bar dataKey="students" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Revenue Analytics */}
        <Grid item xs={12}>
          <motion.div {...fadeUp(0.15)}>
            <ChartCard title="Revenue Analytics" subtitle="Monthly revenue, expenses, and profit">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={mockRevenueAnalytics} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
                  <ChartTooltip contentStyle={TTStyle} formatter={v => `₹${v.toLocaleString()}`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" fill="url(#revGrad)" stroke="#22c55e" strokeWidth={2} name="Revenue" dot={false} />
                  <Area type="monotone" dataKey="expenses" fill="url(#expGrad)" stroke="#ef4444" strokeWidth={2} name="Expenses" dot={false} />
                  <Area type="monotone" dataKey="profit" fill="url(#profGrad)" stroke="#4f46e5" strokeWidth={2} name="Net Profit" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Attendance Trend */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.2)}>
            <ChartCard title="Attendance Trend" subtitle="Monthly present vs absent">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={mockMonthlyAttendance} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <ChartTooltip contentStyle={TTStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Subject Performance */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.25)}>
            <ChartCard title="Subject Performance" subtitle="Class average scores by subject">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={mockSubjectPerformance} margin={{ top: 5, right: 5, left: -15, bottom: 55 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                  <XAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 10 }} angle={-35} textAnchor="end" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <ChartTooltip contentStyle={TTStyle} formatter={v => `${v}%`} />
                  <Bar dataKey="average" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Teacher Performance */}
        <Grid item xs={12} md={7}>
          <motion.div {...fadeUp(0.3)}>
            <ChartCard title="Teacher Performance" subtitle="Rating, student average, and attendance">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {mockTeacherPerformance.map((t, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</Typography>
                      <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>⭐ {t.rating}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>📊 Avg: {t.studentAvg}%</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'success.main' }}>✓ {t.attendance}%</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: 80 }}>
                      <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(t.rating / 5) * 100}%`, background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)', borderRadius: 3 }} />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Income vs Expense Breakdown */}
        <Grid item xs={12} md={5}>
          <motion.div {...fadeUp(0.35)}>
            <ChartCard title="Fee Collection Trend" subtitle="Monthly collection vs expenses">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={mockIncomeBreakdown} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value" paddingAngle={3}>
                    {mockIncomeBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <ChartTooltip contentStyle={TTStyle} formatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v, e) => <span style={{ color: theme.palette.text.secondary }}>{e.payload.name}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
