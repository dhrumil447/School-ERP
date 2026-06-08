import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@schoolerp.demo');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (login(email, password, 'admin')) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
          : 'linear-gradient(135deg, #F3F4F6 0%, #FAFAF9 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: { xs: 3, md: 4 },
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              borderRadius: 3,
            }}
          >
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: 'white',
                  fontSize: '28px',
                  fontWeight: 'bold',
                }}
              >
                E
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Admin Portal
              </Typography>
              <Typography variant="body2" color="textSecondary">
                School ERP Management System
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Demo Credentials Info */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="caption">
                Email: admin@schoolerp.demo<br />
                Password: Admin@123
              </Typography>
            </Alert>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled={loading}
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                disabled={loading}
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  fontWeight: 600,
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login as Admin'}
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ my: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Or login as
              </Typography>
            </Box>

            {/* Other Portal Links */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/student/login')}
              >
                Student Portal
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/teacher/login')}
              >
                Teacher Portal
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
