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
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage school operations, students, teachers, and attendance',
      icon: ShieldCheck,
      path: '/admin/login',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'View and manage classes, attendance, and student progress',
      icon: BookOpen,
      path: '/teacher/login',
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Check attendance, results, notices, and class schedule',
      icon: Users,
      path: '/student/login',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const hoverVariants = {
    hover: { scale: 1.05, y: -10 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                School ERP System
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: '300',
                  mb: 1,
                }}
              >
                Select your role to login
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.95rem',
                }}
              >
                Please select the role that matches your account
              </Typography>
            </motion.div>
          </Box>

          {/* Role Cards Grid */}
          <Grid
            container
            spacing={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {roles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={role.id}>
                  <motion.div
                    variants={itemVariants}
                    whileHover="hover"
                    variants={hoverVariants}
                  >
                    <Card
                      onClick={() => navigate(role.path)}
                      sx={{
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '3rem 2rem',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        backgroundColor: 'white',
                        '&:hover': {
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          transform: 'translateY(-10px)',
                        },
                      }}
                    >
                      {/* Icon Container */}
                      <Box
                        sx={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          backgroundColor: role.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <IconComponent
                          size={48}
                          color={role.color}
                          strokeWidth={1.5}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          marginBottom: '0.5rem',
                          textAlign: 'center',
                          color: '#1f2937',
                        }}
                      >
                        {role.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6b7280',
                          textAlign: 'center',
                          marginBottom: '1.5rem',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {role.description}
                      </Typography>

                      {/* Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: role.color,
                          color: 'white',
                          fontWeight: '600',
                          padding: '0.75rem 1.5rem',
                          marginTop: 'auto',
                          '&:hover': {
                            backgroundColor: role.color,
                            opacity: 0.9,
                          },
                        }}
                      >
                        Login as {role.title}
                      </Button>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginTop: '4rem',
            }}
          >
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.875rem',
              }}
            >
              © 2024 School ERP System. All rights reserved.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
