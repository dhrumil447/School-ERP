import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress,
  useTheme, Divider, Avatar
} from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  Tooltip as ChartTooltip, ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { mockResults, mockNotices, mockTimetable, mockSubjectColors, mockDays, mockPeriods } from '../../data/mockData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3 }
});

export default function StudentDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  
  const chartTooltipStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    fontSize: '11px',
    color: theme.palette.text.primary,
    boxShadow: 'none'
  };

  // Simulate student results for current user
  const myResults = mockResults.filter(r => r.status === 'Published').slice(0, 3);
  const myLatestResult = myResults[0];

  const subjectScores = myLatestResult ? Object.entries(myLatestResult.subjects).map(([subject, score]) => ({ subject, score })) : [];
  const myAttendance = 89;
  const myFeeStatus = 'paid';
  const announcements = mockNotices.filter(n => n.targetAudience === 'All' || n.targetAudience === 'Students').slice(0, 3);
  const today = mockDays[new Date().getDay() % 5] || 'Monday';
  const todaySchedule = (mockTimetable['10A']?.[today] || []).map((s, i) => ({ period: `P${i + 1}`, time: mockPeriods[i], subject: s }));

  const gradeColor = { 'A+': '#22c55e', 'A': '#06b6d4', 'B+': '#4f46e5', 'B': '#8b5cf6', 'C': '#f59e0b', 'F': '#ef4444' };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: 'background.default' }}>
      
      {/* Welcome Banner (Clean light green surface instead of flashy gradient) */}
      <motion.div {...fadeUp(0)}>
        <Box sx={{
          mb: 3, p: 3, borderRadius: 1,
          bgcolor: theme.palette.mode === 'dark' ? 'action.selected' : '#e6f4ea',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'divider' : '#a7f3d0',
          color: 'text.primary',
        }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em', color: '#065f46' }}>
            Welcome Back, {user?.name} 🎓
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.825rem' }}>
            EduVerse Student Portal · Class 10A · Academic Term 2025-26
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
            <Chip label="Class: 10-A" size="small" sx={{ bgcolor: 'background.paper', borderColor: 'divider', border: '1px solid', fontWeight: 600, fontSize: '0.7rem' }} />
            <Chip label="Roll ID: 10A001" size="small" sx={{ bgcolor: 'background.paper', borderColor: 'divider', border: '1px solid', fontWeight: 600, fontSize: '0.7rem' }} />
          </Box>
        </Box>
      </motion.div>

      {/* KPI Cards (Clean cards with subtle gray borders and simple text) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'My Attendance', value: `${myAttendance}%`, color: myAttendance >= 85 ? 'success.main' : 'warning.main', icon: '📋', sub: myAttendance >= 75 ? 'Meets threshold requirement' : 'Below required attendance' },
          { label: 'Latest Score Grade', value: myLatestResult?.grade || 'N/A', color: 'primary.main', icon: '📊', sub: `Avg: ${myLatestResult?.percentage}% · Class Rank: #${myLatestResult?.rank}` },
          { label: 'Annual Fee Status', value: myFeeStatus === 'paid' ? 'Completed' : 'Payment Due', color: myFeeStatus === 'paid' ? 'success.main' : 'error.main', icon: '💰', sub: 'Term fees paid in full' },
          { label: "Today's Schedule Lectures", value: todaySchedule.length.toString(), color: 'primary.main', icon: '🗓️', sub: `${today}` },
        ].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div {...fadeUp(i * 0.04)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        {/* Today's Timetable */}
        <Grid item xs={12} md={5}>
          <motion.div {...fadeUp(0.2)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ height: '100%', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📅 Classes scheduled today — {today}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {todaySchedule.slice(0, 6).map((p, i) => {
                    const color = mockSubjectColors[p.subject] || '#4f46e5';
                    return (
                      <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', p: 1.2, borderRadius: 1, border: '1px solid #e2e8f0', bgcolor: 'action.hover' }}>
                        <Box sx={{ width: 28, height: 28, borderRadius: 0.5, bgcolor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: 'text.secondary' }}>{p.period}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontSize: '0.825rem', fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>{p.subject}</Typography>
                          <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>{p.time}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Performance Radar */}
        <Grid item xs={12} md={7}>
          <motion.div {...fadeUp(0.24)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ height: '100%', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 0.3, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📊 Subject mark analysis
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 2 }}>Latest semester test performance</Typography>
                {subjectScores.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={subjectScores} margin={{ top: 5, right: 30, bottom: 5, left: 30 }}>
                      <PolarGrid stroke={theme.palette.divider} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} />
                      <Radar name="Score" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={2} />
                      <ChartTooltip contentStyle={chartTooltipStyle} formatter={v => `${v}/100`} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary', fontSize: '0.8rem' }}>No results published yet</Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Attendance Bar */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.28)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📋 Lecture Attendance Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '0.825rem' }}>Total attendance rate</Typography>
                    <Typography sx={{ fontWeight: 800, color: myAttendance >= 85 ? 'success.main' : 'warning.main', fontSize: '1.1rem' }}>{myAttendance}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={myAttendance} sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: myAttendance >= 85 ? '#10b981' : '#f59e0b', borderRadius: 3 } }} />
                  <Typography sx={{ fontSize: '0.72rem', color: myAttendance >= 75 ? 'success.main' : 'error.main', mt: 0.8 }}>
                    {myAttendance >= 75 ? '✅ Attendance rate satisfies the institute minimum criteria of 75%' : '⚠️ Below minimum requirement.'}
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  {[{ label: 'Lectures Present', value: Math.round(myAttendance * 1.8), color: '#10b981' }, { label: 'Lectures Absent', value: Math.round((100 - myAttendance) * 1.8), color: '#ef4444' }, { label: 'Total Term Lectures', value: 180, color: '#4f46e5' }].map((s, i) => (
                    <Grid item xs={4} key={i}>
                      <Box sx={{ p: 1.2, borderRadius: 1, bgcolor: 'action.hover', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: s.color }}>{s.value}</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>{s.label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Notices */}
        <Grid item xs={12} md={6}>
          <motion.div {...fadeUp(0.32)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.85rem', color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📢 Latest Academic Board Notices
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {announcements.map(n => (
                    <Box key={n.id} sx={{
                      p: 1.5, borderRadius: 1, border: '1px solid #e2e8f0', borderLeft: `3px solid ${n.important ? '#ef4444' : '#4f46e5'}`,
                      bgcolor: 'background.paper',
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.825rem', fontWeight: 700 }}>{n.title}</Typography>
                        {n.important && <Chip label="Urgent" size="small" color="error" sx={{ fontSize: '0.6rem', height: 16, borderRadius: '4px' }} />}
                      </Box>
                      <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Date: {n.date} · Author: {n.author}</Typography>
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
