import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Snackbar, Tabs, Tab, Divider, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Add, Receipt, Download, Close, CreditCard, CheckCircle, Warning, Block } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockFeeTransactions, mockFeeStatusSummary, mockMonthlyFeeData, mockIncomeBreakdown, mockExpenseBreakdown } from '../../data/mockData';
import { useTheme } from '@mui/material/styles';

export default function FeeManagement() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [transactions, setTransactions] = useState(mockFeeTransactions);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [collectOpen, setCollectOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: '' });
  const [payMethod, setPayMethod] = useState('Cash');

  const totalCollected = transactions.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === 'Pending').reduce((s, t) => s + t.amount, 0);
  const totalPartial = transactions.filter(t => t.status === 'Partial').reduce((s, t) => s + t.amount, 0);

  const handleCollect = () => {
    setTransactions(t => t.map(x => x.id === selected.id ? { ...x, status: 'Paid', date: new Date().toISOString().split('T')[0], method: payMethod, receiptNo: `REC2025${Math.floor(Math.random() * 900) + 100}` } : x));
    setCollectOpen(false);
    setToast({ open: true, msg: `Fee collected from ${selected.studentName}` });
  };

  const TTStyle = { backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#0f172a', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 };

  const statusConfig = {
    Paid: { color: '#22c55e', icon: <CheckCircle sx={{ fontSize: 14 }} />, chipColor: 'success' },
    Pending: { color: '#ef4444', icon: <Warning sx={{ fontSize: 14 }} />, chipColor: 'error' },
    Partial: { color: '#f59e0b', icon: <Block sx={{ fontSize: 14 }} />, chipColor: 'warning' },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Fee Management</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Track fee collections, pending dues, and financial reports</Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Collected', value: `₹${(totalCollected / 1000).toFixed(0)}K`, color: '#22c55e', icon: '💰' },
          { label: 'Pending', value: `₹${(totalPending / 1000).toFixed(0)}K`, color: '#ef4444', icon: '⚠️' },
          { label: 'Partial', value: `₹${(totalPartial / 1000).toFixed(0)}K`, color: '#f59e0b', icon: '🔄' },
          { label: 'Collection Rate', value: `${Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%`, color: '#4f46e5', icon: '📊' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Card sx={{ borderRadius: 3, border: `1px solid ${s.color}25`, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.color}50)` }} />
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '1.6rem', mb: 0.5 }}>{s.icon}</Typography>
                  <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mt: 0.5 }}>{s.label}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Transactions" />
        <Tab label="Fee Analytics" />
      </Tabs>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  {['Receipt', 'Student', 'Class', 'Amount', 'Date', 'Method', 'Term', 'Status', 'Actions'].map(h => (
                    <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t, i) => {
                  const cfg = statusConfig[t.status] || statusConfig.Pending;
                  return (
                    <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      component={TableRow} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'text.secondary' }}>{t.receiptNo}</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.studentName}</TableCell>
                      <TableCell><Chip label={t.class} size="small" sx={{ fontWeight: 600 }} /></TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>₹{t.amount.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{t.date || '—'}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{t.method}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{t.term}</TableCell>
                      <TableCell><Chip label={t.status} color={cfg.chipColor} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem' }} /></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {t.status !== 'Paid' && (
                            <Button size="small" variant="contained" sx={{ fontSize: '0.7rem', py: 0.3, px: 1, minWidth: 0, background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
                              onClick={() => { setSelected(t); setCollectOpen(true); }}>
                              Collect
                            </Button>
                          )}
                          {t.status === 'Paid' && (
                            <IconButton size="small" onClick={() => { setSelected(t); setReceiptOpen(true); }}>
                              <Receipt fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {tab === 1 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Fee Status Distribution</Typography>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={mockFeeStatusSummary} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="count" paddingAngle={3}>
                      {mockFeeStatusSummary.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <ChartTooltip contentStyle={TTStyle} formatter={(v, n) => [`${v} students`, n]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} formatter={(v, e) => <span style={{ color: theme.palette.text.secondary }}>{e.payload.status}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Monthly Collection Trend</Typography>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={mockMonthlyFeeData.current} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="collGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
                    <ChartTooltip contentStyle={TTStyle} formatter={v => `₹${v.toLocaleString()}`} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="collected" fill="url(#collGrad)" stroke="#22c55e" strokeWidth={2.5} name="Collected" dot={false} />
                    <Area type="monotone" dataKey="target" fill="transparent" stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="5 5" name="Target" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Income Breakdown</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {mockIncomeBreakdown.map((item) => (
                    <Box key={item.name}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 500 }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: item.color }}>₹{(item.value / 1000).toFixed(0)}K</Typography>
                      </Box>
                      <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(item.value / 380000) * 100}%`, bgcolor: item.color, borderRadius: 3 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Expense Breakdown</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {mockExpenseBreakdown.map((item) => (
                    <Box key={item.name}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 500 }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: item.color }}>₹{(item.value / 1000).toFixed(0)}K</Typography>
                      </Box>
                      <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(item.value / 210000) * 100}%`, bgcolor: item.color, borderRadius: 3 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Collect Fee Dialog */}
      <Dialog open={collectOpen} onClose={() => setCollectOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Collect Fee Payment</DialogTitle>
        <DialogContent>
          {selected && (
            <Box>
              <Typography sx={{ mb: 2, color: 'text.secondary' }}>Recording payment for <strong>{selected.studentName}</strong></Typography>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', mb: 2 }}>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Amount Due</Typography>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'primary.main' }}>₹{selected.amount.toLocaleString()}</Typography>
              </Box>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select value={payMethod} onChange={e => setPayMethod(e.target.value)} label="Payment Method">
                  {['Cash', 'Online', 'UPI', 'Cheque', 'NEFT'].map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setCollectOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleCollect} variant="contained" color="success">Confirm Payment</Button>
        </DialogActions>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptOpen} onClose={() => setReceiptOpen(false)} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Fee Receipt</Typography>
          <IconButton onClick={() => setReceiptOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ p: 3, border: '2px solid', borderColor: 'primary.main', borderRadius: 2, mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: 'primary.main', mb: 1 }}>🏫 EduVerse School</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>OFFICIAL FEE RECEIPT</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2 }}>{selected.receiptNo}</Typography>
                {[
                  ['Student', selected.studentName],
                  ['Class', selected.class],
                  ['Amount', `₹${selected.amount.toLocaleString()}`],
                  ['Date', selected.date],
                  ['Method', selected.method],
                  ['Term', selected.term],
                ].map(([k, v]) => (
                  <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                    <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{k}:</Typography>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>{v}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1.5 }} />
                <Chip label="✅ PAYMENT RECEIVED" color="success" sx={{ fontWeight: 700 }} />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button fullWidth variant="contained" startIcon={<Download />} onClick={() => setReceiptOpen(false)}>Download Receipt</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
