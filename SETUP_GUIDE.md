# 🎓 School ERP - Complete Setup Guide

## Prerequisites

Before you start, make sure you have the following installed:

### Required
- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** (optional) - [Download](https://git-scm.com)

### Verify Installation
Open Command Prompt or Terminal and run:

```bash
node --version
npm --version
```

You should see version numbers for both.

---

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd path/to/School-ERP
```

Replace `path/to/School-ERP` with your actual project path.

Example (Windows):
```bash
cd d:\doctor\School-ERP\School-ERP
```

Example (Mac/Linux):
```bash
cd ~/projects/School-ERP/School-ERP
```

### Step 2: Install Dependencies

```bash
npm install
```

This will:
- Download all required packages
- Install Material UI components
- Set up Vite build tool
- Configure React Router
- Install all other dependencies

**⏱️ This may take 2-5 minutes depending on your internet speed**

Wait for the installation to complete. You should see:
```
added XXX packages in X.XXs
```

### Step 3: Start Development Server

```bash
npm run dev
```

The output will show:
```
  VITE v4.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Step 4: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5173
```

---

## Demo Credentials

Once the app loads, you can login with these credentials:

### 👨‍💼 Admin Portal
- **URL**: http://localhost:5173/admin/login
- **Email**: `admin@schoolerp.demo`
- **Password**: `Admin@123`
- **Access**: Full system access, dashboard, student management, attendance, notices

### 👨‍🎓 Student Portal
- **URL**: http://localhost:5173/student/login
- **Email**: `student@schoolerp.demo`
- **Password**: `Student@123`
- **Access**: Personal dashboard, attendance, results, notices

### 👨‍🏫 Teacher Portal
- **URL**: http://localhost:5173/teacher/login
- **Email**: `teacher@schoolerp.demo`
- **Password**: `Teacher@123`
- **Access**: Classes, attendance marking, student overview, tasks

---

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Build
```bash
npm run preview
```
Previews the production build locally.

---

## Troubleshooting

### Issue: Port 5173 Already in Use
**Error**: `error: listen EADDRINUSE: address already in use :::5173`

**Solution**:
```bash
# Kill process on port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

Then restart:
```bash
npm run dev
```

### Issue: npm: command not found
**Error**: `npm: command not found`

**Solution**: 
- Node.js and npm are not installed correctly
- Reinstall Node.js from https://nodejs.org
- Restart your terminal
- Verify installation with `node --version`

### Issue: Missing Dependencies
**Error**: `Module not found: Can't resolve '@mui/material'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port Not Responding
**Error**: `Could not connect to http://localhost:5173`

**Solution**:
1. Make sure the dev server is running (check terminal)
2. Try refreshing the page (Ctrl+R)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try a different browser
5. Restart the dev server

### Issue: Hot Reload Not Working
**Solution**:
1. Save the file you edited
2. Check browser console for errors (F12)
3. Restart dev server
4. Clear browser cache

---

## Features Overview

### 📊 Admin Dashboard
- Key metrics and analytics
- Student overview
- Attendance tracking
- Fee collection charts
- Recent activities

### 👥 Student Management
- View all students
- Search and filter students
- Add new students
- Edit student information
- Delete students
- Track attendance and fees

### 📅 Attendance Management
- Mark attendance by class
- Select specific date
- View attendance statistics
- Attendance analytics charts
- Quick attendance summary

### 📢 Notices Management
- Create new notices
- Edit existing notices
- Delete notices
- Search notices
- Filter by category
- Mark as important

### 👨‍🎓 Student Dashboard
- Personal profile information
- Attendance percentage
- Academic results
- Fee status
- Recent notices

### 👨‍🏫 Teacher Dashboard
- Today's classes
- Assigned students
- Daily tasks
- Attendance trends
- Recent notices

---

## Browser Support

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Minimum Requirements
- Desktop resolution: 1024x768
- Mobile: Any modern smartphone browser

---

## Theme Customization

### Dark Mode
Click the theme toggle button in the top-right corner of the header to switch between light and dark modes.

### Color Scheme
The app uses:
- **Primary Color**: Indigo (#4F46E5)
- **Secondary Color**: Violet (#7C3AED)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

---

## What's Next?

### After Setup is Complete

1. **Explore the Dashboard**
   - Login as admin
   - Check out the analytics
   - View mock data

2. **Test Student Management**
   - Add new students
   - Search and filter
   - Edit existing records
   - Delete records

3. **Try Attendance Module**
   - Select a class
   - Mark attendance
   - View analytics

4. **Create Notices**
   - Create announcement
   - Mark as important
   - Search and filter

5. **Check Other Portals**
   - Login as student
   - Login as teacher
   - Explore personalized views

---

## File Structure

```
School-ERP/
├── src/
│   ├── components/          # Reusable components
│   ├── context/             # React contexts (Auth, Theme)
│   ├── data/                # Mock data
│   ├── pages/               # Page components
│   │   ├── auth/            # Login pages
│   │   ├── admin/           # Admin pages
│   │   ├── student/         # Student pages
│   │   └── teacher/         # Teacher pages
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
└── index.html               # HTML template
```

---

## Performance Tips

### For Better Experience
1. **Use Modern Browser** - Chrome/Edge recommended
2. **Enable Hardware Acceleration** - In browser settings
3. **Close Unnecessary Tabs** - Free up RAM
4. **Clear Cache** - If experiencing slowness
5. **Use Wired Connection** - Faster than WiFi

### Development
- Hot reload is automatic
- No manual refresh needed in most cases
- Changes appear instantly in browser

---

## Common Questions

### Q: Can I modify the data?
**A**: Yes! Changes work in the current session but reset on page refresh since we use mock data.

### Q: Can I add new students/notices?
**A**: Yes! You can add, edit, and delete records. They persist during your session.

### Q: How do I change the color scheme?
**A**: Modify the theme in `src/context/ThemeContext.jsx` for permanent changes.

### Q: Can I deploy this?
**A**: Yes! Run `npm run build` and deploy the `dist` folder to Netlify, Vercel, or any static host.

### Q: Is this production-ready?
**A**: It's a fully functional frontend demo. For production, integrate with a real backend API.

---

## Next Steps for Production

1. **Backend Integration**
   - Connect to REST/GraphQL API
   - Implement real authentication
   - Replace mock data with API calls

2. **Database**
   - Set up MongoDB, PostgreSQL, or your choice
   - Design database schema
   - Create API endpoints

3. **Deployment**
   - Set up CI/CD pipeline
   - Deploy frontend to Netlify/Vercel
   - Deploy backend to AWS/Heroku

4. **Security**
   - Add authentication tokens
   - Implement CSRF protection
   - Add input validation

5. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

---

## Support & Resources

### Documentation
- [React Documentation](https://react.dev)
- [Material UI Docs](https://mui.com)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

### Tools
- [VS Code](https://code.visualstudio.com) - Recommended Editor
- [React DevTools Extension](https://chrome.google.com/webstore) - Browser Extension
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) - State Debugging

---

## Success Checklist ✅

- [ ] Node.js installed (v16+)
- [ ] npm installed
- [ ] Project folder accessible
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser showing localhost:5173
- [ ] Login working with demo credentials
- [ ] Can view admin dashboard
- [ ] Can see student data
- [ ] Dark mode toggle working

**Once all items are checked, you're ready to explore the School ERP system!** 🎉

---

**Happy Coding! 💻**
