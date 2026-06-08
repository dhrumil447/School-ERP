import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export default function PlaceholderPage({ title = 'Module' }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ width: 'fit-content' }}
      >
        Back
      </Button>

      <Card sx={{ p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            color: 'white',
            fontSize: '40px',
          }}
        >
          🚀
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          This module is coming soon. It will be part of the complete School ERP system.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          For now, explore the core modules: Dashboard, Student Management, Attendance, and Notices.
        </Typography>
      </Card>
    </Box>
  );
}
