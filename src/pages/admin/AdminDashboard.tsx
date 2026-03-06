import AdminLayout from "@/components/admin/AdminLayout";
import { adminStats } from "@/data/mock-data";
import { Users, Calendar, Wrench, DollarSign, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

const statCards = [
  {
    label: "Total Bookings",
    value: adminStats.totalBookings,
    icon: Calendar,
    from: "hsl(210 85% 38%)",
    to: "hsl(228 75% 50%)",
    glow: "hsl(210 85% 48% / 0.35)",
    trend: "+12%",
    up: true,
  },
  {
    label: "Active Users",
    value: adminStats.activeUsers,
    icon: Users,
    from: "hsl(152 62% 28%)",
    to: "hsl(166 68% 38%)",
    glow: "hsl(152 62% 38% / 0.35)",
    trend: "+8%",
    up: true,
  },
  {
    label: "Providers",
    value: adminStats.serviceProviders,
    icon: Wrench,
    from: "hsl(265 68% 38%)",
    to: "hsl(280 65% 50%)",
    glow: "hsl(265 68% 48% / 0.35)",
    trend: "+3%",
    up: true,
  },
  {
    label: "Revenue",
    value: `$${adminStats.revenue.toLocaleString()}`,
    icon: DollarSign,
    from: "hsl(36 96% 38%)",
    to: "hsl(22 90% 48%)",
    glow: "hsl(36 96% 52% / 0.40)",
    trend: "+21%",
    up: true,
  },
];

const statusColors: Record<string, { bar: string; text: string }> = {
  pending:      { bar: "hsl(36 96% 52%)",  text: "hsl(28 90% 38%)"  },
  confirmed:    { bar: "hsl(210 85% 52%)", text: "hsl(210 80% 38%)" },
  "in-progress":{ bar: "hsl(265 72% 55%)", text: "hsl(265 70% 45%)" },
  completed:    { bar: "hsl(152 62% 38%)", text: "hsl(152 58% 30%)" },
  cancelled:    { bar: "hsl(0 75% 52%)",   text: "hsl(0 70% 40%)"   },
};

const AdminDashboard = () => {
  const total = Object.values(adminStats.bookingsByStatus).reduce((a, b) => a + b, 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl space-y-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display font-bold text-2xl">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Platform overview & analytics</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "hsl(152 62% 38% / 0.12)",
              border: "1px solid hsl(152 62% 38% / 0.22)",
              color: "hsl(152 58% 32%)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: "hsl(152 62% 38%)" }} />
            Live
          </motion.div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map(({ label, value, icon: Icon, from, to, glow, trend, up }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl p-5 relative overflow-hidden cursor-default"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.55)",
                boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06), 0 1px 0 hsl(0 0% 100% / 0.85) inset",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 4px 16px ${glow}` }}
                >
                  <Icon className="w-4.5 h-4.5 text-white relative z-10" style={{ width: 18, height: 18 }} />
                  <div className="absolute inset-0 shimmer" />
                </div>
                <div
                  className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: up ? "hsl(152 62% 38% / 0.10)" : "hsl(0 72% 48% / 0.10)",
                    color: up ? "hsl(152 58% 32%)" : "hsl(0 68% 42%)",
                  }}
                >
                  {up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {trend}
                </div>
              </div>
              <p className="font-display font-black text-2xl">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.55)",
              boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-sm">Monthly Revenue</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Last 6 months performance</p>
              </div>
              <button
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "hsl(248 62% 42%)" }}
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminStats.monthlyRevenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="hsl(36 96% 52%)" stopOpacity={0.20} />
                      <stop offset="95%" stopColor="hsl(36 96% 52%)" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.40)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border) / 0.55)",
                      background: "hsl(var(--card))",
                      boxShadow: "0 8px 24px hsl(248 50% 20% / 0.12)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(36 96% 52%)"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={{ fill: "hsl(36 96% 52%)", strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, fill: "hsl(36 96% 52%)", boxShadow: "0 0 8px hsl(36 96% 52% / 0.5)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Booking Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.55)",
              boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
            }}
          >
            <h3 className="font-display font-semibold text-sm mb-1">Booking Status</h3>
            <p className="text-[11px] text-muted-foreground mb-4">{total} total bookings</p>
            <div className="space-y-4">
              {Object.entries(adminStats.bookingsByStatus).map(([status, count]) => {
                const pct = Math.round((count / total) * 100);
                const sc = statusColors[status];
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: sc.bar }} />
                        <span className="capitalize font-medium text-muted-foreground">{status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{count}</span>
                        <span className="text-[10px] text-muted-foreground">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: sc.bar }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Recent Bookings Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.55)",
            boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
          }}
        >
          <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid hsl(var(--border) / 0.40)" }}>
            <div>
              <h3 className="font-display font-semibold text-sm">Recent Bookings</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Latest transactions</p>
            </div>
            <button
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{
                background: "hsl(248 62% 32% / 0.08)",
                color: "hsl(248 62% 42%)",
              }}
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "hsl(var(--muted) / 0.40)" }}>
                  {["ID", "Service", "Provider", "Date", "Status", "Amount"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminStats.recentBookings.map((b, i) => {
                  const sc = statusColors[b.status];
                  return (
                    <motion.tr
                      key={b.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.52 + i * 0.05 }}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid hsl(var(--border) / 0.25)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted) / 0.25)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="py-3.5 px-5 text-xs font-mono text-muted-foreground">{b.id}</td>
                      <td className="py-3.5 px-5 text-xs font-medium">{b.serviceName}</td>
                      <td className="py-3.5 px-5 text-xs text-muted-foreground">{b.providerName}</td>
                      <td className="py-3.5 px-5 text-xs text-muted-foreground">{b.date}</td>
                      <td className="py-3.5 px-5">
                        <span
                          className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: `${sc.bar.replace(")", " / 0.12)")}`,
                            color: sc.text,
                            border: `1px solid ${sc.bar.replace(")", " / 0.20)")}`,
                          }}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-display font-bold text-sm">${b.price}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
