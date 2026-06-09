import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress, useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { mockMonthlyAttendance } from '../../data/mockData';

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const myAttData = months.map((m, i) => ({ month: m, pct: Math.min(98, Math.max(70, 85 + Math.sin(i) * 8 + Math.random() * 5)) }));
const COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

export default function StudentAttendance() {
  const theme = useTheme();
  const myOverall = 89;
  const TTStyle = { backgroundColor: '#0f172a', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 };
  const pieData = [
    { name: 'Present', value: 160, color: '#22c55e' },
    { name: 'Absent', value: 18, color: '#ef4444' },
    { name: 'Late', value: 2, color: '#f59e0b' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>My Attendance</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Your attendance record for the academic year</Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Overall', value: `${myOverall}%`, color: myOverall >= 85 ? '#22c55e' : '#f59e0b', icon: '📊' },
          { label: 'Present Days', value: '160', color: '#22c55e', icon: '✅' },
          { label: 'Absent Days', value: '18', color: '#ef4444', icon: '❌' },
          { label: 'Late Arrivals', value: '2', color: '#f59e0b', icon: '⏰' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
              <Card sx={{ borderRadius: 3, border: `1px solid ${s.color}25` }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{s.icon}</Typography>
                  <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mt: 0.5 }}>{s.label}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Overall Progress */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card sx={{ borderRadius: 3, mb: 2.5 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Attendance Goal</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
              <LinearProgress variant="determinate" value={myOverall} sx={{ flex: 1, height: 14, borderRadius: 7, '& .MuiLinearProgress-bar': { bgcolor: myOverall >= 85 ? '#22c55e' : '#f59e0b', borderRadius: 7 } }} />
              <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: myOverall >= 85 ? 'success.main' : 'warning.main', minWidth: 50 }}>{myOverall}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Chip label="Minimum: 75%" size="small" color="error" sx={{ fontSize: '0.7rem' }} />
              <Chip label="Target: 90%" size="small" color="primary" sx={{ fontSize: '0.7rem' }} />
              {myOverall >= 75 && <Chip label="✅ Above Minimum" size="small" color="success" sx={{ fontSize: '0.7rem' }} />}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Month-wise Attendance %</Typography>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={myAttData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <ChartTooltip contentStyle={TTStyle} formatter={v => `${v.toFixed(1)}%`} />
                    <Bar dataKey="pct" name="Attendance" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Breakdown</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} innerRadius={40} dataKey="value" paddingAngle={3}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <ChartTooltip contentStyle={TTStyle} formatter={(v, n) => [`${v} days`, n]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} formatter={(v, e) => <span style={{ color: theme.palette.text.secondary }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
