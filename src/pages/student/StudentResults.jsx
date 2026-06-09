import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress, useTheme, Avatar,
} from '@mui/material';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { mockResults } from '../../data/mockData';

const gradeColor = { 'A+': '#22c55e', 'A': '#06b6d4', 'B+': '#4f46e5', 'B': '#8b5cf6', 'C': '#f59e0b', 'F': '#ef4444' };
const subjects = ['Math', 'English', 'Science', 'Hindi', 'SST', 'CS'];

export default function StudentResults() {
  const theme = useTheme();
  const results = mockResults.filter(r => r.status === 'Published').slice(0, 4);
  const TTStyle = { backgroundColor: '#0f172a', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>My Results</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Academic performance across terms</Typography>
      </Box>

      {results.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>No results published yet.</Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {results.map((r, i) => {
            const subjectData = subjects.map(s => ({ subject: s, score: r.subjects[s] || 0 }));
            const color = gradeColor[r.grade] || '#4f46e5';
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ borderRadius: 3, border: `1px solid ${color}20` }}>
                  <CardContent sx={{ p: 2.5 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', mb: 0.3 }}>{r.term} — Class {r.class}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip label={`Rank #${r.rank}`} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                          <Chip label={r.status} color="success" size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color, lineHeight: 1 }}>{r.grade}</Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{r.percentage}% · {r.total}/{subjects.length * 100}</Typography>
                      </Box>
                    </Box>

                    {/* Subject Scores */}
                    <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                      {subjects.map(s => {
                        const score = r.subjects[s] || 0;
                        const sc = score >= 80 ? '#22c55e' : score >= 60 ? '#4f46e5' : '#ef4444';
                        return (
                          <Grid item xs={6} sm={4} md={2} key={s}>
                            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center' }}>
                              <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>{s}</Typography>
                              <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: sc, lineHeight: 1 }}>{score}</Typography>
                              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>/100</Typography>
                              <LinearProgress variant="determinate" value={score} sx={{ mt: 0.8, height: 4, borderRadius: 2, '& .MuiLinearProgress-bar': { bgcolor: sc } }} />
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>

                    {/* Radar Chart */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                      <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={subjectData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                          <XAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                          <ChartTooltip contentStyle={TTStyle} formatter={v => `${v}/100`} />
                          <Bar dataKey="score" fill={color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
