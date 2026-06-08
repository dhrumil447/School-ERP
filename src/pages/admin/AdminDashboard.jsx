import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip,
  Legend, ResponsiveContainer, ComposedChart, PieChart, Pie, Cell,
} from 'recharts';
import {
  mockStudents,
  mockTeachers,
  mockActivities,
  mockEvents,
  mockNotices,
  mockWeeklyAttendance,
  mockMonthlyFeeData,
  mockFeeCollectionExpenses,
  mockIncomeBreakdown,
  mockExpenseBreakdown,
  mockStudentPerformance,
  mockClassAttendance,
  mockFeeStatusSummary,
  mockEnrollmentTrend,
  mockSubjectPerformance,
  mockTeacherWorkload,
  mockMonthlyExpenseTrend,
} from '../../data/mockData';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#f8fafc",
  surface: "#ffffff",
  surfaceHi: "#f1f5f9",

  border: "#e2e8f0",
  borderHi: "#cbd5e1",

  text: "#0f172a",
  muted: "#64748b",
  dim: "#94a3b8",

  accent: "#4f46e5",
  accentGlow: "rgba(79,70,229,0.12)",

  green: "#22c55e",
  red: "#ef4444",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  pink: "#ec4899",
};

const TT = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  color: "#0f172a",
  fontSize: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Badge = ({ children, color = T.accent }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700,
    letterSpacing: '0.4px', textTransform: 'uppercase',
    background: color + '22', color, border: `1px solid ${color}40`,
  }}>
    {children}
  </span>
);

const GlowDot = ({ color }) => (
  <div style={{
    position: 'absolute', top: -28, right: -28,
    width: 90, height: 90, borderRadius: '50%',
    background: `radial-gradient(circle, ${color}2a 0%, transparent 70%)`,
    pointerEvents: 'none',
  }} />
);

const TopBar = ({ color }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    background: `linear-gradient(90deg, ${color}, transparent)`,
  }} />
);

