import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, TextField,
  Alert, Snackbar, Avatar, Switch, FormControlLabel, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip,
  IconButton, Tabs, Tab,
} from '@mui/material';
import { Save, School, CloudUpload, Person, Settings as SettingsIcon, Security } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const ROLES = [
  { role: 'Admin', permissions: ['Full Access', 'Manage Users', 'Financial Reports', 'System Settings'], users: 1, color: '#4f46e5' },
  { role: 'Teacher', permissions: ['Mark Attendance', 'Enter Marks', 'View Students', 'View Notices'], users: 8, color: '#22c55e' },
  { role: 'Student', permissions: ['View Results', 'View Attendance', 'View Notices', 'View Timetable'], users: 12, color: '#06b6d4' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState({ open: false, msg: '' });
  const [schoolData, setSchoolData] = useState({
    name: 'EduVerse International School',
    email: 'info@eduverse.edu',
    phone: '+91 22 1234 5678',
    address: '12, Education Road, Knowledge City, Mumbai 400001',
    website: 'www.eduverse.edu',
    established: '2000',
    board: 'CBSE',
    academicYear: '2025-26',
    principalName: 'Dr. A.K. Verma',
    affiliationNo: 'CBSE-1234567',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoAttendance: false,
    feeReminders: true,
    publishResultsInstantly: false,
    allowStudentLogin: true,
    allowParentPortal: false,
    darkModeDefault: false,
  });

  const handleSave = () => setToast({ open: true, msg: 'Settings saved successfully' });

  const handleChange = (field, value) => setSchoolData(d => ({ ...d, [field]: value }));
  const handleSettingChange = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Settings</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>School profile and system configuration</Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave} size="small"
          sx={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
          Save Changes
        </Button>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="School Profile" />
        <Tab label="System Settings" />
        <Tab label="User Roles" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2.5}>
          {/* School Logo */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>School Logo</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <Box sx={{
                    width: 80, height: 80, borderRadius: 3,
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem',
                  }}>🏫</Box>
                  <Box>
                    <Button variant="outlined" startIcon={<CloudUpload />} size="small" sx={{ mb: 1 }}>Upload Logo</Button>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>PNG, JPG or SVG. Max 2MB. Recommended: 200×200px</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* School Info */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2.5 }}>School Information</Typography>
                <Grid container spacing={2}>
                  {[
                    { key: 'name', label: 'School Name' },
                    { key: 'affiliationNo', label: 'Affiliation Number' },
                    { key: 'email', label: 'Official Email', type: 'email' },
                    { key: 'phone', label: 'Phone Number' },
                    { key: 'website', label: 'Website' },
                    { key: 'established', label: 'Established Year' },
                    { key: 'board', label: 'Board/Affiliation' },
                    { key: 'academicYear', label: 'Academic Year' },
                    { key: 'principalName', label: 'Principal Name' },
                  ].map(f => (
                    <Grid item xs={12} sm={6} key={f.key}>
                      <TextField fullWidth label={f.label} type={f.type || 'text'} size="small" value={schoolData[f.key]}
                        onChange={e => handleChange(f.key, e.target.value)} />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField fullWidth label="Address" multiline rows={2} size="small" value={schoolData.address}
                      onChange={e => handleChange('address', e.target.value)} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>🔔 Notifications</Typography>
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send emails for important events' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send SMS alerts to parents' },
                  { key: 'feeReminders', label: 'Fee Due Reminders', desc: 'Automatic fee reminder messages' },
                ].map(s => (
                  <Box key={s.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{s.desc}</Typography>
                    </Box>
                    <Switch checked={settings[s.key]} onChange={() => handleSettingChange(s.key)} size="small" />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>⚙️ Academic Settings</Typography>
                {[
                  { key: 'autoAttendance', label: 'Auto Attendance', desc: 'Mark absent if not updated by noon' },
                  { key: 'publishResultsInstantly', label: 'Instant Result Publishing', desc: 'Auto-publish marks after entry' },
                  { key: 'allowStudentLogin', label: 'Student Portal Active', desc: 'Allow students to log in' },
                  { key: 'allowParentPortal', label: 'Parent Portal', desc: 'Enable parent access' },
                ].map(s => (
                  <Box key={s.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{s.desc}</Typography>
                    </Box>
                    <Switch checked={settings[s.key]} onChange={() => handleSettingChange(s.key)} size="small" />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, border: '1px solid rgba(239,68,68,0.3)' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Security sx={{ color: 'error.main' }} />
                  <Typography sx={{ fontWeight: 700, color: 'error.main' }}>Danger Zone</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Reset Academic Year</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>Archive all current year data and start fresh</Typography>
                  </Box>
                  <Button variant="outlined" color="error" size="small">Reset Year</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={2}>
          {ROLES.map((r, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ borderRadius: 3, border: `1px solid ${r.color}25` }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        {i === 0 ? '👑' : i === 1 ? '👩‍🏫' : '👨‍🎓'}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800 }}>{r.role}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{r.users} active users</Typography>
                      </Box>
                    </Box>
                    <Chip label={`${r.users} users`} size="small" sx={{ bgcolor: `${r.color}18`, color: r.color, fontWeight: 700, fontSize: '0.7rem' }} />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 1, textTransform: 'uppercase' }}>Permissions</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    {r.permissions.map((p, pi) => (
                      <Box key={pi} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: r.color, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.82rem' }}>{p}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
