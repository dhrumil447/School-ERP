import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Alert, Snackbar, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Add, Search, Edit, Delete, Close, PushPin, Announcement } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { mockNotices } from '../../data/mockData';

const CATEGORIES = ['All', 'General', 'Academic', 'Exam', 'Holiday', 'Finance', 'Cultural'];
const categoryColor = { General: '#4f46e5', Academic: '#06b6d4', Exam: '#8b5cf6', Holiday: '#22c55e', Finance: '#f59e0b', Cultural: '#ec4899' };

function NoticeForm({ notice, onSave, onClose }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: notice || { category: 'General', targetAudience: 'All', important: false } });
  const onSubmit = (data) => { onSave(data); onClose(); };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Notice Title" size="small"
            {...register('title', { required: 'Title is required' })} error={!!errors.title} helperText={errors.title?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Notice Content" size="small" multiline rows={4}
            {...register('content', { required: 'Content is required' })} error={!!errors.content} helperText={errors.content?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Controller name="category" control={control} render={({ field }) => (
              <Select {...field} label="Category">
                {CATEGORIES.filter(c => c !== 'All').map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Target Audience</InputLabel>
            <Controller name="targetAudience" control={control} render={({ field }) => (
              <Select {...field} label="Target Audience">
                {['All', 'Students', 'Teachers', 'Parents', 'Staff'].map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
            <input type="checkbox" {...register('important')} id="important" />
            <label htmlFor="important" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>Mark as Urgent/Important</label>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', mt: 2.5 }}>
        <Button onClick={onClose} variant="outlined" size="small">Cancel</Button>
        <Button type="submit" variant="contained" size="small">{notice?.id ? 'Update Notice' : 'Publish Notice'}</Button>
      </Box>
    </Box>
  );
}

export default function NoticesManagement() {
  const [notices, setNotices] = useState(mockNotices);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: '', severity: 'success' });
  const [tab, setTab] = useState(0);

  const filtered = useMemo(() => notices.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || n.category === filterCat;
    return matchSearch && matchCat;
  }), [notices, search, filterCat]);

  const important = notices.filter(n => n.important);

  const handleSave = (data) => {
    if (data.id) {
      setNotices(n => n.map(x => x.id === data.id ? { ...x, ...data } : x));
      setToast({ open: true, msg: 'Notice updated', severity: 'success' });
    } else {
      setNotices(n => [{ ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...n]);
      setToast({ open: true, msg: 'Notice published', severity: 'success' });
    }
  };

  const handleDelete = () => {
    setNotices(n => n.filter(x => x.id !== selected.id));
    setDeleteOpen(false);
    setToast({ open: true, msg: 'Notice deleted', severity: 'info' });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Notice Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{notices.length} notices published</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setFormOpen(true); }} size="small"
          sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          Create Notice
        </Button>
      </Box>

      {/* Important Notices */}
      {important.length > 0 && (
        <Card sx={{ mb: 3, borderRadius: 3, border: '1.5px solid rgba(239,68,68,0.3)', bgcolor: 'rgba(239,68,68,0.02)' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PushPin sx={{ color: 'error.main', fontSize: 18 }} />
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'error.main' }}>Important Notices</Typography>
            </Box>
            <Grid container spacing={1.5}>
              {important.map(n => (
                <Grid item xs={12} sm={6} key={n.id}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.3 }}>{n.title}</Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{n.author} · {n.date}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField placeholder="Search notices..." size="small" sx={{ flex: 1, minWidth: 200 }}
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <Chip key={c} label={c} size="small" onClick={() => setFilterCat(c)}
              sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.72rem',
                bgcolor: filterCat === c ? 'primary.main' : 'action.hover',
                color: filterCat === c ? 'white' : 'text.secondary',
              }} />
          ))}
        </Box>
      </Box>

      {/* Notices Grid */}
      <Grid container spacing={2}>
        {filtered.map((n, i) => {
          const color = categoryColor[n.category] || '#4f46e5';
          return (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card sx={{ borderRadius: 3, height: '100%', position: 'relative', overflow: 'hidden', border: `1px solid ${color}25`, '&:hover': { boxShadow: `0 8px 24px ${color}20` }, transition: 'all 0.2s' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        <Chip label={n.category} size="small" sx={{ bgcolor: `${color}18`, color, fontWeight: 600, fontSize: '0.65rem' }} />
                        {n.important && <Chip label="Urgent" size="small" color="error" sx={{ fontSize: '0.65rem' }} />}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => { setSelected(n); setFormOpen(true); }} sx={{ color: 'text.secondary' }}><Edit sx={{ fontSize: 14 }} /></IconButton>
                        <IconButton size="small" onClick={() => { setSelected(n); setDeleteOpen(true); }} sx={{ color: 'error.main' }}><Delete sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 1, lineHeight: 1.4 }}>{n.title}</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.5, mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {n.content}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>📅 {n.date}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>✍️ {n.author}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Announcement sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
              <Typography>No notices found</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>{selected?.id ? 'Edit Notice' : 'Create Notice'}</Typography>
          <IconButton onClick={() => setFormOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <NoticeForm notice={selected} onSave={handleSave} onClose={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Notice</DialogTitle>
        <DialogContent><Typography>Delete "<strong>{selected?.title}</strong>"?</Typography></DialogContent>
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
