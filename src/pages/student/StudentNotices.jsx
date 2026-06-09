import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { mockNotices } from '../../data/mockData';

const categoryColor = { General: '#4f46e5', Academic: '#06b6d4', Exam: '#8b5cf6', Holiday: '#22c55e', Finance: '#f59e0b', Cultural: '#ec4899' };

export default function StudentNotices() {
  const notices = mockNotices.filter(n => n.targetAudience === 'All' || n.targetAudience === 'Students');
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Notice Board</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{notices.length} notices for students</Typography>
      </Box>
      <Grid container spacing={2}>
        {notices.map((n, i) => {
          const color = categoryColor[n.category] || '#4f46e5';
          return (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -3 }}>
                <Card sx={{ borderRadius: 3, height: '100%', border: `1px solid ${color}25`, position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                      <Chip label={n.category} size="small" sx={{ bgcolor: `${color}18`, color, fontWeight: 600, fontSize: '0.65rem' }} />
                      {n.important && <Chip label="Urgent" size="small" color="error" sx={{ fontSize: '0.65rem' }} />}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 1, lineHeight: 1.4 }}>{n.title}</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.6, mb: 1.5 }}>{n.content}</Typography>
                    <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>📅 {n.date} · ✍️ {n.author}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
