import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { mockNotices, mockStudentResults, mockAttendanceData } from '../../data/mockData';

const StatCard = ({ label, value, color }) => (
  <motion.div whileHover={{ scale: 1.02 }}>
    <Card sx={{ p: 3, backgroundColor: color ? color : 'default', color: color ? 'white' : 'inherit' }}>
      <Typography variant="body2" sx={{ opacity: color ? 0.9 : 0.7, mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Card>
  </motion.div>
);

export default function StudentDashboard() {
  // Mock student data
  const studentData = {
    name: 'Aarav Kumar',
    class: '10-A',
    rollNo: '001',
    email: 'aarav.kumar@school.com',
    phone: '9876543210',
    guardian: 'Rajesh Kumar',
    attendance: 94,
    feeStatus: 'paid',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {studentData.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's your personalized dashboard with all important information.
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm="auto">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                fontSize: '2rem',
              }}
            >
              {studentData.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {studentData.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Class
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {studentData.class}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Roll No.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {studentData.rollNo}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {studentData.email}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {studentData.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Key Metrics */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Attendance" value={`${studentData.attendance}%`} color="linear-gradient(135deg, #10B981 0%, #059669 100%)" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Fee Status" value={studentData.feeStatus === 'paid' ? 'Paid' : 'Pending'} color={studentData.feeStatus === 'paid' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Class Avg" value="87%" color="linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Rank" value="#15" color="linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)" />
        </Grid>
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Attendance Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Attendance Overview
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Class Attendance</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {studentData.attendance}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={studentData.attendance}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  📌 Note: Maintain at least 75% attendance to be eligible for exams.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Recent Results */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Academic Results
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Marks</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockStudentResults.map((result) => (
                    <TableRow key={result.subject} hover>
                      <TableCell>{result.subject}</TableCell>
                      <TableCell align="right">
                        {result.marks}/{result.totalMarks}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${result.percentage}%`}
                          color={result.percentage >= 80 ? 'success' : result.percentage >= 60 ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Notices */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Recent Notices
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockNotices.slice(0, 3).map((notice) => (
            <Box
              key={notice.id}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: notice.important ? 'rgba(239, 68, 68, 0.05)' : 'rgba(79, 70, 229, 0.05)',
                borderLeft: notice.important ? '4px solid #EF4444' : '4px solid #4F46E5',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {notice.title}
                </Typography>
                {notice.important && <Chip label="Important" size="small" color="error" />}
              </Box>
              <Typography variant="caption" color="textSecondary">
                {notice.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
