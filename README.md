# 🎓 Elevate School ERP - Enterprise Grade Management System

A premium, enterprise-ready School ERP and Management System frontend built with React.js, Vite, Material UI, and modern web technologies.

## 🚀 Features

### ✨ Authentication System
- **Admin Portal** - /admin/login
  - Email: `admin@schoolerp.demo`
  - Password: `Admin@123`
- **Student Portal** - /student/login
  - Email: `student@schoolerp.demo`
  - Password: `Student@123`
- **Teacher Portal** - /teacher/login
  - Email: `teacher@schoolerp.demo`
  - Password: `Teacher@123`

### 📊 Admin Dashboard Features
- **Welcome Banner** - Personalized greeting
- **Key Metrics Cards**
  - Total Students Count
  - Total Teachers Count
  - Average Attendance Rate
  - Pending Fees Amount
- **Analytics Charts**
  - Weekly Attendance Chart (Bar Chart)
  - Monthly Fee Collection Chart (Line Chart)
- **Recent Activities Timeline** - Track system activities
- **Recent Notices & Announcements** - Latest school updates
- **Upcoming Events** - School calendar integration
- **Quick Actions Panel** - Fast access to common tasks

### 👥 Student Management Module
- **MUI DataGrid Integration** - Responsive data table
- **Advanced Search** - Filter by name, email, roll number
- **Class & Status Filters** - Multiple filtering options
- **Full CRUD Operations**
  - Add Student Dialog with form validation
  - Edit Student inline or via dialog
  - Delete Student with confirmation
- **Attendance Tracking** - Visual attendance percentage
- **Fee Status Management** - Track payment status
- **Empty States** - User-friendly empty states
- **Pagination** - Efficient data pagination

### 📅 Attendance Management
- **Class Selection** - Choose specific class
- **Date Selection** - Pick any date
- **Attendance Table** - Mark present/absent
- **Toggle Switches** - Easy presence marking
- **Monthly Analytics** - Attendance charts
- **Summary Cards** - Present/Absent/Total counts
- **Attendance Percentage** - Real-time calculation

### 📢 Notices & Announcements Module
- **Notice Listing** - All announcements in one place
- **Create Notice Dialog** - Easy notice creation
- **Important Badge** - Highlight critical notices
- **Search Functionality** - Find notices quickly
- **Category Filtering** - Organize by type
- **Recent Activity Panel** - Track updates
- **Edit & Delete** - Manage existing notices

### 👨‍🎓 Student Dashboard
- **Profile Card** - Student information display
- **Attendance Percentage** - Visual progress indicator
- **Recent Notices** - Personalized announcements
- **Latest Results** - Academic performance
- **Fee Status** - Payment information

