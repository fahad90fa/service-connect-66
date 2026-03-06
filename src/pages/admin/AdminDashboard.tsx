import AdminLayout from "@/components/admin/AdminLayout";
import { adminStats } from "@/data/mock-data";
import { Users, Calendar, Wrench, DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const statCards = [
  { label: "Total Bookings", value: adminStats.totalBookings, icon: Calendar, color: "bg-info/10 text-info" },
  { label: "Active Users", value: adminStats.activeUsers, icon: Users, color: "bg-success/10 text-success" },
  { label: "Service Providers", value: adminStats.serviceProviders, icon: Wrench, color: "bg-warning/10 text-warning" },
  { label: "Revenue", value: `$${adminStats.revenue.toLocaleString()}`, icon: DollarSign, color: "bg-secondary/10 text-secondary" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your platform</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl border border-border/60 p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">+12%</span>
                </div>
              </div>
              <p className="font-display font-bold text-2xl mt-3">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-5 gap-4 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-card rounded-2xl border border-border/60 p-5"
          >
            <h3 className="font-display font-semibold text-sm">Monthly Revenue</h3>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminStats.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 89% / 0.5)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid hsl(220 13% 89%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(38 92% 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-5"
          >
            <h3 className="font-display font-semibold text-sm">Booking Status</h3>
            <div className="mt-4 space-y-3.5">
              {Object.entries(adminStats.bookingsByStatus).map(([status, count]) => {
                const total = Object.values(adminStats.bookingsByStatus).reduce((a, b) => a + b, 0);
                const pct = Math.round((count / total) * 100);
                const colors: Record<string, string> = {
                  pending: "bg-warning",
                  confirmed: "bg-info",
                  "in-progress": "bg-secondary",
                  completed: "bg-success",
                  cancelled: "bg-destructive",
                };
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="capitalize text-muted-foreground">{status}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className={`h-full ${colors[status]} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border/60 p-5 mt-5"
        >
          <h3 className="font-display font-semibold text-sm mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2.5 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-2.5 text-xs font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-2.5 text-xs font-medium text-muted-foreground">Provider</th>
                  <th className="text-left py-2.5 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2.5 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-2.5 text-xs font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.recentBookings.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 text-xs font-mono text-muted-foreground">{b.id}</td>
                    <td className="py-3 font-medium text-xs">{b.serviceName}</td>
                    <td className="py-3 text-xs text-muted-foreground">{b.providerName}</td>
                    <td className="py-3 text-xs text-muted-foreground">{b.date}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        b.status === "completed" ? "bg-success/15 text-success" :
                        b.status === "confirmed" ? "bg-info/15 text-info" :
                        b.status === "pending" ? "bg-warning/15 text-warning" :
                        b.status === "cancelled" ? "bg-destructive/15 text-destructive" :
                        "bg-secondary/15 text-secondary"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-bold text-xs">${b.price}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
