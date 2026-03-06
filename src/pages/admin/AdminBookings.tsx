import AdminLayout from "@/components/admin/AdminLayout";
import { bookings } from "@/data/mock-data";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const statusOptions = ["All", "pending", "confirmed", "in-progress", "completed", "cancelled"];

const AdminBookings = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookingList, setBookingList] = useState(bookings);

  const filtered = bookingList.filter((b) => {
    const matchesSearch = b.serviceName.toLowerCase().includes(search.toLowerCase()) || b.providerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setBookingList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
    );
    toast.success(`Booking ${id} updated to ${newStatus}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl">Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage all bookings</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mt-5"
        >
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-muted rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {statusOptions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.93 }}
                onClick={() => setStatusFilter(s)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-300 ${
                  statusFilter === s ? "bg-primary text-primary-foreground shadow-md shadow-primary/15" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/60 mt-4 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Service</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Provider</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right px-4 py-3.5 text-xs font-medium text-muted-foreground">Amount</th>
                  <th className="text-right px-4 py-3.5 text-xs font-medium text-muted-foreground">Update</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="border-b border-border/20 hover:bg-muted/15 transition-colors"
                  >
                    <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">{b.id}</td>
                    <td className="px-4 py-3.5 font-medium text-xs">{b.serviceName}</td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{b.providerName}</td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{b.date} • {b.time}</td>
                    <td className="px-4 py-3.5">
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
                    <td className="px-4 py-3.5 text-right font-bold text-xs">${b.price}</td>
                    <td className="px-4 py-3.5 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className="bg-muted text-xs rounded-xl px-2.5 py-1.5 outline-none border border-border/40 focus:ring-2 focus:ring-secondary/30 transition-all"
                      >
                        {["pending", "confirmed", "in-progress", "completed", "cancelled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
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

export default AdminBookings;
