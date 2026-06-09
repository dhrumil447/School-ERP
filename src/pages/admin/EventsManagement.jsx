import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Alert, Snackbar,
} from '@mui/material';
import { Add, Edit, Delete, Close, Event, LocationOn, Person, Schedule } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { mockEvents } from '../../data/mockData';

const CATEGORIES = ['Academic', 'Sports', 'Cultural', 'Holiday', 'Exam', 'Meeting'];
const categoryConfig = {
  Academic: { color: '#4f46e5', icon: '📚' },
  Sports: { color: '#22c55e', icon: '⚽' },
  Cultural: { color: '#ec4899', icon: '🎭' },
  Holiday: { color: '#f59e0b', icon: '🏖️' },
  Exam: { color: '#8b5cf6', icon: '📝' },
  Meeting: { color: '#06b6d4', icon: '🤝' },
};

function EventForm({ event, onSave, onClose }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: event || { category: 'Academic' } });
  const onSubmit = (data) => { onSave(data); onClose(); };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Event Name" size="small"
            {...register('name', { required: 'Event name is required' })} error={!!errors.name} helperText={errors.name?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Date" type="date" size="small"
            {...register('date', { required: 'Date is required' })} InputLabelProps={{ shrink: true }} error={!!errors.date} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Time" size="small" {...register('time')} placeholder="09:00 AM" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Location" size="small" {...register('location')} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Controller name="category" control={control} render={({ field }) => (
              <Select {...field} label="Category">
                {CATEGORIES.map(c => <MenuItem key={c} value={c}>{categoryConfig[c]?.icon} {c}</MenuItem>)}
              </Select>
            )} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Description" size="small" multiline rows={3} {...register('description')} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Organizer" size="small" {...register('organizer')} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', mt: 2.5 }}>
        <Button onClick={onClose} variant="outlined" size="small">Cancel</Button>
        <Button type="submit" variant="contained" size="small">{event?.id ? 'Update Event' : 'Add Event'}</Button>
      </Box>
    </Box>
  );
}

export default function EventsManagement() {
  const [events, setEvents] = useState(mockEvents);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: '' });
  const [filterCat, setFilterCat] = useState('All');

  const filtered = filterCat === 'All' ? events : events.filter(e => e.category === filterCat);

  const handleSave = (data) => {
    if (data.id) {
      setEvents(ev => ev.map(x => x.id === data.id ? { ...x, ...data } : x));
    } else {
      setEvents(ev => [...ev, { ...data, id: Date.now() }]);
    }
    setToast({ open: true, msg: data.id ? 'Event updated' : 'Event added' });
  };

  const handleDelete = () => {
    setEvents(ev => ev.filter(x => x.id !== selected.id));
    setDeleteOpen(false);
    setToast({ open: true, msg: 'Event deleted' });
  };

  const upcoming = events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Events Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{upcoming.length} upcoming events</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setFormOpen(true); }} size="small"
          sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          Add Event
        </Button>
      </Box>

      {/* Next Event Banner */}
      {upcoming[0] && (() => {
        const cfg = categoryConfig[upcoming[0].category] || { color: '#4f46e5', icon: '📅' };
        return (
          <Card sx={{ mb: 3, borderRadius: 3, background: `linear-gradient(135deg, ${cfg.color}20, ${cfg.color}08)`, border: `1px solid ${cfg.color}30` }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem' }}>{cfg.icon}</Box>
                  <Box>
                    <Chip label="Next Event" size="small" sx={{ mb: 0.5, bgcolor: `${cfg.color}20`, color: cfg.color, fontWeight: 700, fontSize: '0.65rem' }} />
                    <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{upcoming[0].name}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>📅 {new Date(upcoming[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>🕐 {upcoming[0].time}</Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>📍 {upcoming[0].location}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })()}

      {/* Category Filter */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
        {['All', ...CATEGORIES].map(c => (
          <Chip key={c} label={`${categoryConfig[c]?.icon || '📅'} ${c}`} size="small" onClick={() => setFilterCat(c)}
            sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.72rem',
              bgcolor: filterCat === c ? 'primary.main' : 'action.hover',
              color: filterCat === c ? 'white' : 'text.secondary',
            }} />
        ))}
      </Box>

      {/* Events Grid */}
      <Grid container spacing={2}>
        {filtered.map((ev, i) => {
          const cfg = categoryConfig[ev.category] || { color: '#4f46e5', icon: '📅' };
          const isPast = new Date(ev.date) < new Date();
          return (
            <Grid item xs={12} sm={6} md={4} key={ev.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                <Card sx={{ borderRadius: 3, height: '100%', position: 'relative', overflow: 'hidden', border: `1px solid ${cfg.color}25`, opacity: isPast ? 0.7 : 1, '&:hover': { boxShadow: `0 8px 24px ${cfg.color}20` }, transition: 'all 0.2s' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}50)` }} />
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Box sx={{ fontSize: '2rem' }}>{cfg.icon}</Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {isPast && <Chip label="Past" size="small" sx={{ fontSize: '0.65rem', bgcolor: 'action.hover' }} />}
                        <IconButton size="small" onClick={() => { setSelected(ev); setFormOpen(true); }}><Edit sx={{ fontSize: 14 }} /></IconButton>
                        <IconButton size="small" onClick={() => { setSelected(ev); setDeleteOpen(true); }} sx={{ color: 'error.main' }}><Delete sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    </Box>
                    <Chip label={ev.category} size="small" sx={{ bgcolor: `${cfg.color}18`, color: cfg.color, fontWeight: 600, fontSize: '0.65rem', mb: 1 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, lineHeight: 1.3 }}>{ev.name}</Typography>
                    {ev.description && <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>{ev.description}</Typography>}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Event sx={{ fontSize: 13, color: cfg.color }} />
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {ev.time}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <LocationOn sx={{ fontSize: 13, color: cfg.color }} />
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{ev.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Person sx={{ fontSize: 13, color: cfg.color }} />
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{ev.organizer}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>{selected?.id ? 'Edit Event' : 'Add New Event'}</Typography>
          <IconButton onClick={() => setFormOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <EventForm event={selected} onSave={handleSave} onClose={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Event</DialogTitle>
        <DialogContent><Typography>Delete "<strong>{selected?.name}</strong>"?</Typography></DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
