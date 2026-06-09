import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Snackbar, Tabs, Tab, FormControl, InputLabel, Select, MenuItem,
  LinearProgress, Avatar, Divider,
} from '@mui/material';
import { Add, Close, Save, Publish, Visibility, Edit } from '@mui/icons-material';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { mockResults, mockStudents, mockSubjectPerformance } from '../../data/mockData';
import { useTheme } from '@mui/material/styles';

const subjects = ['Math', 'English', 'Science', 'Hindi', 'SST', 'CS'];
const gradeColor = { 'A+': '#22c55e', 'A': '#06b6d4', 'B+': '#4f46e5', 'B': '#8b5cf6', 'C': '#f59e0b', 'F': '#ef4444' };

export default function ResultManagement() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [results, setResults] = useState(mockResults);
  const [marksOpen, setMarksOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newMarks, setNewMarks] = useState({});
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [toast, setToast] = useState({ open: false, msg: '' });

  const TTStyle = { backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#0f172a', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 };

  const computeGrade = (pct) => {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    return 'F';
  };

  const handleSaveMarks = () => {
    if (!selectedStudent) return;
    const student = mockStudents.find(s => s.id === selectedStudent);
    const total = Object.values(newMarks).reduce((s, v) => s + Number(v), 0);
    const pct = Math.round((total / (subjects.length * 100)) * 100);
    const newResult = {
      id: `R${Date.now()}`,
      studentId: selectedStudent,
      studentName: student.name,
      class: `${student.class}${student.section}`,
      term: selectedTerm,
      subjects: newMarks,
      total,
      grade: computeGrade(pct),
      percentage: pct,
      rank: results.length + 1,
      status: 'Draft',
    };
    setResults(r => [...r, newResult]);
    setMarksOpen(false);
    setNewMarks({});
    setToast({ open: true, msg: 'Marks saved successfully' });
  };

  const togglePublish = (id) => {
    setResults(r => r.map(x => x.id === id ? { ...x, status: x.status === 'Published' ? 'Draft' : 'Published' } : x));
  };

  const subjectRadar = selected ? subjects.map(s => ({ subject: s, score: selected.subjects[s] || 0 })) : [];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Result Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Manage student marks, results and report cards</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setMarksOpen(true)} size="small"
          sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          Add Marks
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Results', value: results.length, color: '#4f46e5' },
          { label: 'Published', value: results.filter(r => r.status === 'Published').length, color: '#22c55e' },
          { label: 'Draft', value: results.filter(r => r.status === 'Draft').length, color: '#f59e0b' },
          { label: 'Avg %', value: `${Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)}%`, color: '#8b5cf6' },
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

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="All Results" />
        <Tab label="Subject Analysis" />
      </Tabs>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  {['Student', 'Class', 'Term', ...subjects, 'Total', 'Grade', 'Status', 'Actions'].map(h => (
                    <TableCell key={h} sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5, whiteSpace: 'nowrap' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    component={TableRow} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{r.studentName}</TableCell>
                    <TableCell><Chip label={r.class} size="small" sx={{ fontWeight: 600 }} /></TableCell>
                    <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{r.term}</TableCell>
                    {subjects.map(s => (
                      <TableCell key={s} sx={{ fontSize: '0.82rem', fontWeight: 500, textAlign: 'center' }}>
                        <Box sx={{
                          display: 'inline-block', px: 1, py: 0.2, borderRadius: 1, fontWeight: 600, fontSize: '0.78rem',
                          bgcolor: r.subjects[s] >= 80 ? 'rgba(34,197,94,0.1)' : r.subjects[s] >= 60 ? 'rgba(79,70,229,0.1)' : 'rgba(239,68,68,0.1)',
                          color: r.subjects[s] >= 80 ? '#22c55e' : r.subjects[s] >= 60 ? '#4f46e5' : '#ef4444',
                        }}>
                          {r.subjects[s] || '-'}
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.total}</TableCell>
                    <TableCell>
                      <Chip label={r.grade} size="small" sx={{ fontWeight: 700, bgcolor: `${gradeColor[r.grade]}20`, color: gradeColor[r.grade], fontSize: '0.72rem' }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={r.status} size="small" color={r.status === 'Published' ? 'success' : 'default'} sx={{ fontSize: '0.72rem' }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => { setSelected(r); setViewOpen(true); }} sx={{ color: 'primary.main' }}><Visibility fontSize="small" /></IconButton>
                        <Button size="small" variant={r.status === 'Published' ? 'outlined' : 'contained'} color={r.status === 'Published' ? 'error' : 'success'}
                          onClick={() => togglePublish(r.id)} sx={{ fontSize: '0.68rem', py: 0.2, px: 0.8, minWidth: 0 }}>
                          {r.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </Button>
                      </Box>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {tab === 1 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Subject-wise Average Performance</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={mockSubjectPerformance} margin={{ top: 5, right: 5, left: -15, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 10 }} angle={-35} textAnchor="end" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <ChartTooltip contentStyle={TTStyle} formatter={v => `${v}%`} />
                    <Bar dataKey="average" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Grade Distribution</Typography>
                {Object.entries({ 'A+': 45, 'A': 80, 'B+': 120, 'B': 95, 'C': 60, 'F': 12 }).map(([grade, count]) => (
                  <Box key={grade} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Chip label={grade} size="small" sx={{ bgcolor: `${gradeColor[grade]}20`, color: gradeColor[grade], fontWeight: 700, fontSize: '0.7rem' }} />
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: gradeColor[grade] }}>{count} students</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={(count / 120) * 100} sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: gradeColor[grade] } }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Add Marks Dialog */}
      <Dialog open={marksOpen} onClose={() => setMarksOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Add Student Marks</Typography>
          <IconButton onClick={() => setMarksOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Student</InputLabel>
                <Select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} label="Select Student">
                  {mockStudents.map(s => <MenuItem key={s.id} value={s.id}>{s.name} ({s.class}{s.section})</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Term</InputLabel>
                <Select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)} label="Term">
                  <MenuItem value="Term 1">Term 1</MenuItem>
                  <MenuItem value="Term 2">Term 2</MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {subjects.map(s => (
              <Grid item xs={6} sm={4} key={s}>
                <TextField fullWidth label={s} type="number" size="small" inputProps={{ min: 0, max: 100 }}
                  value={newMarks[s] || ''} onChange={e => setNewMarks(m => ({ ...m, [s]: e.target.value }))} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Total: <strong>{Object.values(newMarks).reduce((s, v) => s + Number(v || 0), 0)}</strong> / {subjects.length * 100}</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setMarksOpen(false)} variant="outlined" size="small">Cancel</Button>
          <Button onClick={handleSaveMarks} variant="contained" size="small" startIcon={<Save />}>Save Marks</Button>
        </DialogActions>
      </Dialog>

      {/* View Result Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Result Card</Typography>
          <IconButton onClick={() => setViewOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box>
              <Box sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #4f46e520, #7c3aed10)', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{selected.studentName}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>Class {selected.class} · {selected.term} · Rank #{selected.rank}</Typography>
                  </Box>
                  <Chip label={selected.grade} size="medium" sx={{ fontWeight: 800, fontSize: '1rem', bgcolor: `${gradeColor[selected.grade]}20`, color: gradeColor[selected.grade], height: 40, px: 1 }} />
                </Box>
              </Box>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {subjects.map(s => (
                  <Grid item xs={6} key={s}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
                      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}>{s}</Typography>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: (selected.subjects[s] || 0) >= 80 ? 'success.main' : (selected.subjects[s] || 0) >= 60 ? 'primary.main' : 'error.main' }}>
                        {selected.subjects[s] || 0}/100
                      </Typography>
                      <LinearProgress variant="determinate" value={selected.subjects[s] || 0}
                        sx={{ mt: 0.5, height: 4, borderRadius: 2, '& .MuiLinearProgress-bar': { bgcolor: (selected.subjects[s] || 0) >= 80 ? '#22c55e' : (selected.subjects[s] || 0) >= 60 ? '#4f46e5' : '#ef4444' } }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Total Marks</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.3rem' }}>{selected.total}/{subjects.length * 100}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Percentage</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: 'primary.main' }}>{selected.percentage}%</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
