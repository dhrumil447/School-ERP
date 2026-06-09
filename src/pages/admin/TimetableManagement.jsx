import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Alert, Snackbar, Tooltip,
} from '@mui/material';
import { Edit, Save, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockTimetable, mockPeriods, mockDays, mockSubjectColors } from '../../data/mockData';

const CLASSES = ['10A', '9A'];

export default function TimetableManagement() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [editOpen, setEditOpen] = useState(false);
  const [editCell, setEditCell] = useState({ day: '', period: '' });
  const [timetable, setTimetable] = useState(mockTimetable);
  const [newSubject, setNewSubject] = useState('');
  const [toast, setToast] = useState({ open: false, msg: '' });

  const classSchedule = timetable[selectedClass] || {};

  const handleEditCell = (day, periodIdx) => {
    setEditCell({ day, periodIdx });
    setNewSubject(classSchedule[day]?.[periodIdx] || '');
    setEditOpen(true);
  };

  const handleSaveCell = () => {
    setTimetable(t => ({
      ...t,
      [selectedClass]: {
        ...t[selectedClass],
        [editCell.day]: t[selectedClass][editCell.day].map((s, i) => i === editCell.periodIdx ? newSubject : s),
      },
    }));
    setEditOpen(false);
    setToast({ open: true, msg: 'Period updated' });
  };

  const subjectSet = [...new Set(Object.values(classSchedule).flat())];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Timetable Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Weekly class and teacher schedules</Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Select Class</InputLabel>
          <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} label="Select Class">
            {CLASSES.map(c => <MenuItem key={c} value={c}>Class {c}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* Legend */}
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject Legend</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {subjectSet.map(s => {
              const color = mockSubjectColors[s] || mockSubjectColors.Default;
              return (
                <Chip key={s} label={s} size="small" sx={{ bgcolor: `${color}18`, color, fontWeight: 600, fontSize: '0.72rem', border: `1px solid ${color}40` }} />
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 700, p: 0 }}>
            {/* Header Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '100px repeat(7, 1fr)', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
              <Box sx={{ p: 1.5, fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase', textAlign: 'center' }}>Day \ Period</Box>
              {mockPeriods.map((p, i) => (
                <Box key={i} sx={{ p: 1.5, textAlign: 'center', borderLeft: '1px solid', borderColor: 'divider' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>P{i + 1}</Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>{p.split('–')[0]}</Typography>
                </Box>
              ))}
            </Box>

            {/* Day Rows */}
            {mockDays.map((day, di) => (
              <Box key={day} sx={{
                display: 'grid', gridTemplateColumns: '100px repeat(7, 1fr)',
                borderBottom: '1px solid', borderColor: 'divider',
                bgcolor: di % 2 === 0 ? 'transparent' : 'action.hover',
              }}>
                <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: 'primary.main' }}>{day.slice(0, 3)}</Typography>
                </Box>
                {(classSchedule[day] || []).map((subject, pi) => {
                  const color = mockSubjectColors[subject] || mockSubjectColors.Default;
                  return (
                    <Tooltip key={pi} title={`Click to edit — ${mockPeriods[pi]}`} arrow>
                      <Box
                        onClick={() => handleEditCell(day, pi)}
                        sx={{
                          p: 0.75, borderLeft: '1px solid', borderColor: 'divider',
                          cursor: 'pointer', textAlign: 'center',
                          transition: 'all 0.15s',
                          '&:hover': { bgcolor: `${color}20` },
                        }}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Box sx={{
                            py: 0.8, px: 0.5, borderRadius: 1.5,
                            bgcolor: `${color}18`, border: `1.5px solid ${color}40`,
                          }}>
                            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color, lineHeight: 1.3 }}>
                              {subject}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Period Info */}
      <Card sx={{ mt: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>Period Schedule</Typography>
          <Grid container spacing={1}>
            {mockPeriods.map((p, i) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: '0.85rem' }}>P{i + 1}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.3 }}>{p}</Typography>
                  {p.includes('10:15') && <Chip label="Break" size="small" sx={{ mt: 0.5, fontSize: '0.6rem', height: 16 }} />}
                  {p.includes('12:00') && <Chip label="Lunch" size="small" sx={{ mt: 0.5, fontSize: '0.6rem', height: 16, bgcolor: 'warning.main', color: 'white' }} />}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Cell Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Edit Period</Typography>
          <IconButton onClick={() => setEditOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', mb: 2 }}>
            {editCell.day} · Period {editCell.periodIdx + 1} · {mockPeriods[editCell.periodIdx]}
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Subject</InputLabel>
            <Select value={newSubject} onChange={e => setNewSubject(e.target.value)} label="Subject">
              {Object.keys(mockSubjectColors).filter(s => s !== 'Default').map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setEditOpen(false)} variant="outlined" size="small">Cancel</Button>
          <Button onClick={handleSaveCell} variant="contained" size="small" startIcon={<Save />}>Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={2000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
