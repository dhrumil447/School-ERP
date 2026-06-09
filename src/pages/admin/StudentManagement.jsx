import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Chip, Avatar, IconButton,
  TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, MenuItem, Select, FormControl, InputLabel, Tooltip, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Tabs, Tab, Divider, LinearProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add, Search, Edit, Delete, Visibility, FilterList, FileDownload, Close,
  Person, Phone, Email, School, CalendarToday, LocationOn, Bloodtype,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { mockStudents } from '../../data/mockData';

const statusColor = { paid: 'success', pending: 'error', partial: 'warning' };

function StudentForm({ student, onSave, onClose }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: student || {} });
  const onSubmit = (data) => { onSave(data); onClose(); };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {[
          { name: 'name', label: 'Full Name', required: true },
          { name: 'rollNo', label: 'Roll Number', required: true },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone' },
          { name: 'parentName', label: 'Parent Name' },
          { name: 'parentPhone', label: 'Parent Phone' },
          { name: 'address', label: 'Address' },
          { name: 'bloodGroup', label: 'Blood Group' },
        ].map(f => (
          <Grid item xs={12} sm={6} key={f.name}>
            <TextField fullWidth label={f.label} type={f.type || 'text'} size="small"
              {...register(f.name, f.required ? { required: `${f.label} is required` } : {})}
              error={!!errors[f.name]} helperText={errors[f.name]?.message} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Class</InputLabel>
            <Controller name="class" control={control} render={({ field }) => (
              <Select {...field} label="Class">
                {['5','6','7','8','9','10'].map(c => <MenuItem key={c} value={c}>Class {c}</MenuItem>)}
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Section</InputLabel>
            <Controller name="section" control={control} render={({ field }) => (
              <Select {...field} label="Section">
                {['A','B','C'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
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
          <FormControl fullWidth size="small">
            <InputLabel>Fee Status</InputLabel>
            <Controller name="feeStatus" control={control} render={({ field }) => (
              <Select {...field} label="Fee Status">
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="partial">Partial</MenuItem>
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Date of Birth" type="date" size="small"
            {...register('dob')} InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onClose} variant="outlined" size="small">Cancel</Button>
        <Button type="submit" variant="contained" size="small">
          {student?.id ? 'Update Student' : 'Add Student'}
        </Button>
      </Box>
    </Box>
  );
}

function StudentProfile({ student, onClose }) {
  const [tab, setTab] = useState(0);
  if (!student) return null;
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem', fontWeight: 700 }}>
          {student.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 800 }}>{student.name}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>Roll: {student.rollNo} · Class {student.class}{student.section}</Typography>
          <Chip label={student.feeStatus} color={statusColor[student.feeStatus]} size="small" sx={{ mt: 0.5, fontSize: '0.7rem' }} />
        </Box>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Personal Info" sx={{ fontSize: '0.8rem' }} />
        <Tab label="Academic" sx={{ fontSize: '0.8rem' }} />
        <Tab label="Attendance" sx={{ fontSize: '0.8rem' }} />
      </Tabs>
      {tab === 0 && (
        <Grid container spacing={2}>
          {[
            { icon: <Person sx={{ fontSize: 16 }} />, label: 'Gender', value: student.gender },
            { icon: <CalendarToday sx={{ fontSize: 16 }} />, label: 'Date of Birth', value: student.dob },
            { icon: <Phone sx={{ fontSize: 16 }} />, label: 'Phone', value: student.phone },
            { icon: <Email sx={{ fontSize: 16 }} />, label: 'Email', value: student.email },
            { icon: <Person sx={{ fontSize: 16 }} />, label: 'Parent Name', value: student.parentName },
            { icon: <Phone sx={{ fontSize: 16 }} />, label: 'Parent Phone', value: student.parentPhone },
            { icon: <Bloodtype sx={{ fontSize: 16 }} />, label: 'Blood Group', value: student.bloodGroup },
            { icon: <LocationOn sx={{ fontSize: 16 }} />, label: 'Address', value: student.address },
          ].map((f, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
                <Box sx={{ color: 'primary.main', mt: 0.1 }}>{f.icon}</Box>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, mt: 0.2 }}>{f.value || 'N/A'}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {tab === 1 && (
        <Box>
          <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', mb: 2 }}>
            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Class & Section</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Class {student.class} - Section {student.section}</Typography>
          </Box>
          <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Admission Date</Typography>
            <Typography sx={{ fontWeight: 700 }}>{student.admissionDate}</Typography>
          </Box>
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 1 }}>Overall Attendance</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress variant="determinate" value={student.attendance} sx={{ height: 10, borderRadius: 5 }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: student.attendance >= 85 ? 'success.main' : 'error.main' }}>
              {student.attendance}%
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8rem', color: student.attendance >= 75 ? 'success.main' : 'error.main', mt: 1 }}>
            {student.attendance >= 75 ? '✅ Attendance is satisfactory' : '⚠️ Attendance below minimum threshold'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function StudentManagement() {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterFee, setFilterFee] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => students.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search) || s.email?.toLowerCase().includes(search.toLowerCase());
    const matchClass = !filterClass || s.class === filterClass;
    const matchFee = !filterFee || s.feeStatus === filterFee;
    return matchSearch && matchClass && matchFee;
  }), [students, search, filterClass, filterFee]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSave = (data) => {
    if (data.id) {
      setStudents(s => s.map(x => x.id === data.id ? { ...x, ...data } : x));
      setToast({ open: true, msg: 'Student updated successfully', severity: 'success' });
    } else {
      const newStudent = { ...data, id: `S${Date.now()}`, attendance: 0, admissionDate: new Date().toISOString().split('T')[0] };
      setStudents(s => [...s, newStudent]);
      setToast({ open: true, msg: 'Student added successfully', severity: 'success' });
    }
  };

  const handleDelete = () => {
    setStudents(s => s.filter(x => x.id !== selected.id));
    setDeleteOpen(false);
    setSelected(null);
    setToast({ open: true, msg: 'Student deleted', severity: 'info' });
  };

  const exportCSV = () => {
    const headers = ['ID','Name','Roll No','Class','Section','Email','Phone','Fee Status','Attendance'];
    const rows = filtered.map(s => [s.id, s.name, s.rollNo, s.class, s.section, s.email, s.phone, s.feeStatus, s.attendance]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'students.csv'; a.click();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Student Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Manage all {students.length} enrolled students
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={exportCSV} size="small">Export</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setFormOpen(true); }} size="small"
            sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
            Add Student
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total', value: students.length, color: '#4f46e5' },
          { label: 'Fee Paid', value: students.filter(s => s.feeStatus === 'paid').length, color: '#22c55e' },
          { label: 'Fee Pending', value: students.filter(s => s.feeStatus === 'pending').length, color: '#ef4444' },
          { label: 'Low Attendance', value: students.filter(s => s.attendance < 75).length, color: '#f59e0b' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ borderRadius: 2.5, border: `1px solid ${s.color}25` }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</Typography>
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
            <TextField placeholder="Search by name, roll no, email..." size="small" sx={{ flex: 1, minWidth: 200 }}
              value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Class</InputLabel>
              <Select value={filterClass} onChange={e => setFilterClass(e.target.value)} label="Class">
                <MenuItem value="">All Classes</MenuItem>
                {['5','6','7','8','9','10'].map(c => <MenuItem key={c} value={c}>Class {c}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Fee Status</InputLabel>
              <Select value={filterFee} onChange={e => setFilterFee(e.target.value)} label="Fee Status">
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="partial">Partial</MenuItem>
              </Select>
            </FormControl>
            {(search || filterClass || filterFee) && (
              <Button size="small" onClick={() => { setSearch(''); setFilterClass(''); setFilterFee(''); }}>Clear</Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
      <Card sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'background.default' }}>
                {['Student', 'Roll No', 'Class', 'Contact', 'Parent', 'Attendance', 'Fee Status', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', py: 1.5 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  component={TableRow} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, bgcolor: `hsl(${(s.id.charCodeAt(1) * 37) % 360},60%,60%)`, fontSize: '0.85rem', fontWeight: 700 }}>
                        {s.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>{s.name}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{s.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{s.rollNo}</TableCell>
                  <TableCell><Chip label={`${s.class}${s.section}`} size="small" sx={{ fontWeight: 600 }} /></TableCell>
                  <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{s.phone}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.82rem' }}>{s.parentName}</Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{s.parentPhone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress variant="determinate" value={s.attendance} sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: s.attendance >= 85 ? 'success.main' : s.attendance >= 75 ? 'warning.main' : 'error.main' } }} />
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, minWidth: 32, color: s.attendance >= 85 ? 'success.main' : s.attendance >= 75 ? 'warning.main' : 'error.main' }}>{s.attendance}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Chip label={s.feeStatus} color={statusColor[s.feeStatus]} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem', textTransform: 'capitalize' }} /></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="View Profile">
                        <IconButton size="small" onClick={() => { setSelected(s); setProfileOpen(true); }} sx={{ color: 'primary.main' }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => { setSelected(s); setFormOpen(true); }} sx={{ color: 'text.secondary' }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => { setSelected(s); setDeleteOpen(true); }} sx={{ color: 'error.main' }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </motion.tr>
              ))}
              {paged.length === 0 && (
                <TableRow><TableCell colSpan={8} sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  No students found matching your criteria.
                </TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div" count={filtered.length} page={page} rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>{selected?.id ? 'Edit Student' : 'Add New Student'}</Typography>
          <IconButton onClick={() => setFormOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <StudentForm student={selected} onSave={handleSave} onClose={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Student Profile</Typography>
          <IconButton onClick={() => setProfileOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent><StudentProfile student={selected} onClose={() => setProfileOpen(false)} /></DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{selected?.name}</strong>? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))} sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
