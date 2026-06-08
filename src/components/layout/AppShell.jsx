import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Newspaper as NewspaperIcon,
  Logout as LogOutIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Settings as SettingsIcon,
  CreditCard as CreditCardIcon,
  Assignment as AssignmentIcon,
  SupervisedUserCircle as FamilyIcon,
  Schedule as ScheduleIcon,
  LibraryBooks as LibraryBooksIcon,
  DirectionsBus as DirectionsBusIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DRAWER_WIDTH = 280;

const menuItems = {
  admin: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { label: 'Students', icon: <PeopleIcon />, path: '/admin/students' },
    { label: 'Attendance', icon: <EventNoteIcon />, path: '/admin/attendance' },
    { label: 'Notices', icon: <NewspaperIcon />, path: '/admin/notices' },
    { label: 'Divider', type: 'divider' },
    { label: 'Fee Management', icon: <CreditCardIcon />, path: '/admin/fees' },
    { label: 'Results', icon: <AssignmentIcon />, path: '/admin/results' },
    { label: 'Timetable', icon: <ScheduleIcon />, path: '/admin/timetable' },
    { label: 'Library', icon: <LibraryBooksIcon />, path: '/admin/library' },
    { label: 'Transport', icon: <DirectionsBusIcon />, path: '/admin/transport' },
    { label: 'Parent Portal', icon: <FamilyIcon />, path: '/admin/parent' },
  ],
  student: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
    { label: 'Attendance', icon: <EventNoteIcon />, path: '/student/attendance' },
    { label: 'Notices', icon: <NewspaperIcon />, path: '/student/notices' },
    { label: 'Results', icon: <AssignmentIcon />, path: '/student/results' },
  ],
  teacher: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
    { label: 'Attendance', icon: <EventNoteIcon />, path: '/teacher/attendance' },
    { label: 'Classes', icon: <PeopleIcon />, path: '/teacher/classes' },
    { label: 'Notices', icon: <NewspaperIcon />, path: '/teacher/notices' },
  ],
};

export const AppShell = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const items = menuItems[user?.role] || [];
  const profileMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          E
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Elevate
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 1.5, pt: 1 }}>
        <List>
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return <Divider key={index} sx={{ my: 1 }} />;
            }

            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleMenuItemClick(item.path)}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(79, 70, 229, 0.15)' : 'action.hover',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 600 : 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar */}
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}

            <Typography variant="h6" sx={{ flex: 1, fontWeight: 700 }}>
              School ERP Management System
            </Typography>

            <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={profileMenuOpen}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogOutIcon sx={{ mr: 1.5 }} /> Logout
              </MenuItem>
            </Menu>

            <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  cursor: 'pointer',
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 1.5, md: 3 }, backgroundColor: 'background.default' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
