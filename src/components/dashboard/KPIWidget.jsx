import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function KPIWidget({ label, value, sub, icon, trend, onClick }) {
  return (
    <Card 
      onClick={onClick} 
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        height: '100%',
        borderRadius: '16px',
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        border: 'none',
        '&:hover': onClick ? {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(79, 70, 229, 0.2)',
        } : {},
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <CardContent sx={{ p: '24px', '&:last-child': { pb: '24px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5 }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ width: 42, height: 42, bgcolor: 'action.hover', color: 'primary.main', border: '1px solid', borderColor: 'divider' }}>
            {icon}
          </Avatar>
        </Box>
        {sub && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend !== undefined && (trend > 0 ? <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} /> : trend < 0 ? <TrendingDown sx={{ fontSize: 14, color: 'error.main' }} /> : null)}
            <Typography sx={{ fontSize: '0.75rem', color: trend > 0 ? 'success.main' : trend < 0 ? 'error.main' : 'text.secondary', fontWeight: 600 }}>
              {sub}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
