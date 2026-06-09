import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress,
} from '@mui/material';
import { Save, Publish } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockStudents, mockResults } from '../../data/mockData';

const subjects = ['Math', 'English', 'Science', 'Hindi', 'SST', 'CS'];
const gradeColor = { 'A+': '#22c55e', 'A': '#06b6d4', 'B+': '#4f46e5', 'B': '#8b5cf6', 'C': '#f59e0b', 'F': '#ef4444' };

function computeGrade(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  return 'F';
}

export default function TeacherResults() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [mySubject, setMySubject] = useState('Math');
  const [marks, setMarks] = useState({});
  const [toast, setToast] = useState({ open: false, msg: '', severity: 'success' });

  const classStudents = mockStudents.filter(s => `${s.class}${s.section}` === selectedClass);

  const handleMark = (id, val) => {
    const v = Math.min(100, Math.max(0, Number(val)));
    setMarks(m => ({ ...m, [id]: isNaN(v) ? '' : v }));
  };

  const handleSave = () => setToast({ open: true, msg: `${mySubject} marks saved for ${selectedClass} (${selectedTerm})`, severity: 'success' });
  const handlePublish = () => setToast({ open: true, msg: `Results published for ${selectedClass}`, severity: 'success' });

  const filledCount = Object.values(marks).filter(v => v !== '').length;
  const avgMark = filledCount ? Math.round(Object.values(marks).reduce((s, v) => s + (Number(v) || 0), 0) / filledCount) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Enter Results</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Enter student marks for your subject</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<Save />} onClick={handleSave} size="small">Save Draft</Button>
          <Button variant="contained" startIcon={<Publish />} onClick={handlePublish} size="small"
            sx={{ background: 'linear-gradient(135deg, #c2410c, #9a3412)' }}>
            Publish
          </Button>
        </Box>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} label="Class">
                  {['10A', '10B', '9A', '9B'].map(c => <MenuItem key={c} value={c}>Class {c}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Term</InputLabel>
                <Select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)} label="Term">
                  <MenuItem value="Term 1">Term 1</MenuItem>
                  <MenuItem value="Term 2">Term 2</MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Subject</InputLabel>
                <Select value={mySubject} onChange={e => setMySubject(e.target.value)} label="Subject">
                  {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {[
          { label: 'Total Students', value: classStudents.length, color: '#4f46e5' },
          { label: 'Marks Entered', value: filledCount, color: '#22c55e' },
          { label: 'Pending', value: classStudents.length - filledCount, color: '#f59e0b' },
          { label: 'Class Average', value: `${avgMark}%`, color: '#8b5cf6' },
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

      {/* Marks Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ px: 0, py: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontWeight: 700 }}>{mySubject} Marks — {selectedClass} · {selectedTerm}</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  {['#', 'Student', 'Roll No', 'Marks (/100)', 'Grade', 'Performance'].map(h => (
                    <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {classStudents.map((s, i) => {
                  const m = marks[s.id];
                  const grade = m !== undefined && m !== '' ? computeGrade(m) : null;
                  const gColor = gradeColor[grade] || '#4f46e5';
                  return (
                    <TableRow key={s.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>{i + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 30, height: 30, bgcolor: `hsl(${i * 37 % 360},60%,60%)`, fontSize: '0.75rem', fontWeight: 700 }}>
                            {s.name.charAt(0)}
                          </Avatar>
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'text.secondary' }}>{s.rollNo}</TableCell>
                      <TableCell>
                        <TextField type="number" size="small" value={m !== undefined ? m : ''}
                          onChange={e => handleMark(s.id, e.target.value)}
                          inputProps={{ min: 0, max: 100, style: { textAlign: 'center', width: 60, fontSize: '0.9rem', fontWeight: 700 } }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }} placeholder="—" />
                      </TableCell>
                      <TableCell>
                        {grade && <Chip label={grade} size="small" sx={{ fontWeight: 800, bgcolor: `${gColor}20`, color: gColor, fontSize: '0.75rem' }} />}
                      </TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        {m !== undefined && m !== '' && (
                          <LinearProgress variant="determinate" value={Number(m)} sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: m >= 80 ? '#22c55e' : m >= 60 ? '#4f46e5' : '#ef4444' } }} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
