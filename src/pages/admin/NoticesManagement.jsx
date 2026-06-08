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
  Chip,
  Grid,
  Typography,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockNotices } from '../../data/mockData';

export default function NoticesManagement() {
  const [notices, setNotices] = useState(mockNotices);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    important: false,
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['General', 'Academic', 'Events', 'Holiday', 'Urgent'];

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchText.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = !filterCategory || notice.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [notices, searchText, filterCategory]);

  const handleAddClick = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      category: 'General',
      important: false,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
    });
    setOpenDialog(true);
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setFormData(notice);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handleSaveNotice = () => {
    if (editingNotice) {
      setNotices(
        notices.map((n) => (n.id === editingNotice.id ? { ...formData, id: n.id } : n))
      );
    } else {
      setNotices([...notices, { ...formData, id: Math.max(...notices.map((n) => n.id), 0) + 1 }]);
    }
    setOpenDialog(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Notices & Announcements
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Create, manage, and distribute notices to students and parents.
        </Typography>
      </Box>

      {/* Filters and Actions */}
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search notices..."
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
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
            >
              Create Notice
            </Button>
          </Grid>
        </Grid>

        <Typography variant="caption" color="textSecondary">
          Total: {notices.length} | Showing: {filteredNotices.length}
        </Typography>
      </Card>

      {/* Notices List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredNotices.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="textSecondary">No notices found</Typography>
          </Card>
        ) : (
          filteredNotices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderLeft: notice.important ? '4px solid #EF4444' : '4px solid #4F46E5',
                  backgroundColor: notice.important ? 'rgba(239, 68, 68, 0.05)' : 'rgba(79, 70, 229, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {notice.title}
                      </Typography>
                      {notice.important && (
                        <Chip label="Important" color="error" size="small" />
                      )}
                      <Chip
                        label={notice.category}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {notice.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, fontSize: '0.875rem', color: 'textSecondary' }}>
                      <Typography variant="caption">
                        📅 {notice.date}
                      </Typography>
                      <Typography variant="caption">
                        ✍️ {notice.author}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(notice)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(notice.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          ))
        )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingNotice ? 'Edit Notice' : 'Create New Notice'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Notice Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            label="Notice Content"
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              label="Category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.important}
                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
              />
            }
            label="Mark as Important"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveNotice} variant="contained">
            {editingNotice ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
