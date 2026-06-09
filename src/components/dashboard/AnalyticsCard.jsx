import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

export default function AnalyticsCard({ title, subtitle, children, action }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: '16px',
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        border: 'none',
      }}
    >
      <CardContent sx={{ p: '24px', '&:last-child': { pb: '24px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>{title}</Typography>
            {subtitle && <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.3 }}>{subtitle}</Typography>}
          </Box>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
