import AdminLayout from "@/components/admin/AdminLayout";
import { adminStats } from "@/data/mock-data";
import { Users, Calendar, Wrench, DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
        <h1 className="font-display font-bold text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your platform</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl border border-border/60 p-4">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="font-display font-bold text-xl mt-3">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-5 gap-4 mt-5">
          {/* Revenue Chart */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border/60 p-5">
            <h3 className="font-display font-semibold text-sm">Monthly Revenue</h3>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminStats.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Status */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border/60 p-5">
            <h3 className="font-display font-semibold text-sm">Booking Status</h3>
            <div className="mt-4 space-y-3">
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
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="capitalize text-muted-foreground">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${colors[status]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-card rounded-xl border border-border/60 p-5 mt-5">
          <h3 className="font-display font-semibold text-sm mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">Provider</th>
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-2 text-xs font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3 text-xs font-mono text-muted-foreground">{b.id}</td>
                    <td className="py-3 font-medium text-xs">{b.serviceName}</td>
                    <td className="py-3 text-xs text-muted-foreground">{b.providerName}</td>
                    <td className="py-3 text-xs text-muted-foreground">{b.date}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        b.status === "completed" ? "bg-success/15 text-success" :
                        b.status === "confirmed" ? "bg-info/15 text-info" :
                        b.status === "pending" ? "bg-warning/15 text-warning" :
                        b.status === "cancelled" ? "bg-destructive/15 text-destructive" :
                        "bg-secondary/15 text-secondary"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-xs">${b.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
