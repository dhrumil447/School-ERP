import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, BookOpen } from 'lucide-react';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
} from '@mui/material';

export default function Landing() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage institutional settings, user directories, fee modules, and system reports.',
      icon: ShieldCheck,
      path: '/admin/login',
      color: '#4f46e5', // Primary Indigo
      bgColor: '#f0fdf4',
    },
    {
      id: 'teacher',
      title: 'Faculty Portal',
      description: 'Record daily attendance, upload academic marks, view timetables, and manage students.',
      icon: BookOpen,
      path: '/teacher/login',
      color: '#4f46e5',
      bgColor: '#eff6ff',
    },
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Access academic performance cards, track attendance progress, and view class schedule sheets.',
      icon: Users,
      path: '/student/login',
      color: '#4f46e5',
      bgColor: '#ecfdf5',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc', // Light gray background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Branding */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: 1.5,
              bgcolor: 'primary.main',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🏫</Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', color: 'text.primary' }}>
              EduVerse ERP
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1.5,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              letterSpacing: '-0.02em',
            }}
          >
            School ERP & Administration
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Please choose your role from below to access your account dashboard.
          </Typography>
        </Box>

        {/* Role Cards Grid */}
        <Grid
          container
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={role.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    onClick={() => navigate(role.path)}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 4,
                      borderRadius: 1.5,
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      boxShadow: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                      },
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      sx={{
                        width: '54px',
                        height: '54px',
                        borderRadius: 1.25,
                        backgroundColor: 'action.hover',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <IconComponent
                        size={28}
                        color="#4f46e5"
                        strokeWidth={1.8}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'text.primary',
                      }}
                    >
                      {role.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 3,
                        lineHeight: 1.6,
                        flexGrow: 1,
                      }}
                    >
                      {role.description}
                    </Typography>

                    {/* Button */}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: 'primary.main',
                        borderColor: '#cbd5e1',
                        py: 1,
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      Sign In as {role.id === 'admin' ? 'Admin' : role.id === 'teacher' ? 'Teacher' : 'Student'}
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
            }}
          >
            © {new Date().getFullYear()} EduVerse ERP. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
