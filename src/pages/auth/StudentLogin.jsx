import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  TextField, Button, Alert, InputAdornment, IconButton, CircularProgress, Card, Box, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function StudentLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = login(data.email, data.password);
    if (result.success) {
      navigate('/student/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  const fillDemo = () => {
    setValue('email', 'student@schoolerp.demo');
    setValue('password', 'Student@123');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
      py: 4
    }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 440 }}
      >
        <Card sx={{ p: 4, borderRadius: 1.5, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          {/* Header branding */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Box sx={{
                width: 34, height: 34, borderRadius: 1,
                bgcolor: '#059669', // Student Portal theme color (flat green accent/primary fallback)
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>🎓</Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'text.primary' }}>
                EduVerse Student
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 750, mb: 0.5, letterSpacing: '-0.02em' }}>
              Sign in to Student Portal
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Enter student credentials to check attendance, marks, and timetable schedule.
            </Typography>
          </Box>

          <Button
            onClick={fillDemo}
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              mb: 3,
              borderColor: '#6ee7b7',
              color: '#059669',
              fontWeight: 600,
              fontSize: '0.8rem',
              py: 0.8,
              '&:hover': {
                borderColor: '#059669',
                backgroundColor: 'action.hover',
              }
            }}
          >
            ⚡ Pre-fill Demo Credentials
          </Button>

          {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1, fontSize: '0.8rem' }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Student Email Address"
                type="email"
                fullWidth
                size="small"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="student@schoolerp.demo"
              />
              <TextField
                label="Password"
                type={showPass ? 'text' : 'password'}
                fullWidth
                size="small"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(p => !p)} edge="end" size="small">
                        {showPass ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                size="large"
                sx={{
                  py: 1.2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  bgcolor: '#059669',
                  '&:hover': { bgcolor: '#047857' },
                  mt: 0.5
                }}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Access Student Portal'}
              </Button>
            </Box>
          </form>

          {/* Quick info box */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1, border: '1px solid #e2e8f0' }}>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mb: 0.5, letterSpacing: '0.5px' }}>
              Student Demo Credentials
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: 'monospace' }}>
              Email: student@schoolerp.demo<br />
              Pass: Student@123
            </Typography>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center', fontSize: '0.8rem', color: 'text.secondary' }}>
            Looking for other logins?{' '}
            <Link to="/admin/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Admin</Link>
            {' · '}
            <Link to="/teacher/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Teacher</Link>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}
