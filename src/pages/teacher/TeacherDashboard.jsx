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
  Button,
  Avatar,
  AvatarGroup,
  LinearProgress,
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
import { Event as EventIcon, People as PeopleIcon, Assignment as AssignmentIcon } from '@mui/icons-material';
import { mockTeachers, mockNotices, mockAttendanceData } from '../../data/mockData';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <motion.div whileHover={{ scale: 1.02 }}>
    <Card sx={{ p: 3, background: color, color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box sx={{ width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon />
          </Box>
        )}
      </Box>
    </Card>
  </motion.div>
);

export default function TeacherDashboard() {
  const teacherData = {
    name: 'Dr. Rajiv Kumar',
    subject: 'Mathematics',
    email: 'rajiv.kumar@school.com',
    phone: '9876543220',
    classes: ['10-A', '10-B'],
    totalStudents: 76,
    classesToday: 3,
    pendingAssignments: 12,
  };

  const assignedClasses = [
    { name: 'Grade 10-A', subject: 'Mathematics', students: 38, time: '09:30 AM' },
    { name: 'Grade 10-B', subject: 'Mathematics', students: 38, time: '10:30 AM' },
  ];

  const dailyTasks = [
    { id: 1, task: 'Complete attendance submission for 10-A', status: 'pending' },
    { id: 2, task: 'Review and grade quiz papers', status: 'pending' },
    { id: 3, task: 'Update marks in system', status: 'completed' },
    { id: 4, task: 'Prepare lesson plan for geometry', status: 'pending' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {teacherData.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's an overview of your teaching schedule and activities.
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
              {teacherData.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {teacherData.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Subject
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {teacherData.subject}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {teacherData.email}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Classes
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {teacherData.classes.join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6} sm="auto">
                <Typography variant="caption" color="textSecondary" display="block">
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {teacherData.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Key Metrics */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Students"
            value={teacherData.totalStudents}
            icon={PeopleIcon}
            color="linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Classes Today"
            value={teacherData.classesToday}
            icon={EventIcon}
            color="linear-gradient(135deg, #10B981 0%, #059669 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Pending Tasks"
            value={teacherData.pendingAssignments}
            icon={AssignmentIcon}
            color="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Avg. Rating"
            value="4.8★"
            color="linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)"
          />
        </Grid>
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Assigned Classes */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Today's Classes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {assignedClasses.map((cls, index) => (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(79, 70, 229, 0.05)',
                      borderLeft: '4px solid #4F46E5',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {cls.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {cls.subject} • {cls.students} students
                        </Typography>
                      </Box>
                      <Chip label={cls.time} size="small" />
                    </Box>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                      Mark Attendance
                    </Button>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Daily Tasks */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Daily Tasks
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {dailyTasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: task.status === 'completed' ? 'success.main' : 'warning.main',
                      backgroundColor: task.status === 'completed' ? 'success.main' : 'transparent',
                    }}
                  />
                  <Typography variant="body2" sx={{ flex: 1, textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                    {task.task}
                  </Typography>
                  <Chip
                    label={task.status}
                    size="small"
                    color={task.status === 'completed' ? 'success' : 'warning'}
                  />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Analytics */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Class Attendance Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockAttendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="percentage" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Notices */}
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
                backgroundColor: 'rgba(79, 70, 229, 0.05)',
                borderLeft: '4px solid #4F46E5',
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
