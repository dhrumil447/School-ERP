import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { mockTimetable, mockPeriods, mockDays, mockSubjectColors } from '../../data/mockData';

export default function TeacherTimetable() {
  const schedule = mockTimetable['10A'] || {};
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>My Teaching Schedule</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Weekly schedule — Math & Science classes</Typography>
      </Box>
      <Card sx={{ mb: 2.5, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[...new Set(Object.values(schedule).flat())].map(s => {
              const color = mockSubjectColors[s] || mockSubjectColors.Default;
              return <Chip key={s} label={s} size="small" sx={{ bgcolor: `${color}18`, color, fontWeight: 700, fontSize: '0.72rem', border: `1px solid ${color}40` }} />;
            })}
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 700 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '90px repeat(7, 1fr)', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
              <Box sx={{ p: 1.5, fontWeight: 700, fontSize: '0.72rem', color: 'text.secondary', textTransform: 'uppercase' }}>Day</Box>
              {mockPeriods.map((p, i) => (
                <Box key={i} sx={{ p: 1.5, borderLeft: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>P{i + 1}</Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>{p.split('–')[0]}</Typography>
                </Box>
              ))}
            </Box>
            {mockDays.map((day, di) => (
              <Box key={day} sx={{ display: 'grid', gridTemplateColumns: '90px repeat(7, 1fr)', borderBottom: '1px solid', borderColor: 'divider', bgcolor: di % 2 === 0 ? 'transparent' : 'action.hover' }}>
                <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#c2410c' }}>{day.slice(0, 3)}</Typography>
                </Box>
                {(schedule[day] || []).map((subject, pi) => {
                  const color = mockSubjectColors[subject] || mockSubjectColors.Default;
                  const isMyClass = subject === 'Math' || subject === 'Science';
                  return (
                    <Box key={pi} sx={{ p: 0.75, borderLeft: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                      <Box sx={{ py: 0.8, borderRadius: 1.5, bgcolor: isMyClass ? `${color}30` : `${color}10`, border: `${isMyClass ? '2' : '1'}px solid ${color}${isMyClass ? '60' : '25'}` }}>
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: isMyClass ? 800 : 600, color }}>{subject}</Typography>
                        {isMyClass && <Typography sx={{ fontSize: '0.55rem', color, opacity: 0.8 }}>My Class</Typography>}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
