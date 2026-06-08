import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Save as SaveIcon, Undo as UndoIcon } from '@mui/icons-material';
import { mockStudents, mockAttendanceData } from '../../data/mockData';

export default function AttendanceManagement() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(
    mockStudents.filter((s) => s.class === selectedClass).map((s) => ({
      studentId: s.id,
      name: s.name,
      status: Math.random() > 0.15 ? 'present' : 'absent',
    }))
  );

  const classes = ['10-A', '10-B', '10-C', '9-A', '9-B', '9-C'];
  const classStudents = mockStudents.filter((s) => s.class === selectedClass);

  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    setAttendance(
      mockStudents
        .filter((s) => s.class === newClass)
        .map((s) => ({
          studentId: s.id,
          name: s.name,
          status: 'present',
        }))
    );
  };

  const handleAttendanceToggle = (studentId) => {
    setAttendance(
      attendance.map((record) =>
        record.studentId === studentId
          ? { ...record, status: record.status === 'present' ? 'absent' : 'present' }
          : record
      )
    );
  };

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const attendancePercentage = ((presentCount / attendance.length) * 100).toFixed(2);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Attendance Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Mark and track student attendance for the selected class and date.
        </Typography>
      </Box>

      {/* Selection Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              label="Select Class"
              onChange={(e) => handleClassChange(e.target.value)}
            >
              {classes.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ p: 2, textAlign: 'center', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {presentCount}
            </Typography>
            <Typography variant="caption">Present</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ p: 2, textAlign: 'center', background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {absentCount}
            </Typography>
            <Typography variant="caption">Absent</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ p: 2, textAlign: 'center', background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {attendance.length}
            </Typography>
            <Typography variant="caption">Total</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ p: 2, textAlign: 'center', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {attendancePercentage}%
            </Typography>
            <Typography variant="caption">Percentage</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Mark Attendance for {selectedClass}
        </Typography>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Roll No.</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((record, index) => (
                <TableRow key={record.studentId} hover>
                  <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      label={record.status === 'present' ? 'Present' : 'Absent'}
                      color={record.status === 'present' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Switch
                      checked={record.status === 'present'}
                      onChange={() => handleAttendanceToggle(record.studentId)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
          >
            Save Attendance
          </Button>
          <Button
            variant="outlined"
            startIcon={<UndoIcon />}
            onClick={() => handleClassChange(selectedClass)}
          >
            Reset
          </Button>
        </Box>
      </Card>

      {/* Analytics */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Attendance Analytics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAttendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip />
            <Line type="monotone" dataKey="percentage" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
}
