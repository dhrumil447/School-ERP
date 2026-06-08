import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  InputAdornment,
  Typography,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { mockStudents } from '../../data/mockData';

export default function StudentManagement() {
  const [students, setStudents] = useState(mockStudents);
  const [searchText, setSearchText] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    rollNo: '',
    phone: '',
    guardian: '',
    dob: '',
    status: 'active',
    attendance: 0,
    feeStatus: 'paid',
  });

  const classes = ['10-A', '10-B', '10-C', '9-A', '9-B', '9-C'];

  // Filter and search students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(searchText.toLowerCase()) ||
        student.rollNo.includes(searchText);
      const matchesClass = !filterClass || student.class === filterClass;
      const matchesStatus = !filterStatus || student.status === filterStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchText, filterClass, filterStatus]);

  const handleAddClick = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      class: '',
      rollNo: '',
      phone: '',
      guardian: '',
      dob: '',
      status: 'active',
      attendance: 0,
      feeStatus: 'paid',
    });
    setOpenDialog(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? { ...formData, id: s.id } : s))
      );
    } else {
      setStudents([...students, { ...formData, id: Math.max(...students.map((s) => s.id)) + 1 }]);
    }
    setOpenDialog(false);
  };

  const columns = [
    { field: 'rollNo', headerName: 'Roll No.', width: 100 },
    { field: 'name', headerName: 'Name', width: 180, flex: 1 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'class', headerName: 'Class', width: 100 },
    { field: 'guardian', headerName: 'Guardian', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'attendance',
      headerName: 'Attendance',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={`${params.value}%`}
          color={params.value >= 90 ? 'success' : params.value >= 75 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'feeStatus',
      headerName: 'Fee Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'paid' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} variant="outlined" size="small" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Student Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage all students in the school system.
        </Typography>
      </Box>

      {/* Filters and Actions */}
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or roll no."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={filterClass}
                label="Class"
                onChange={(e) => setFilterClass(e.target.value)}
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
            >
              Add Student
            </Button>
          </Grid>
        </Grid>

        <Typography variant="caption" color="textSecondary">
          Showing {filteredStudents.length} of {students.length} students
        </Typography>
      </Card>

      {/* Data Grid */}
      <Card sx={{ height: 600 }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          pagination
          paginationModel={{ pageSize: 10, page: 0 }}
          onPaginationModelChange={(newModel) => {}}
          disableSelectionOnClick
        />
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Roll Number"
            fullWidth
            value={formData.rollNo}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              value={formData.class}
              label="Class"
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            >
              {classes.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            label="Guardian Name"
            fullWidth
            value={formData.guardian}
            onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Fee Status</InputLabel>
            <Select
              value={formData.feeStatus}
              label="Fee Status"
              onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveStudent} variant="contained">
            {editingStudent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
