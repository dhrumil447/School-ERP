import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Chip, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, Snackbar, IconButton,
} from '@mui/material';
import { DirectionsBus, Person, Build, Add, Close, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockBusRoutes, mockDrivers, mockVehicles } from '../../data/mockData';

export default function TransportManagement() {
  const [tab, setTab] = useState(0);
  const [routes, setRoutes] = useState(mockBusRoutes);
  const [drivers, setDrivers] = useState(mockDrivers);
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [toast, setToast] = useState({ open: false, msg: '' });

  const totalCapacity = routes.reduce((s, r) => s + r.capacity, 0);
  const totalStudents = routes.reduce((s, r) => s + r.students, 0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Transport Management</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Bus routes, drivers, and vehicle details</Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Routes', value: routes.length, color: '#4f46e5', icon: '🗺️' },
          { label: 'Total Capacity', value: totalCapacity, color: '#22c55e', icon: '🚌' },
          { label: 'Students Enrolled', value: totalStudents, color: '#06b6d4', icon: '👨‍🎓' },
          { label: 'Occupancy Rate', value: `${Math.round((totalStudents / totalCapacity) * 100)}%`, color: '#f59e0b', icon: '📊' },
        ].map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Card sx={{ borderRadius: 2.5, border: `1px solid ${s.color}25` }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: '1.5rem', mb: 0.3 }}>{s.icon}</Typography>
                  <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mt: 0.3 }}>{s.label}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Bus Routes" />
        <Tab label="Drivers" />
        <Tab label="Vehicles" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          {routes.map((r, i) => {
            const occupancy = Math.round((r.students / r.capacity) * 100);
            return (
              <Grid item xs={12} md={6} key={r.id}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', '&:hover': { boxShadow: '0 8px 24px rgba(79,70,229,0.12)' }, transition: 'all 0.2s' }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                          <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🚌</Box>
                          <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{r.routeNo}</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{r.routeName}</Typography>
                          </Box>
                        </Box>
                        <Chip label={`${r.students}/${r.capacity} students`} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem' }} />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Occupancy</Typography>
                          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: occupancy > 85 ? 'error.main' : 'success.main' }}>{occupancy}%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={occupancy} sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: occupancy > 85 ? '#ef4444' : '#22c55e' } }} />
                      </Box>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {r.stops.map((stop, si) => (
                          <Chip key={si} label={stop} size="small" variant={stop === 'School' ? 'filled' : 'outlined'} color={stop === 'School' ? 'primary' : 'default'} sx={{ fontSize: '0.65rem', height: 20 }} />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                          <Person sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.driver}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                          <DirectionsBus sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.vehicle}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', marginLeft: 'auto' }}>🕐 {r.timing}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          {drivers.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} key={d.id}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 700 }}>{d.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{d.name}</Typography>
                        <Chip label={d.status} color="success" size="small" sx={{ fontSize: '0.65rem', mt: 0.3 }} />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>License</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>{d.license}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Phone</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>{d.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Experience</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>{d.experience} yrs</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Route</Typography>
                        <Chip label={d.route} size="small" color="primary" sx={{ fontSize: '0.65rem', height: 18 }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  {['Reg. No', 'Model', 'Capacity', 'Fuel', 'Last Service', 'Next Service', 'Route', 'Status'].map(h => (
                    <TableCell key={h} sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', py: 1.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((v, i) => (
                  <TableRow key={v.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.82rem' }}>{v.regNo}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{v.model}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{v.capacity}</TableCell>
                    <TableCell><Chip label={v.fuelType} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} /></TableCell>
                    <TableCell sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>{v.lastService}</TableCell>
                    <TableCell sx={{ fontSize: '0.82rem', color: v.status === 'Service Due' ? 'warning.main' : 'text.secondary', fontWeight: v.status === 'Service Due' ? 700 : 400 }}>{v.nextService}</TableCell>
                    <TableCell><Chip label={v.route} size="small" color="primary" sx={{ fontSize: '0.7rem' }} /></TableCell>
                    <TableCell>
                      <Chip label={v.status} size="small" color={v.status === 'Good' ? 'success' : 'warning'} sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}
