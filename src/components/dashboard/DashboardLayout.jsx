import React from 'react';
import { Grid } from '@mui/material';

export default function DashboardLayout({ children }) {
  return (
    <Grid container spacing={3}>
      {children}
    </Grid>
  );
}
