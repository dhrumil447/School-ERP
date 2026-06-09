import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress, useTheme, Avatar
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { mockStudents, mockTimetable, mockPeriods, mockDays, mockSubjectColors, mockNotices, mockWeeklyAttendance } from '../../data/mockData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3 }
});

export default function TeacherDashboard() {
  const theme = useTheme();
  const { user } = useAuth();

  const myStudents = mockStudents.slice(0, 25);
  const today = mockDays[new Date().getDay() % 5] || 'Monday';
  const todaySchedule = (mockTimetable['10A']?.[today] || []).map((s, i) => ({ period: `P${i + 1}`, time: mockPeriods[i], subject: s, class: '10A' })).filter(p => p.subject === 'Math' || p.subject === 'Science').slice(0, 4);
  const notices = mockNotices.filter(n => n.targetAudience === 'All' || n.targetAudience === 'Teachers').slice(0, 3);

  const avgAttendance = Math.round(myStudents.reduce((s, st) => s + st.attendance, 0) / myStudents.length);
  const needsAttention = myStudents.filter(s => s.attendance < 75).length;

  const weekData = mockWeeklyAttendance.thisWeek;

  const chartTooltipStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    fontSize: '11px',
    color: theme.palette.text.primary,
    boxShadow: 'none'
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: 'background.default' }}>
      
      {/* Welcome Banner (Clean light orange/slate accent instead of flashy orange gradient) */}
      <motion.div {...fadeUp(0)}>
        <Box sx={{
          mb: 3, p: 3, borderRadius: 1,
          bgcolor: theme.palette.mode === 'dark' ? 'action.selected' : '#fff7ed',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'divider' : '#ffedd5',
          color: 'text.primary',
        }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em', color: '#c2410c' }}>
            Welcome, {user?.name} 👩‍🏫
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.825rem' }}>
            EduVerse Faculty Dashboard · assigned subjects: Mathematics & Science · Employee ID: EMP001
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
            <Chip label="Academic Year: 2025-26" size="small" sx={{ bgcolor: 'background.paper', borderColor: 'divider', border: '1px solid', fontWeight: 600, fontSize: '0.7rem' }} />
            <Chip label="Active Classes: 10-A" size="small" sx={{ bgcolor: 'background.paper', borderColor: 'divider', border: '1px solid', fontWeight: 600, fontSize: '0.7rem' }} />
          </Box>
        </Box>
      </motion.div>

      {/* KPI Cards (Clean cards with subtle borders) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Assigned Students', value: myStudents.length, color: 'primary.main', icon: '👨‍🎓', sub: 'Class 10A roster roll' },
          { label: 'Class Average Attendance', value: `${avgAttendance}%`, color: 'success.main', icon: '📋', sub: 'Target threshold 75%' },
          { label: 'Lectures Scheduled Today', value: todaySchedule.length.toString(), color: 'primary.main', icon: '🏫', sub: `${today}` },
          { label: 'Students Under Attendance Target', value: needsAttention.toString(), color: needsAttention > 0 ? 'error.main' : 'text.secondary', icon: '⚠️', sub: 'Attendance under 75%' },
        ].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div {...fadeUp(i * 0.08)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '100%', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {s.label}
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', lineHeight: 1 }}>{s.icon}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 850, color: s.color, lineHeight: 1.1, mb: 0.5 }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    {s.sub}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={5}>
          <motion.div {...fadeUp(0.2)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ height: '100%', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🗓️ Lectures scheduled today — {today}
                </Typography>
                {todaySchedule.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>🎉</Typography>
                    <Typography sx={{ fontSize: '0.8rem' }}>No lectures scheduled for today!</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {todaySchedule.map((p, i) => {
                      const color = mockSubjectColors[p.subject] || '#4f46e5';
                      return (
                        <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', p: 1.2, borderRadius: 1, border: '1px solid #e2e8f0', bgcolor: 'action.hover' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: 0.5, bgcolor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: 'text.secondary' }}>{p.period}</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: '0.825rem', fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>{p.subject}</Typography>
                            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>{p.time} · Room: Class {p.class}</Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Weekly Attendance Chart */}
        <Grid item xs={12} md={7}>
          <motion.div {...fadeUp(0.25)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ height: '100%', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 0.3, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📊 Weekly Class Attendance Statistics
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 2 }}>Present student counts (Target: 5000)</Typography>
                <ResponsiveContainer width="100%" height={230}>
                  <LineChart data={weekData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <ChartTooltip contentStyle={chartTooltipStyle} />
                    <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ fill: '#4f46e5', r: 4 }} name="Present" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Students needing attention */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.3)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚠️ Attendance Alert (Below 75%)
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {myStudents.filter(s => s.attendance < 75).slice(0, 5).map((s, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', p: 1.5, borderRadius: 1, bgcolor: '#fee2e2', border: '1px solid #fca5a5' }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>{s.name.charAt(0)}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.825rem', fontWeight: 700, color: '#991b1b' }}>{s.name}</Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#7f1d1d' }}>Roll: {s.rollNo} · Class {s.class}{s.section}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontWeight: 800, color: 'error.main', fontSize: '0.95rem' }}>{s.attendance}%</Typography>
                        <LinearProgress variant="determinate" value={s.attendance} sx={{ width: 60, height: 4, borderRadius: 2, mt: 0.3, '& .MuiLinearProgress-bar': { bgcolor: '#ef4444' } }} />
                      </Box>
                    </Box>
                  ))}
                  {myStudents.filter(s => s.attendance < 75).length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>🎉</Typography>
                      <Typography sx={{ fontSize: '0.85rem' }}>All students exceed 75% attendance criteria.</Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Notices for teachers */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.35)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📢 Administrative Circulars & Notices
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {notices.map(n => (
                    <Box key={n.id} sx={{
                      p: 1.5, borderRadius: 1, border: '1px solid #e2e8f0',
                      borderLeft: `3px solid ${n.important ? '#ef4444' : '#4f46e5'}`,
                      bgcolor: 'background.paper',
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.825rem', fontWeight: 750 }}>{n.title}</Typography>
                        {n.important && <Chip label="Urgent" size="small" color="error" sx={{ fontSize: '0.6rem', height: 16, borderRadius: '4px' }} />}
                      </Box>
                      <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Date: {n.date} · Target: {n.targetAudience}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
