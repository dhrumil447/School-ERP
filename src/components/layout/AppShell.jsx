import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, Drawer, Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Menu, MenuItem, Divider,
  useMediaQuery, useTheme as useMuiTheme, Tooltip, Avatar, Typography,
  Badge, Chip, InputBase, Paper, Popover, ListSubheader,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon, Close as CloseIcon,
  Dashboard as DashboardIcon, People as PeopleIcon,
  EventNote as EventNoteIcon, Newspaper as NewspaperIcon,
  Logout as LogOutIcon, Brightness4, Brightness7,
  Settings as SettingsIcon, CreditCard as CreditCardIcon,
  Assignment as AssignmentIcon, Schedule as ScheduleIcon,
  LibraryBooks as LibraryBooksIcon, DirectionsBus as DirectionsBusIcon,
  Search as SearchIcon, Notifications as NotificationsIcon,
  SupervisedUserCircle as TeacherIcon, Event as EventIcon,
  BarChart as AnalyticsIcon, ChevronLeft, ChevronRight,
  AccountCircle, FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { mockNotifications } from '../../data/mockData';

const DRAWER_WIDTH = 270;
const COLLAPSED_WIDTH = 72;

const adminMenu = [
  { section: 'Overview', items: [
    { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/admin/dashboard' },
    { label: 'Analytics', icon: <AnalyticsIcon fontSize="small" />, path: '/admin/analytics' },
  ]},
  { section: 'Academic', items: [
    { label: 'Students', icon: <PeopleIcon fontSize="small" />, path: '/admin/students' },
    { label: 'Teachers', icon: <TeacherIcon fontSize="small" />, path: '/admin/teachers' },
    { label: 'Attendance', icon: <EventNoteIcon fontSize="small" />, path: '/admin/attendance' },
    { label: 'Results', icon: <AssignmentIcon fontSize="small" />, path: '/admin/results' },
    { label: 'Timetable', icon: <ScheduleIcon fontSize="small" />, path: '/admin/timetable' },
  ]},
  { section: 'Management', items: [
    { label: 'Fee Management', icon: <CreditCardIcon fontSize="small" />, path: '/admin/fees', badge: 3 },
    { label: 'Library', icon: <LibraryBooksIcon fontSize="small" />, path: '/admin/library' },
    { label: 'Transport', icon: <DirectionsBusIcon fontSize="small" />, path: '/admin/transport' },
  ]},
  { section: 'Communication', items: [
    { label: 'Notices', icon: <NewspaperIcon fontSize="small" />, path: '/admin/notices', badge: 2 },
    { label: 'Events', icon: <EventIcon fontSize="small" />, path: '/admin/events' },
  ]},
  { section: 'System', items: [
    { label: 'Settings', icon: <SettingsIcon fontSize="small" />, path: '/admin/settings' },
  ]},
];

const studentMenu = [
  { section: 'My Portal', items: [
    { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/student/dashboard' },
    { label: 'My Results', icon: <AssignmentIcon fontSize="small" />, path: '/student/results' },
    { label: 'Attendance', icon: <EventNoteIcon fontSize="small" />, path: '/student/attendance' },
    { label: 'Fee Status', icon: <CreditCardIcon fontSize="small" />, path: '/student/fees' },
    { label: 'Timetable', icon: <ScheduleIcon fontSize="small" />, path: '/student/timetable' },
    { label: 'Notices', icon: <NewspaperIcon fontSize="small" />, path: '/student/notices' },
  ]},
];

const teacherMenu = [
  { section: 'My Portal', items: [
    { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/teacher/dashboard' },
    { label: 'Mark Attendance', icon: <EventNoteIcon fontSize="small" />, path: '/teacher/attendance' },
    { label: 'Results', icon: <AssignmentIcon fontSize="small" />, path: '/teacher/results' },
    { label: 'My Students', icon: <PeopleIcon fontSize="small" />, path: '/teacher/students' },
    { label: 'Timetable', icon: <ScheduleIcon fontSize="small" />, path: '/teacher/timetable' },
  ]},
];

const menuMap = { admin: adminMenu, student: studentMenu, teacher: teacherMenu };

const pathToTitle = {
  '/admin/dashboard': 'Dashboard', '/admin/students': 'Students', '/admin/teachers': 'Teachers',
  '/admin/attendance': 'Attendance', '/admin/fees': 'Fee Management', '/admin/results': 'Results',
  '/admin/timetable': 'Timetable', '/admin/notices': 'Notices', '/admin/events': 'Events',
  '/admin/library': 'Library', '/admin/transport': 'Transport', '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings', '/student/dashboard': 'Dashboard', '/student/results': 'My Results',
  '/student/attendance': 'My Attendance', '/student/fees': 'Fee Status', '/student/timetable': 'Timetable',
  '/student/notices': 'Notices', '/teacher/dashboard': 'Dashboard', '/teacher/attendance': 'Mark Attendance',
  '/teacher/results': 'Results', '/teacher/students': 'My Students', '/teacher/timetable': 'Timetable',
};

export const AppShell = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const menuSections = menuMap[user?.role] || [];
  const unreadCount = notifications.filter(n => !n.read).length;
  const drawerWidth = collapsed && !isMobile ? COLLAPSED_WIDTH : DRAWER_WIDTH;
  const pageTitle = pathToTitle[location.pathname] || 'Dashboard';

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const roleColor = { admin: '#4f46e5', student: '#059669', teacher: '#c2410c' }[user?.role] || '#4f46e5';
  const roleBg = { admin: 'rgba(79,70,229,0.12)', student: 'rgba(5,150,105,0.12)', teacher: 'rgba(194,65,12,0.12)' }[user?.role] || 'rgba(79,70,229,0.12)';

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Logo */}
      <Box sx={{ p: collapsed ? 1 : 2.5, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: 1.5, flexShrink: 0,
          bgcolor: 'primary.main',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
        }}>🏫</Box>
        {!collapsed && (
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1, color: 'text.primary' }}>EduVerse</Typography>
            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1 }}>SCHOOL ERP</Typography>
          </Box>
        )}
      </Box>

      {/* User chip */}
      {!collapsed && (
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: roleBg }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: roleColor, fontSize: '0.8rem', fontWeight: 700 }}>
              {user?.avatar || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name}
              </Typography>
              <Chip label={user?.role} size="small" sx={{ height: 16, fontSize: '0.65rem', fontWeight: 700, color: roleColor, bgcolor: 'transparent', mt: 0.3 }} />
            </Box>
          </Box>
        </Box>
      )}

      {/* Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', px: collapsed ? 0.5 : 1.5, pt: 1, pb: 2 }}>
        {menuSections.map((section, si) => (
          <Box key={si} sx={{ mb: 1 }}>
            {!collapsed && (
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.8px', textTransform: 'uppercase', px: 1, py: 0.5 }}>
                {section.section}
              </Typography>
            )}
            <List dense disablePadding>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem key={item.path} disablePadding sx={{ mb: 0.3 }}>
                    <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                      <ListItemButton
                        onClick={() => handleNavClick(item.path)}
                        sx={{
                          borderRadius: 1, minHeight: 40, px: collapsed ? 1.5 : 1.5,
                          bgcolor: isActive ? `${roleColor}18` : 'transparent',
                          color: isActive ? roleColor : 'text.secondary',
                          '&:hover': { bgcolor: isActive ? `${roleColor}22` : 'action.hover' },
                          transition: 'all 0.15s ease',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: collapsed ? 0 : 36 }}>
                          {item.badge ? (
                            <Badge badgeContent={item.badge} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}>
                              {item.icon}
                            </Badge>
                          ) : item.icon}
                        </ListItemIcon>
                        {!collapsed && (
                          <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isActive ? 700 : 500 }} />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
            {si < menuSections.length - 1 && !collapsed && <Divider sx={{ mt: 0.5, mb: 0.5, borderColor: 'divider' }} />}
          </Box>
        ))}
      </Box>

      {/* Logout */}
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{ borderRadius: 1, color: 'error.main', justifyContent: collapsed ? 'center' : 'flex-start', '&:hover': { bgcolor: 'error.main', color: 'white' }, transition: 'all 0.2s' }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: collapsed ? 0 : 36 }}><LogOutIcon fontSize="small" /></ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 600 }} />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Drawer */}
      <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}>
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', transition: 'width 0.25s ease', overflow: 'hidden' },
        }}>
        {drawerContent}
      </Drawer>

      {/* Main */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* AppBar */}
        <AppBar position="sticky" elevation={0} sx={{
          bgcolor: 'background.paper', color: 'text.primary',
          borderBottom: '1px solid', borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}>
          <Toolbar sx={{ gap: 1, minHeight: '64px !important' }}>
            {isMobile ? (
              <IconButton onClick={() => setMobileOpen(p => !p)} size="small" sx={{ color: 'text.secondary' }}>
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              <IconButton onClick={() => setCollapsed(p => !p)} size="small" sx={{ color: 'text.secondary' }}>
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            )}

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>{pageTitle}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', lineHeight: 1 }}>
                {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'student' ? 'Student Portal' : 'Teacher Portal'} · EduVerse ERP
              </Typography>
            </Box>

            {/* Theme Toggle */}
            <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
              <IconButton onClick={toggleTheme} size="small" sx={{ color: 'text.secondary' }}>
                {isDarkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton onClick={e => setNotifAnchor(e.currentTarget)} size="small" sx={{ color: 'text.secondary' }}>
                <Badge badgeContent={unreadCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem' } }}>
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Account">
              <IconButton onClick={e => setAnchorEl(e.currentTarget)} size="small">
                <Avatar sx={{ width: 32, height: 32, bgcolor: roleColor, fontSize: '0.8rem', fontWeight: 700 }}>
                  {user?.avatar || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Notification Popover */}
        <Popover
          open={Boolean(notifAnchor)} anchorEl={notifAnchor}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { width: 340, mt: 1, borderRadius: 1, boxShadow: 2, border: '1px solid', borderColor: 'divider' } }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontWeight: 700 }}>Notifications</Typography>
            {unreadCount > 0 && (
              <Typography onClick={markAllRead} sx={{ fontSize: '0.75rem', color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}>
                Mark all read
              </Typography>
            )}
          </Box>
          <Box sx={{ maxHeight: 360, overflowY: 'auto' }}>
            {notifications.map((n) => (
              <Box key={n.id} sx={{
                px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
                bgcolor: n.read ? 'transparent' : 'transparent',
                background: n.read ? 'transparent' : 'rgba(79,70,229,0.04)',
                cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' },
              }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box sx={{ fontSize: 20, lineHeight: 1 }}>
                    {{ payment: '💰', alert: '⚠️', admission: '🎓', library: '📚', transport: '🚌' }[n.type] || '🔔'}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: n.read ? 500 : 700 }}>{n.title}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.3, lineHeight: 1.4 }}>{n.message}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.disabled', mt: 0.5 }}>{n.time}</Typography>
                  </Box>
                  {!n.read && <DotIcon sx={{ color: 'primary.main', fontSize: 10, mt: 0.5, flexShrink: 0 }} />}
                </Box>
              </Box>
            ))}
          </Box>
        </Popover>

        {/* Profile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { width: 220, mt: 1, borderRadius: 1, boxShadow: 2, border: '1px solid', borderColor: 'divider' } }}>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.name}</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{user?.email}</Typography>
            <Chip label={user?.role} size="small" sx={{ mt: 0.5, height: 18, fontSize: '0.65rem', fontWeight: 700, color: roleColor, bgcolor: roleBg }} />
          </Box>
          <Divider />
          {user?.role === 'admin' && (
            <MenuItem onClick={() => { navigate('/admin/settings'); setAnchorEl(null); }} sx={{ gap: 1.5, fontSize: '0.875rem' }}>
              <SettingsIcon fontSize="small" /> Settings
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout} sx={{ gap: 1.5, fontSize: '0.875rem', color: 'error.main' }}>
            <LogOutIcon fontSize="small" /> Logout
          </MenuItem>
        </Menu>

        {/* Page Content */}
        <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.default' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ minHeight: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};