const AddBtn = ({ onClick, label }) => (
  <button
    onClick={onClick}
    onMouseEnter={e => e.currentTarget.style.background = T.accent + '30'}
    onMouseLeave={e => e.currentTarget.style.background = T.accentGlow}
    style={{
      background: T.accentGlow, color: T.accent,
      border: `1px solid ${T.accent}40`, borderRadius: 8,
      padding: '5px 13px', fontSize: 12, fontWeight: 600,
      cursor: 'pointer', transition: 'background 0.2s',
    }}
  >
    + {label}
  </button>
);

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
const KPICard = ({ label, value, sub, subUp, accent, icon, mini = false }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.015 }}
    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 16, padding: mini ? '16px 18px' : '22px 24px',
      position: 'relative', overflow: 'hidden', flex: 1, minWidth: 0,
    }}
  >
    <GlowDot color={accent} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: accent + '20', border: `1px solid ${accent}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
      }}>
        {icon}
      </div>
    </div>
    <div style={{ fontSize: mini ? 22 : 28, fontWeight: 800, color: T.text, letterSpacing: '-0.5px', marginBottom: 10 }}>
      {value}
    </div>
    {sub && (
      <span style={{
        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 5,
        background: (subUp ? T.green : T.red) + '20',
        color: subUp ? T.green : T.red,
        border: `1px solid ${(subUp ? T.green : T.red)}30`,
      }}>
        {subUp ? '▲' : '▼'} {sub}
      </span>
    )}
  </motion.div>
);

// ─── CHART CARD ───────────────────────────────────────────────────────────────
const ChartCard = ({ title, subtitle, children, action, accent = T.accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 16, padding: 24, height: '100%',
      position: 'relative', overflow: 'hidden',
    }}
  >
    <TopBar color={accent} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 3 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: T.muted }}>{subtitle}</div>}
      </div>
      {action}
    </div>
    {children}
  </motion.div>
);

// ─── ACTIVITY TAG ─────────────────────────────────────────────────────────────
const TAG_COLORS = {
  'Student Added':      T.cyan,
  'Attendance Updated': T.accent,
  'Notice Published':   T.amber,
  'Fee Payment':        T.green,
  'Report Generated':   T.violet,
};

const Tag = ({ type }) => {
  const c = TAG_COLORS[type] || T.accent;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 5,
      textTransform: 'uppercase', letterSpacing: '0.5px',
      background: c + '1e', color: c, border: `1px solid ${c}30`,
      whiteSpace: 'nowrap',
    }}>
      {type}
    </span>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [openNotice, setOpenNotice] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });

  // ── Derived metrics ──
  const pendingStudents   = mockStudents.filter(s => s.feeStatus === 'pending').length;
  const feeAwaiting       = pendingStudents * 15000;
  const lastMonthFee      = mockMonthlyFeeData.current.at(-1);
  const totalCollected    = lastMonthFee.collected;
  const totalTarget       = lastMonthFee.target;
  const collectionPct     = Math.round((totalCollected / totalTarget) * 100);
  const totalExpense      = mockExpenseBreakdown.reduce((s, d) => s + d.value, 0);
  const netProfit         = totalCollected - totalExpense;
  const totalTeachers     = mockTeachers.length;
  const latestDay         = mockWeeklyAttendance.thisWeek.at(-1);
  const studentsPresent   = latestDay?.count ?? 0;

  const handlePublish = () => {
    setOpenNotice(false);
    setNoticeForm({ title: '', content: '' });
  };

  return (
    <div style={{
      background: T.bg, minHeight: '100vh', color: T.text,
      fontFamily: "'DM Sans', 'Sora', sans-serif",
      padding: '28px 24px', boxSizing: 'border-box',
    }}>
      {/* Fonts + global resets */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
        input, textarea { font-family: inherit; outline: none; }
        input::placeholder, textarea::placeholder { color: ${T.dim}; }
      `}</style>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Badge color={T.green}>● Live</Badge>
          <span style={{ fontSize: 12, color: T.muted }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: T.text, letterSpacing: '-0.8px', lineHeight: 1.15 }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: 14, color: T.muted, marginTop: 4 }}>
          School performance overview · real-time insights
        </p>
      </div>

      {/* ── Row 1 — Primary KPIs ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
        <KPICard label="Fee Awaiting"        value={`₹${(feeAwaiting / 100000).toFixed(2)}L`}   sub={`${pendingStudents} students pending`}  subUp={false} accent={T.pink}  icon="💸" />
        <KPICard label="Monthly Collection"  value={`₹${(totalCollected / 100000).toFixed(2)}L`} sub={`${collectionPct}% of target`}           subUp={collectionPct >= 90}   accent={T.green} icon="💰" />
        <KPICard label="Expenses"            value={`₹${(totalExpense / 100000).toFixed(2)}L`}   sub="This month"                              subUp={false} accent={T.red}   icon="📉" />
        <KPICard label="Net Profit"          value={`₹${(netProfit / 100000).toFixed(2)}L`}      sub="This month"                              subUp={netProfit > 0}         accent={T.amber} icon="📈" />
      </div>

      {/* ── Row 2 — Secondary KPIs ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}>
        <KPICard label="Teachers Present"  value={`${totalTeachers} / ${totalTeachers}`} sub="Today"       subUp={true} accent={T.violet} icon="🎓" mini />
        <KPICard label="Students Present"  value={`${studentsPresent} / 5000`}           sub="Today"       subUp={true} accent={T.cyan}   icon="👨‍🎓" mini />
        <KPICard label="Staff Present"     value="40 / 40"                               sub="Today"       subUp={true} accent={T.green}  icon="🏫" mini />
        <KPICard label="Converted Leads"   value="2 / 10"                                sub="This month"  subUp={true} accent={T.amber}  icon="🎯" mini />
      </div>

      {/* ── Fee Collection vs Expenses — Full Width ── */}
      <div style={{ marginBottom: 20 }}>
        <ChartCard title="Fee Collection vs Expenses" subtitle="Monthly comparison · current year" accent={T.green}>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            {[['Fee Collection', T.green], ['Expenses', T.red]].map(([l, c]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                <span style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{l}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockFeeCollectionExpenses} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="month" stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <YAxis stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <ChartTooltip contentStyle={TT} formatter={v => `₹${v}k`} />
              <Bar dataKey="feeCollection" name="Fee Collection" fill={T.green} radius={[5, 5, 0, 0]} />
              <Bar dataKey="expenses"      name="Expenses"       fill={T.red}   radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Charts Row A ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>

        <ChartCard title="Student Performance Distribution" subtitle="Score range breakdown" accent={T.violet}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockStudentPerformance} layout="vertical" margin={{ top: 0, right: 10, left: 55, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis type="number" stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} />
              <YAxis dataKey="range" type="category" stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} width={55} />
              <ChartTooltip contentStyle={TT} />
              <Bar dataKey="students" fill={T.violet} radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Class-wise Attendance" subtitle="Attendance % per class" accent={T.cyan}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockClassAttendance} margin={{ top: 5, right: 10, left: -10, bottom: 45 }}>
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.cyan} stopOpacity={1} />
                  <stop offset="100%" stopColor={T.cyan} stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="class" stroke={T.dim} tick={{ fill: T.muted, fontSize: 10 }} angle={-40} textAnchor="end" height={60} />
              <YAxis stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} />
              <ChartTooltip contentStyle={TT} formatter={v => `${v}%`} />
              <Bar dataKey="attendance" fill="url(#cyanGrad)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ── Charts Row B ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>

        <ChartCard title="Fee Status Summary" subtitle="Overall collection status" accent={T.amber}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={mockFeeStatusSummary} cx="50%" cy="50%"
                outerRadius={95} innerRadius={50} dataKey="count"
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: T.dim }}
              >
                {mockFeeStatusSummary.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <ChartTooltip contentStyle={TT} formatter={v => `${v} students`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Enrollment Trend" subtitle="Last 6 months" accent={T.pink}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockEnrollmentTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.pink} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={T.pink} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="month" stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <YAxis stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <ChartTooltip contentStyle={TT} />
              <Area type="monotone" dataKey="enrollment" fill="url(#pinkGrad)" stroke={T.pink} strokeWidth={2.5} dot={{ fill: T.pink, r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ── Charts Row C ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>

        <ChartCard title="Subject Performance" subtitle="Average scores %" accent={T.green}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockSubjectPerformance} margin={{ top: 5, right: 10, left: -10, bottom: 50 }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.green} stopOpacity={1} />
                  <stop offset="100%" stopColor={T.green} stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="subject" stroke={T.dim} tick={{ fill: T.muted, fontSize: 10 }} angle={-40} textAnchor="end" height={65} />
              <YAxis stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} />
              <ChartTooltip contentStyle={TT} formatter={v => `${v}%`} />
              <Bar dataKey="average" fill="url(#greenGrad)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Expense Trend" subtitle="₹ thousands" accent={T.red}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mockMonthlyExpenseTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="month" stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <YAxis stroke={T.dim} tick={{ fill: T.muted, fontSize: 12 }} />
              <ChartTooltip contentStyle={TT} formatter={v => `₹${v}k`} />
              <Line type="monotone" dataKey="expenses" stroke={T.red} strokeWidth={2.5}
                dot={{ fill: T.red, r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: T.red }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ── Teacher Workload — Full Width ── */}
      <div style={{ marginBottom: 20 }}>
        <ChartCard title="Teacher Workload Distribution" subtitle="Classes & students assigned" accent={T.accent}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={mockTeacherWorkload} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis type="number" stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} />
              <YAxis dataKey="name" type="category" stroke={T.dim} tick={{ fill: T.muted, fontSize: 11 }} width={100} />
              <ChartTooltip contentStyle={TT} />
              <Legend wrapperStyle={{ color: T.muted, fontSize: 12 }} />
              <Bar dataKey="classes"  name="Classes"  fill={T.accent} radius={[0, 5, 5, 0]} />
              <Bar dataKey="students" name="Students" fill={T.violet} radius={[0, 5, 5, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Events & Notices ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 20 }}>

        <ChartCard title="Upcoming Events" subtitle="Next scheduled events" accent={T.cyan}
          action={<AddBtn label="Add Event" />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockEvents.map(ev => (
              <motion.div key={ev.id} whileHover={{ x: 4 }} style={{
                background: T.surfaceHi, borderRadius: 12,
                border: `1px solid ${T.border}`, padding: '13px 15px', cursor: 'pointer',
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 6 }}>{ev.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 11, color: T.muted }}>
                  <span>📅 {fmtDate(ev.date)}</span>
                  <span>🕐 {ev.time}</span>
                  <span>📍 {ev.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Notice Board" subtitle="Latest updates" accent={T.amber}
          action={<AddBtn label="Add Notice" onClick={() => setOpenNotice(true)} />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mockNotices.map(n => (
              <motion.div key={n.id} whileHover={{ x: 4 }} style={{
                padding: '11px 13px', borderRadius: 10, cursor: 'pointer',
                borderLeft: `3px solid ${n.important ? T.red : T.accent}`,
                background: n.important ? T.red + '0c' : T.accent + '0c',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: T.text, flex: 1 }}>{n.title}</span>
                  {n.important && <Badge color={T.red}>Urgent</Badge>}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: T.muted }}>{fmtDate(n.date)}</span>
                  <span style={{ fontSize: 10, color: T.dim }}>· {n.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

      </div>

      {/* ── Recent Activities ── */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: 24, marginBottom: 8,
        position: 'relative', overflow: 'hidden',
      }}>
        <TopBar color={T.violet} />
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Recent Activities</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Type', 'Description', 'Time'].map(h => (
                  <th key={h} style={{
                    padding: '9px 14px', textAlign: 'left', fontSize: 10,
                    fontWeight: 700, color: T.muted, letterSpacing: '0.6px',
                    textTransform: 'uppercase', borderBottom: `1px solid ${T.border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockActivities.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <td style={{ padding: '12px 14px' }}><Tag type={a.type} /></td>
                  <td style={{ padding: '12px 14px', color: T.muted, lineHeight: 1.5 }}>{a.description}</td>
                  <td style={{ padding: '12px 14px', color: T.dim, whiteSpace: 'nowrap', fontSize: 12 }}>{a.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add Notice Modal ── */}
      <AnimatePresence>
        {openNotice && (
          <div
            onClick={() => setOpenNotice(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)', zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: T.surface, border: `1px solid ${T.borderHi}`,
                borderRadius: 18, padding: 32, width: '100%', maxWidth: 480,
                boxShadow: '0 40px 80px rgba(0,0,0,0.55)',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 20 }}>
                Create New Notice
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { placeholder: 'Notice Title', key: 'title', multiline: false },
                  { placeholder: 'Notice Content', key: 'content', multiline: true },
                ].map(({ placeholder, key, multiline }) => {
                  const shared = {
                    value: noticeForm[key],
                    onChange: e => setNoticeForm({ ...noticeForm, [key]: e.target.value }),
                    placeholder,
                    onFocus: e => e.target.style.borderColor = T.accent,
                    onBlur:  e => e.target.style.borderColor = T.border,
                    style: {
                      background: T.bg, border: `1px solid ${T.border}`,
                      borderRadius: 10, padding: '11px 14px',
                      color: T.text, fontSize: 14, width: '100%',
                      transition: 'border-color 0.2s',
                    },
                  };
                  return multiline
                    ? <textarea key={key} {...shared} rows={4} style={{ ...shared.style, resize: 'vertical' }} />
                    : <input    key={key} {...shared} />;
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
                <button
                  onClick={() => setOpenNotice(false)}
                  style={{
                    background: 'transparent', border: `1px solid ${T.border}`,
                    borderRadius: 8, padding: '9px 18px',
                    color: T.muted, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  style={{
                    background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                    border: 'none', borderRadius: 8, padding: '9px 20px',
                    color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  }}
                >
                  Publish Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}