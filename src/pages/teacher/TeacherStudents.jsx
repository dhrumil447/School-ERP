import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Avatar, LinearProgress,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockStudents } from '../../data/mockData';

export default function TeacherStudents() {
  const [search, setSearch] = useState('');
  const [filterFee, setFilterFee] = useState('');

  const myStudents = mockStudents.slice(0, 30);
  const filtered = myStudents.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
    const matchFee = !filterFee || s.feeStatus === filterFee;
    return matchSearch && matchFee;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>My Students</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{myStudents.length} students in your assigned classes</Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Students', value: myStudents.length, color: '#c2410c' },
          { label: 'Good Attendance', value: myStudents.filter(s => s.attendance >= 85).length, color: '#22c55e' },
          { label: 'Needs Attention', value: myStudents.filter(s => s.attendance < 75).length, color: '#ef4444' },
          { label: 'Fee Pending', value: myStudents.filter(s => s.feeStatus === 'pending').length, color: '#f59e0b' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ borderRadius: 2.5, border: `1px solid ${s.color}25` }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</Typography>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1.2, mt: 0.5 }}>{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField placeholder="Search by name or roll no..." size="small" sx={{ flex: 1, minWidth: 200 }}
              value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Fee Status</InputLabel>
              <Select value={filterFee} onChange={e => setFilterFee(e.target.value)} label="Fee Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="partial">Partial</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Student Cards */}
      <Grid container spacing={2}>
        {filtered.map((s, i) => {
          const attColor = s.attendance >= 85 ? '#22c55e' : s.attendance >= 75 ? '#f59e0b' : '#ef4444';
          return (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }}>
                <Card sx={{ borderRadius: 3, border: `1px solid ${attColor}20`, '&:hover': { boxShadow: `0 6px 20px ${attColor}15` }, transition: 'all 0.2s' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: `hsl(${i * 37 % 360},60%,60%)`, fontSize: '0.9rem', fontWeight: 700 }}>
                        {s.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{s.rollNo} · Class {s.class}{s.section}</Typography>
                      </Box>
                      <Chip label={s.feeStatus} size="small" color={s.feeStatus === 'paid' ? 'success' : s.feeStatus === 'partial' ? 'warning' : 'error'} sx={{ fontSize: '0.65rem', fontWeight: 600 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>Attendance</Typography>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: attColor }}>{s.attendance}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={s.attendance} sx={{ height: 5, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: attColor } }} />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
