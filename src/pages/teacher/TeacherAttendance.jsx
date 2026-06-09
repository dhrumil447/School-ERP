import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, Avatar,
  FormControl, InputLabel, Select, MenuItem, TextField, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress,
} from '@mui/material';
import { CheckCircle, Cancel, AccessTime, Save, FileDownload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockStudents } from '../../data/mockData';

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(() => {
    const init = {};
    mockStudents.forEach(s => { init[s.id] = 'present'; });
    return init;
  });
  const [toast, setToast] = useState({ open: false, msg: '' });

  const classStudents = mockStudents.filter(s => `${s.class}${s.section}` === selectedClass);
  const classes = ['10A', '10B', '9A', '9B'];

  const setStatus = (id, status) => setAttendance(a => ({ ...a, [id]: status }));
  const markAll = (status) => setAttendance(a => { const n = { ...a }; classStudents.forEach(s => { n[s.id] = status; }); return n; });

  const presentCount = classStudents.filter(s => attendance[s.id] === 'present').length;
  const absentCount = classStudents.filter(s => attendance[s.id] === 'absent').length;
  const lateCount = classStudents.filter(s => attendance[s.id] === 'late').length;
  const attendancePct = Math.round((presentCount / classStudents.length) * 100) || 0;

  const handleSave = () => setToast({ open: true, msg: `Attendance saved for Class ${selectedClass} on ${selectedDate}` });

  const exportCSV = () => {
    const rows = [['Name', 'Roll No', 'Status']];
    classStudents.forEach(s => rows.push([s.name, s.rollNo, attendance[s.id]]));
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `attendance_${selectedClass}_${selectedDate}.csv`; a.click();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Mark Attendance</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Record daily class attendance</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={exportCSV} size="small">Export</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave} size="small"
            sx={{ background: 'linear-gradient(135deg, #c2410c, #9a3412)' }}>
            Save Attendance
          </Button>
        </Box>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} label="Class">
                  {classes.map(c => <MenuItem key={c} value={c}>Class {c}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <TextField fullWidth type="date" label="Date" size="small" value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="outlined" color="success" onClick={() => markAll('present')}>All Present</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => markAll('absent')}>All Absent</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {[
          { label: 'Total', value: classStudents.length, color: '#4f46e5' },
          { label: 'Present', value: presentCount, color: '#22c55e' },
          { label: 'Absent', value: absentCount, color: '#ef4444' },
          { label: 'Late', value: lateCount, color: '#f59e0b' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ borderRadius: 2.5, border: `1px solid ${s.color}25` }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</Typography>
                <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: s.color, lineHeight: 1.2, mt: 0.5 }}>{s.value}</Typography>
                <LinearProgress variant="determinate" value={(s.value / classStudents.length) * 100 || 0}
                  sx={{ mt: 1, height: 4, borderRadius: 2, bgcolor: `${s.color}20`, '& .MuiLinearProgress-bar': { bgcolor: s.color } }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Attendance Progress Bar */}
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>Today's Attendance Rate</Typography>
            <Typography sx={{ fontWeight: 800, color: attendancePct >= 85 ? 'success.main' : 'warning.main', fontSize: '1.1rem' }}>{attendancePct}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={attendancePct}
            sx={{ height: 10, borderRadius: 5, '& .MuiLinearProgress-bar': { bgcolor: attendancePct >= 85 ? '#22c55e' : '#f59e0b', borderRadius: 5 } }} />
        </CardContent>
      </Card>

      {/* Student List */}
      <Card sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.default' }}>
                {['#', 'Student', 'Roll No', 'Status', 'Mark'].map(h => (
                  <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {classStudents.map((s, i) => {
                const status = attendance[s.id];
                return (
                  <TableRow key={s.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>{i + 1}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: `hsl(${i * 37 % 360},60%,60%)`, fontSize: '0.8rem', fontWeight: 700 }}>
                          {s.name.charAt(0)}
                        </Avatar>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.82rem', fontFamily: 'monospace' }}>{s.rollNo}</TableCell>
                    <TableCell>
                      <Chip label={status} size="small"
                        icon={status === 'present' ? <CheckCircle sx={{ fontSize: '14px!important' }} /> : status === 'absent' ? <Cancel sx={{ fontSize: '14px!important' }} /> : <AccessTime sx={{ fontSize: '14px!important' }} />}
                        sx={{
                          fontWeight: 600, fontSize: '0.72rem', textTransform: 'capitalize',
                          bgcolor: status === 'present' ? 'rgba(34,197,94,0.12)' : status === 'absent' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
                          color: status === 'present' ? '#22c55e' : status === 'absent' ? '#ef4444' : '#f59e0b',
                        }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {['present', 'absent', 'late'].map(st => (
                          <Button key={st} size="small" variant={status === st ? 'contained' : 'outlined'}
                            onClick={() => setStatus(s.id, st)}
                            sx={{
                              minWidth: 0, px: 1.2, py: 0.3, fontSize: '0.7rem', textTransform: 'capitalize',
                              borderColor: st === 'present' ? '#22c55e' : st === 'absent' ? '#ef4444' : '#f59e0b',
                              color: status === st ? 'white' : st === 'present' ? '#22c55e' : st === 'absent' ? '#ef4444' : '#f59e0b',
                              bgcolor: status === st ? (st === 'present' ? '#22c55e' : st === 'absent' ? '#ef4444' : '#f59e0b') : 'transparent',
                              '&:hover': { bgcolor: st === 'present' ? '#22c55e20' : st === 'absent' ? '#ef444420' : '#f59e0b20' },
                            }}>
                            {st === 'present' ? 'P' : st === 'absent' ? 'A' : 'L'}
                          </Button>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