### 👨‍🏫 Teacher Dashboard
- **Assigned Classes** - Daily schedule
- **Student Overview** - Class statistics
- **Attendance Shortcuts** - Quick attendance marking
- **Recent Notices** - Important updates
- **Daily Tasks** - Task management
- **Attendance Analytics** - Class trends

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Violet (#7C3AED)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Cyan (#06B6D4)

### Design Characteristics
- **Modern SaaS Style** - Contemporary enterprise design
- **Premium Look & Feel** - High-end visual polish
- **Clean White + Indigo Theme** - Professional appearance
- **Material Design System** - MUI components
- **Soft Shadows** - Subtle depth
- **Rounded Corners** - 16px default radius
- **Smooth Animations** - Framer Motion transitions

## 📱 Responsive Design

### Breakpoints
- **Mobile** (xs): 0-600px
- **Tablet** (sm/md): 600-1200px
- **Desktop** (lg/xl): 1200px+

### Features
- Fully responsive layouts
- Mobile Navigation Drawer
- Touch-friendly controls
- Adaptive tables and grids
- Responsive charts

## 🌓 Dark/Light Mode
- **Context API Theme Management** - Global theme switching
- **Persistent Theme** - Saved in localStorage
- **Smooth Transitions** - Animated theme switching
- **Full Component Support** - All components themed

## 📦 Technology Stack

### Core Framework
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### UI Components
- **Material UI (MUI)** - Component library
- **MUI DataGrid** - Advanced data table
- **MUI X** - Extended components

### Styling & Animation
- **Emotion** - CSS-in-JS styling (MUI dependency)
- **Framer Motion** - Smooth animations
- **TailwindCSS** - Utility-first CSS (optional)

### Forms & Data
- **React Hook Form** - Efficient form handling
- **Mock Data** - Realistic test data

### Charts & Visualization
- **Recharts** - Data visualization
- **BarChart, LineChart, PieChart** - Chart types

### Icons
- **MUI Icons** - Material Design icons
- **Lucide React** - Additional icons (optional)

## 🗂️ Project Structure

```
src/
├── context/
│   ├── ThemeContext.jsx       # Dark/Light mode management
│   └── AuthContext.jsx        # Authentication state
├── components/
│   ├── layout/
│   │   └── AppShell.jsx       # Main layout with sidebar
│   ├── ui/
│   │   └── [UI Components]    # Reusable components
│   └── ProtectedRoute.jsx     # Route protection
├── pages/
│   ├── auth/
│   │   ├── AdminLogin.jsx
│   │   ├── StudentLogin.jsx
│   │   └── TeacherLogin.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── StudentManagement.jsx
│   │   ├── AttendanceManagement.jsx
│   │   └── NoticesManagement.jsx
│   ├── student/
│   │   └── StudentDashboard.jsx
│   ├── teacher/
│   │   └── TeacherDashboard.jsx
│   └── PlaceholderPage.jsx    # Coming soon modules
├── data/
│   └── mockData.js            # Mock data for demo
├── main.jsx                   # App entry point
└── index.css                  # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Time Setup
1. Navigate to http://localhost:5173
2. Select your portal: Admin, Student, or Teacher
3. Use the demo credentials provided on login page
4. Explore the features

## 🔐 Demo Credentials

### Admin Portal
- Email: `admin@schoolerp.demo`
- Password: `Admin@123`
- Access: Full system access

### Student Portal
- Email: `student@schoolerp.demo`
- Password: `Student@123`
- Access: Personal dashboard and notices

### Teacher Portal
- Email: `teacher@schoolerp.demo`
- Password: `Teacher@123`
- Access: Class management and attendance

## 📋 Future Scalability Modules

The following modules are included in the sidebar as placeholders for future implementation:

- **Fee Management** - Complete financial tracking
- **Result Management** - Academic performance tracking
- **Parent Portal** - Parent access and communication
- **Timetable** - Class schedule management
- **Library Management** - Book inventory system
- **Transport Management** - Bus route coordination

## 🎯 Key Components

### Authentication
- Login pages with demo credentials
- Protected routes with role-based access
- Mock authentication system

### Theme System
- Light and Dark modes
- MUI theme customization
- Persistent user preferences

### Navigation
- Responsive sidebar/drawer
- Breadcrumb navigation
- Active route highlighting

### Forms
- React Hook Form integration
- Validation and error handling
- Dialog-based forms

### Data Display
- MUI DataGrid with sorting/filtering
- Charts with Recharts
- Tables with responsive design

### Responsive Layouts
- Mobile-first approach
- Breakpoint-based grid
- Touch-friendly interactions

## 🎨 Customization

### Colors
Edit theme colors in `src/context/ThemeContext.jsx`:
```javascript
primary: { main: '#4F46E5' },
secondary: { main: '#7C3AED' },
```

### Fonts
Update typography in theme configuration:
```javascript
typography: {
  fontFamily: '"Inter", "Roboto", ...',
}
```

### Spacing
Adjust theme spacing for consistent sizing:
```javascript
shape: { borderRadius: 16 }
```

## 📊 Mock Data

All demo data is stored in `src/data/mockData.js` including:
- Students list
- Teachers list
- Attendance records
- Notices and announcements
- Analytics data
- Events and calendar

## 🔍 Searching & Filtering

### Student Search
- By name
- By email
- By roll number
- By class
- By status

### Notice Search
- By title
- By content
- By category
- Important flag

## 📈 Analytics

### Charts Included
- Weekly Attendance Chart
- Monthly Fee Collection
- Class Attendance Trends
- Performance Analytics

## 🛠️ Development Tips

### Adding New Pages
1. Create page in appropriate folder
2. Add route in `main.jsx`
3. Add menu item in `AppShell.jsx`
4. Use ProtectedRoute for auth

### Creating Components
1. Use MUI components as base
2. Leverage Framer Motion for animation
3. Follow Material Design principles
4. Ensure mobile responsiveness

### Styling
- Use `sx` prop for inline styles
- Reference theme colors
- Maintain spacing consistency
- Follow rounded corner convention (16px)

## 📝 Notes

- All data is mock and resets on page refresh
- Authentication is demo-based
- Changes are not persisted
- This is a frontend-only demo
- Backend API integration ready

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
vercel --prod
```

## 📞 Support

For a complete School ERP solution with backend, contact the development team for enterprise features including:
- Database integration
- User authentication
- Real-time notifications
- Mobile applications
- API endpoints
- Payment integration

## 📄 License

This is a premium enterprise demo. All rights reserved.

---

**Built with ❤️ for Premium School Management**
