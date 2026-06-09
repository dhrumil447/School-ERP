import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Divider, LinearProgress,
} from '@mui/material';
import { CheckCircle, Warning, CreditCard } from '@mui/icons-material';
import { motion } from 'framer-motion';

const feeItems = [
  { term: 'Term 1 Fee', amount: 25000, paid: 25000, dueDate: '2025-04-10', paidDate: '2025-04-08', status: 'Paid', method: 'Online' },
  { term: 'Term 2 Fee', amount: 25000, paid: 25000, dueDate: '2025-08-10', paidDate: '2025-08-07', status: 'Paid', method: 'UPI' },
  { term: 'Annual Exam Fee', amount: 2500, paid: 0, dueDate: '2025-12-01', paidDate: null, status: 'Pending', method: null },
  { term: 'Sports Fee', amount: 1500, paid: 750, dueDate: '2025-06-15', paidDate: '2025-06-12', status: 'Partial', method: 'Cash' },
  { term: 'Library Fee', amount: 1000, paid: 1000, dueDate: '2025-04-15', paidDate: '2025-04-10', status: 'Paid', method: 'Cash' },
];

export default function StudentFees() {
  const totalFee = feeItems.reduce((s, f) => s + f.amount, 0);
  const totalPaid = feeItems.reduce((s, f) => s + f.paid, 0);
  const totalPending = totalFee - totalPaid;
  const pct = Math.round((totalPaid / totalFee) * 100);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Fee Status</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Your fee payment records for 2025-26</Typography>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Fee', value: `₹${totalFee.toLocaleString()}`, color: '#4f46e5', icon: '💳' },
          { label: 'Paid Amount', value: `₹${totalPaid.toLocaleString()}`, color: '#22c55e', icon: '✅' },
          { label: 'Pending', value: `₹${totalPending.toLocaleString()}`, color: '#ef4444', icon: '⚠️' },
          { label: 'Collection %', value: `${pct}%`, color: pct >= 80 ? '#22c55e' : '#f59e0b', icon: '📊' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
              <Card sx={{ borderRadius: 3, border: `1px solid ${s.color}25`, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.color}50)` }} />
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{s.icon}</Typography>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mt: 0.5 }}>{s.label}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Overall Progress */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card sx={{ borderRadius: 3, mb: 2.5 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography sx={{ fontWeight: 700 }}>Fee Payment Progress</Typography>
              <Typography sx={{ fontWeight: 800, color: pct >= 80 ? 'success.main' : 'warning.main' }}>{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 12, borderRadius: 6, '& .MuiLinearProgress-bar': { bgcolor: pct >= 80 ? '#22c55e' : '#f59e0b', borderRadius: 6 } }} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Fee Details */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {feeItems.map((f, i) => (
              <Box key={i} sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', borderBottom: i < feeItems.length - 1 ? '1px solid' : 'none', borderColor: 'divider', '&:hover': { bgcolor: 'action.hover' }, transition: 'all 0.15s' }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: f.status === 'Paid' ? 'rgba(34,197,94,0.12)' : f.status === 'Partial' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.status === 'Paid' ? <CheckCircle sx={{ color: '#22c55e', fontSize: 22 }} /> : f.status === 'Partial' ? <Warning sx={{ color: '#f59e0b', fontSize: 22 }} /> : <Warning sx={{ color: '#ef4444', fontSize: 22 }} />}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{f.term}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Due: {f.dueDate}</Typography>
                    {f.paidDate && <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Paid: {f.paidDate}</Typography>}
                    {f.method && <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Via: {f.method}</Typography>}
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: f.status === 'Paid' ? 'success.main' : f.status === 'Partial' ? 'warning.main' : 'error.main' }}>₹{f.paid.toLocaleString()} / ₹{f.amount.toLocaleString()}</Typography>
                  <Chip label={f.status} size="small" color={f.status === 'Paid' ? 'success' : f.status === 'Partial' ? 'warning' : 'error'} sx={{ mt: 0.3, fontSize: '0.68rem', fontWeight: 700 }} />
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
