import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab,
  LinearProgress,
} from '@mui/material';
import { Add, Search, Edit, Book, LibraryBooks, Close, Person, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { mockBooks, mockIssuedBooks, mockStudents } from '../../data/mockData';

const CATEGORIES = ['All', 'Textbook', 'Fiction', 'Science', 'Biography', 'History', 'Reference'];

export default function LibraryManagement() {
  const [books, setBooks] = useState(mockBooks);
  const [issuedBooks, setIssuedBooks] = useState(mockIssuedBooks);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [issueOpen, setIssueOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [issueStudent, setIssueStudent] = useState('');
  const [issueDue, setIssueDue] = useState('');
  const [toast, setToast] = useState({ open: false, msg: '', severity: 'success' });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const filteredBooks = useMemo(() => books.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.isbn.includes(search);
    const matchCat = filterCat === 'All' || b.category === filterCat;
    return matchSearch && matchCat;
  }), [books, search, filterCat]);

  const handleIssue = () => {
    const student = mockStudents.find(s => s.id === issueStudent);
    if (!student || !selected) return;
    const newIssue = {
      id: `ISS${Date.now()}`, bookId: selected.id, bookTitle: selected.title,
      studentId: student.id, studentName: student.name, issueDate: new Date().toISOString().split('T')[0],
      dueDate: issueDue, returnDate: null, fine: 0, status: 'Issued',
    };
    setIssuedBooks(b => [newIssue, ...b]);
    setBooks(b => b.map(x => x.id === selected.id ? { ...x, available: x.available - 1 } : x));
    setIssueOpen(false);
    setToast({ open: true, msg: `${selected.title} issued to ${student.name}`, severity: 'success' });
  };

  const handleReturn = (issue) => {
    setIssuedBooks(b => b.map(x => x.id === issue.id ? { ...x, returnDate: new Date().toISOString().split('T')[0], status: 'Returned' } : x));
    setBooks(b => b.map(x => x.id === issue.bookId ? { ...x, available: x.available + 1 } : x));
    setToast({ open: true, msg: `${issue.bookTitle} returned`, severity: 'success' });
  };

  const handleAddBook = (data) => {
    setBooks(b => [...b, { ...data, id: `B${Date.now()}`, available: parseInt(data.copies), addedDate: new Date().toISOString().split('T')[0] }]);
    reset();
    setAddOpen(false);
    setToast({ open: true, msg: 'Book added to library', severity: 'success' });
  };

  const overdueCount = issuedBooks.filter(b => b.status === 'Overdue').length;
  const issuedCount = issuedBooks.filter(b => b.status === 'Issued').length;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Library Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{books.length} books · {issuedCount} issued · {overdueCount} overdue</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)} size="small"
          sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          Add Book
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Books', value: books.reduce((s, b) => s + b.copies, 0), color: '#4f46e5', icon: '📚' },
          { label: 'Available', value: books.reduce((s, b) => s + b.available, 0), color: '#22c55e', icon: '✅' },
          { label: 'Issued', value: issuedCount, color: '#f59e0b', icon: '📤' },
          { label: 'Overdue', value: overdueCount, color: '#ef4444', icon: '⚠️' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ borderRadius: 2.5, border: `1px solid ${s.color}25` }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '1.4rem', mb: 0.3 }}>{s.icon}</Typography>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mt: 0.3 }}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Books Catalog" />
        <Tab label="Issued Books" />
      </Tabs>

      {tab === 0 && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField placeholder="Search title, author, ISBN..." size="small" sx={{ flex: 1, minWidth: 200 }}
              value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} />
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <Chip key={c} label={c} size="small" onClick={() => setFilterCat(c)}
                  sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.72rem', bgcolor: filterCat === c ? 'primary.main' : 'action.hover', color: filterCat === c ? 'white' : 'text.secondary' }} />
              ))}
            </Box>
          </Box>
          <Card sx={{ borderRadius: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    {['Book', 'Author', 'ISBN', 'Category', 'Copies', 'Available', 'Actions'].map(h => (
                      <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.map((b, i) => {
                    const availPct = (b.available / b.copies) * 100;
                    return (
                      <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        component={TableRow} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>📖</Box>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>{b.title}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{b.author}</TableCell>
                        <TableCell sx={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'text.secondary' }}>{b.isbn}</TableCell>
                        <TableCell><Chip label={b.category} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} /></TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{b.copies}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress variant="determinate" value={availPct} sx={{ flex: 1, height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: availPct > 50 ? '#22c55e' : availPct > 20 ? '#f59e0b' : '#ef4444' } }} />
                            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, minWidth: 20, color: availPct > 50 ? 'success.main' : availPct > 20 ? 'warning.main' : 'error.main' }}>{b.available}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined" disabled={b.available === 0}
                            onClick={() => { setSelected(b); setIssueOpen(true); }} sx={{ fontSize: '0.72rem', py: 0.3, px: 1 }}>
                            Issue
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  {['Book', 'Student', 'Issue Date', 'Due Date', 'Return Date', 'Fine', 'Status', 'Action'].map(h => (
                    <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {issuedBooks.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    component={TableRow} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{b.bookTitle}</TableCell>
                    <TableCell sx={{ fontSize: '0.82rem' }}>{b.studentName}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{b.issueDate}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: b.status === 'Overdue' ? 'error.main' : 'text.secondary', fontWeight: b.status === 'Overdue' ? 700 : 400 }}>{b.dueDate}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{b.returnDate || '—'}</TableCell>
                    <TableCell sx={{ color: b.fine > 0 ? 'error.main' : 'text.secondary', fontWeight: b.fine > 0 ? 700 : 400 }}>₹{b.fine}</TableCell>
                    <TableCell>
                      <Chip label={b.status} size="small" color={b.status === 'Returned' ? 'success' : b.status === 'Overdue' ? 'error' : 'warning'} sx={{ fontSize: '0.7rem', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      {b.status !== 'Returned' && (
                        <Button size="small" variant="outlined" color="success" onClick={() => handleReturn(b)} sx={{ fontSize: '0.72rem', py: 0.3 }}>Return</Button>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Issue Dialog */}
      <Dialog open={issueOpen} onClose={() => setIssueOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Issue Book</DialogTitle>
        <DialogContent>
          {selected && <Typography sx={{ mb: 2, color: 'text.secondary' }}>📖 <strong>{selected.title}</strong></Typography>}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Select Student</InputLabel>
            <Select value={issueStudent} onChange={e => setIssueStudent(e.target.value)} label="Select Student">
              {mockStudents.map(s => <MenuItem key={s.id} value={s.id}>{s.name} ({s.class}{s.section})</MenuItem>)}
            </Select>
          </FormControl>
          <TextField fullWidth label="Due Date" type="date" size="small" value={issueDue} onChange={e => setIssueDue(e.target.value)} InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setIssueOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleIssue} variant="contained" disabled={!issueStudent || !issueDue}>Issue Book</Button>
        </DialogActions>
      </Dialog>

      {/* Add Book Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Add New Book</Typography>
          <IconButton onClick={() => setAddOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(handleAddBook)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField fullWidth label="Title" size="small" {...register('title', { required: true })} />
            <TextField fullWidth label="Author" size="small" {...register('author')} />
            <TextField fullWidth label="ISBN" size="small" {...register('isbn')} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Controller name="category" control={undefined} defaultValue="Fiction" render={({ field }) => (
                    <Select {...register('category')} label="Category" defaultValue="Fiction">
                      {CATEGORIES.filter(c => c !== 'All').map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  )} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="No. of Copies" type="number" size="small" {...register('copies', { required: true })} />
              </Grid>
            </Grid>
            <TextField fullWidth label="Price (₹)" type="number" size="small" {...register('price')} />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button onClick={() => setAddOpen(false)} variant="outlined" size="small">Cancel</Button>
              <Button type="submit" variant="contained" size="small">Add Book</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))} sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
