import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

export default function ChartCard({ title, subtitle, children, action }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: '16px',
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        border: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ p: '24px', '&:last-child': { pb: '24px' }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary' }}>{title}</Typography>
            {subtitle && <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>{subtitle}</Typography>}
          </Box>
          {action}
        </Box>
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
