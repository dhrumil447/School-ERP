import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Chip, Avatar, IconButton,
  TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, MenuItem, Select, FormControl, InputLabel, Tooltip, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Tabs, Tab,
} from '@mui/material';
import { Add, Search, Edit, Delete, Visibility, FileDownload, Close, Email, Phone, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { mockTeachers } from '../../data/mockData';

function TeacherForm({ teacher, onSave, onClose }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: teacher || {} });
  const subjects = ['Mathematics', 'English', 'Science', 'Hindi', 'Social Studies', 'Computer Science', 'Physical Education', 'Art & Craft'];
  const onSubmit = (data) => { onSave(data); onClose(); };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {[
          { name: 'name', label: 'Full Name', required: true },
          { name: 'employeeId', label: 'Employee ID', required: true },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone' },
          { name: 'qualification', label: 'Qualification' },
          { name: 'experience', label: 'Experience (Years)', type: 'number' },
          { name: 'address', label: 'Address' },
          { name: 'salary', label: 'Salary (₹)', type: 'number' },
        ].map(f => (
          <Grid item xs={12} sm={6} key={f.name}>
            <TextField fullWidth label={f.label} type={f.type || 'text'} size="small"
              {...register(f.name, f.required ? { required: `${f.label} is required` } : {})}
              error={!!errors[f.name]} helperText={errors[f.name]?.message} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Subject</InputLabel>
            <Controller name="subject" control={control} render={({ field }) => (
              <Select {...field} label="Subject">
                {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Gender</InputLabel>
            <Controller name="gender" control={control} render={({ field }) => (
              <Select {...field} label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Join Date" type="date" size="small"
            {...register('joinDate')} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Controller name="status" control={control} render={({ field }) => (
              <Select {...field} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            )} />
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onClose} variant="outlined" size="small">Cancel</Button>
        <Button type="submit" variant="contained" size="small">
          {teacher?.id ? 'Update Teacher' : 'Add Teacher'}
        </Button>
      </Box>
    </Box>
  );
}

function TeacherProfile({ teacher }) {
  if (!teacher) return null;
  const subjectColor = { Mathematics: '#4f46e5', English: '#22c55e', Science: '#06b6d4', Hindi: '#f59e0b', 'Social Studies': '#8b5cf6', 'Computer Science': '#ec4899', 'Physical Education': '#ef4444', 'Art & Craft': '#84cc16' };
  const color = subjectColor[teacher.subject] || '#4f46e5';
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3, p: 2, borderRadius: 1, bgcolor: 'action.hover', border: '1px solid #e2e8f0' }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: color, fontSize: '1.5rem', fontWeight: 700 }}>{teacher.name.charAt(0)}</Avatar>
        <Box>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 800 }}>{teacher.name}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{teacher.employeeId}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <Chip label={teacher.subject} size="small" sx={{ bgcolor: 'background.paper', borderColor: 'divider', border: '1px solid', fontWeight: 600, fontSize: '0.7rem' }} />
            <Chip label={teacher.status} color="success" size="small" sx={{ fontSize: '0.7rem' }} />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={1.5}>
        {[
          { label: 'Email', value: teacher.email, icon: '📧' },
          { label: 'Phone', value: teacher.phone, icon: '📞' },
          { label: 'Qualification', value: teacher.qualification, icon: '🎓' },
          { label: 'Experience', value: `${teacher.experience} years`, icon: '⏳' },
          { label: 'Join Date', value: teacher.joinDate, icon: '📅' },
          { label: 'Salary', value: `₹${teacher.salary?.toLocaleString()}`, icon: '💰' },
          { label: 'Classes', value: teacher.classes?.join(', '), icon: '🏫' },
          { label: 'Address', value: teacher.address, icon: '📍' },
        ].map((f, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>{f.icon} {f.label}</Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, mt: 0.2 }}>{f.value || 'N/A'}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const subjects = [...new Set(mockTeachers.map(t => t.subject))];

  const filtered = useMemo(() => teachers.filter(t => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.employeeId.includes(search) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchSubject = !filterSubject || t.subject === filterSubject;
    return matchSearch && matchSubject;
  }), [teachers, search, filterSubject]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSave = (data) => {
    if (data.id) {
      setTeachers(t => t.map(x => x.id === data.id ? { ...x, ...data } : x));
      setToast({ open: true, msg: 'Teacher updated successfully', severity: 'success' });
    } else {
      setTeachers(t => [...t, { ...data, id: `T${Date.now()}`, attendance: 95 }]);
      setToast({ open: true, msg: 'Teacher added successfully', severity: 'success' });
    }
  };

  const handleDelete = () => {
    setTeachers(t => t.filter(x => x.id !== selected.id));
    setDeleteOpen(false);
    setSelected(null);
    setToast({ open: true, msg: 'Teacher removed', severity: 'info' });
  };

  const subjectColor = { Mathematics: '#4f46e5', English: '#22c55e', Science: '#06b6d4', Hindi: '#f59e0b', 'Social Studies': '#8b5cf6', 'Computer Science': '#ec4899', 'Physical Education': '#ef4444', 'Art & Craft': '#84cc16' };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Teacher Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{teachers.length} teachers on staff</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setFormOpen(true); }} size="small">
            Add Teacher
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Teachers', value: teachers.length, color: 'primary.main' },
          { label: 'Active', value: teachers.filter(t => t.status === 'Active').length, color: 'success.main' },
          { label: 'Avg Attendance', value: `${Math.round(teachers.reduce((s, t) => s + t.attendance, 0) / teachers.length)}%`, color: 'info.main' },
          { label: 'Avg Experience', value: `${Math.round(teachers.reduce((s, t) => s + t.experience, 0) / teachers.length)} yrs`, color: 'secondary.main' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ borderRadius: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</Typography>
                <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1.2, mt: 0.5 }}>{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2.5, borderRadius: 1 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField placeholder="Search by name, ID, subject..." size="small" sx={{ flex: 1, minWidth: 200 }}
              value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Subject</InputLabel>
              <Select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} label="Subject">
                <MenuItem value="">All Subjects</MenuItem>
                {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Teacher Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {paged.map((t, i) => {
          const color = subjectColor[t.subject] || '#4f46e5';
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={t.id}>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card sx={{ borderRadius: 1, borderColor: 'divider', height: '100%', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                  onClick={() => { setSelected(t); setProfileOpen(true); }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: 'action.hover', color: 'primary.main', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '1.1rem' }}>{t.name.charAt(0)}</Avatar>
                      <Chip label={t.status} color="success" size="small" sx={{ fontSize: '0.65rem', borderRadius: '4px' }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.3 }}>{t.name}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>{t.employeeId}</Typography>
                    <Chip label={t.subject} size="small" sx={{ bgcolor: 'action.hover', border: '1px solid #cbd5e1', fontWeight: 600, fontSize: '0.7rem', mb: 1.5, borderRadius: '4px' }} />
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {t.classes?.slice(0, 3).map(c => <Chip key={c} label={c} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 18, borderRadius: '4px' }} />)}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>⏳ {t.experience} yrs exp</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: 'success.main', fontWeight: 600 }}>✓ {t.attendance}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1, justifyContent: 'flex-end' }} onClick={e => e.stopPropagation()}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => { setSelected(t); setFormOpen(true); }}><Edit fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => { setSelected(t); setDeleteOpen(true); }} sx={{ color: 'error.main' }}><Delete fontSize="small" /></IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialogs */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>{selected?.id ? 'Edit Teacher' : 'Add New Teacher'}</Typography>
          <IconButton onClick={() => setFormOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TeacherForm teacher={selected} onSave={handleSave} onClose={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Teacher Profile</Typography>
          <IconButton onClick={() => setProfileOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent><TeacherProfile teacher={selected} /></DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Remove <strong>{selected?.name}</strong> from the system?</Typography></DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Remove</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))} sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
