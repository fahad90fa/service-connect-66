import AdminLayout from "@/components/admin/AdminLayout";
import { bookings } from "@/data/mock-data";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  pending:      { bg: "hsl(36 96% 52% / 0.10)",  text: "hsl(28 90% 38%)",  border: "hsl(36 96% 52% / 0.22)" },
  confirmed:    { bg: "hsl(210 85% 52% / 0.10)", text: "hsl(210 75% 38%)", border: "hsl(210 85% 52% / 0.22)" },
  "in-progress":{ bg: "hsl(265 72% 55% / 0.10)", text: "hsl(265 68% 44%)", border: "hsl(265 72% 55% / 0.22)" },
  completed:    { bg: "hsl(152 62% 38% / 0.10)", text: "hsl(152 55% 30%)", border: "hsl(152 62% 38% / 0.22)" },
  cancelled:    { bg: "hsl(0 75% 52% / 0.10)",   text: "hsl(0 68% 40%)",   border: "hsl(0 75% 52% / 0.22)" },
};

const filterColors: Record<string, string> = {
  All:           "hsl(248 62% 32%)",
  pending:       "hsl(36 96% 44%)",
  confirmed:     "hsl(210 85% 48%)",
  "in-progress": "hsl(265 72% 50%)",
  completed:     "hsl(152 62% 34%)",
  cancelled:     "hsl(0 72% 48%)",
};

const statusOptions = ["pending", "confirmed", "in-progress", "completed", "cancelled"] as const;

const AdminBookings = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookingList, setBookingList] = useState(bookings);

  const filtered = bookingList.filter((b) => {
    const matchesSearch =
      b.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      b.providerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setBookingList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus as typeof statusOptions[number] } : b))
    );
    toast.success(`Booking ${id} updated to ${newStatus}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl space-y-5">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display font-bold text-2xl">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">View and manage all bookings</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold"
            style={{
              background: "hsl(248 62% 32% / 0.09)",
              border: "1px solid hsl(248 62% 32% / 0.18)",
              color: "hsl(248 62% 42%)",
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            {bookingList.length} total
          </motion.div>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <div
            className="flex-1 min-w-[200px] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all duration-300"
            style={{ background: "hsl(var(--muted))", border: "1.5px solid transparent" }}
            onFocus={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(248 62% 42% / 0.35)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.06)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {["All", ...statusOptions].map((s) => {
              const isActive = statusFilter === s;
              const color = filterColors[s] ?? "hsl(248 62% 32%)";
              return (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.90 }}
                  onClick={() => setStatusFilter(s)}
                  className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-300"
                  style={isActive
                    ? { background: color, color: "hsl(0 0% 100%)", boxShadow: `0 4px 14px ${color.replace(")", " / 0.30)")}` }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {s}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.55)",
            boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "hsl(var(--muted) / 0.40)", borderBottom: "1px solid hsl(var(--border) / 0.40)" }}>
                  {["ID", "Service", "Provider", "Date & Time", "Status", "Amount", "Update"].map((h) => (
                    <th
                      key={h}
                      className={`py-3.5 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${h === "Amount" || h === "Update" ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((b, i) => {
                    const sc = statusColors[b.status] ?? statusColors.pending;
                    return (
                      <motion.tr
                        key={b.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 0.25 + i * 0.04 }}
                        className="transition-colors"
                        style={{ borderBottom: "1px solid hsl(var(--border) / 0.25)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted) / 0.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="py-3.5 px-5 text-xs font-mono text-muted-foreground">{b.id}</td>
                        <td className="py-3.5 px-5 text-xs font-medium">{b.serviceName}</td>
                        <td className="py-3.5 px-5 text-xs text-muted-foreground">{b.providerName}</td>
                        <td className="py-3.5 px-5 text-xs text-muted-foreground">
                          <span>{b.date}</span>
                          <span className="mx-1.5 opacity-40">•</span>
                          <span>{b.time}</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                            style={{
                              background: sc.bg,
                              color: sc.text,
                              border: `1px solid ${sc.border}`,
                            }}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right font-display font-bold text-sm">${b.price}</td>
                        <td className="py-3.5 px-5 text-right">
                          <select
                            value={b.status}
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                            className="text-xs rounded-xl px-2.5 py-1.5 outline-none transition-all duration-300"
                            style={{
                              background: "hsl(var(--muted))",
                              border: "1px solid hsl(var(--border) / 0.50)",
                              color: "hsl(var(--foreground))",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = "hsl(248 62% 42% / 0.40)";
                              e.currentTarget.style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.08)";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "hsl(var(--border) / 0.50)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <motion.p
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl mb-3"
                >
                  📋
                </motion.p>
                <p className="text-sm font-semibold text-foreground">No bookings found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
