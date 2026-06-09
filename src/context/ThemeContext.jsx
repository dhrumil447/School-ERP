import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // Indigo primary color
      light: '#6366f1',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#475569', // Slate secondary for professional look
      light: '#64748b',
      dark: '#334155',
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff', // White surfaces
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0', // Clean light gray borders
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
    },
    error: {
      main: '#ef4444',
      light: '#fee2e2',
    },
    info: {
      main: '#06b6d4',
      light: '#cffafe',
    },
    action: {
      hover: '#f8fafc',
      selected: '#f1f5f9',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    h6: { fontSize: '0.95rem', fontWeight: 600 },
    body1: { fontSize: '0.9rem', lineHeight: 1.5 },
    body2: { fontSize: '0.825rem', lineHeight: 1.5 },
    button: { fontSize: '0.85rem', fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8, // Clean, modern, corporate border radius
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(0,0,0,0.03)', // Very subtle shadow
    '0 2px 4px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(0,0,0,0.03)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    '0 8px 12px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    ...Array(20).fill('none'), // Flat design for other elevations
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '6px 16px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#4f46e5',
          '&:hover': {
            backgroundColor: '#4338ca',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e2e8f0', // Clean gray border
          borderRadius: 8,
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc', // Light gray sidebar surface
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4f46e5',
              borderWidth: 1.5,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          padding: '8px 12px',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Lighter Indigo for dark mode readability
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#94a3b8',
      light: '#cbd5e1',
      dark: '#64748b',
    },
    background: {
      default: '#0f172a', // Clean slate dark background
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      disabled: '#64748b',
    },
    divider: '#334155',
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    h6: { fontSize: '0.95rem', fontWeight: 600 },
    body1: { fontSize: '0.9rem', lineHeight: 1.5 },
    body2: { fontSize: '0.825rem', lineHeight: 1.5 },
    button: { fontSize: '0.85rem', fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '6px 16px',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #334155',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #334155',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #334155',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #334155',
          backgroundColor: '#1e293b',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          padding: '8px 12px',
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
