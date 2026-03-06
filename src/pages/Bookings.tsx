import { useState } from "react";
import { bookings } from "@/data/mock-data";
import BookingCard from "@/components/user/BookingCard";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

const tabs = ["All", "Upcoming", "Completed", "Cancelled"] as const;

const tabColors: Record<string, string> = {
  All:       "hsl(248 62% 32%)",
  Upcoming:  "hsl(36 96% 44%)",
  Completed: "hsl(152 62% 34%)",
  Cancelled: "hsl(0 72% 48%)",
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered = bookings.filter((b) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") return ["pending", "confirmed", "in-progress"].includes(b.status);
    if (activeTab === "Completed") return b.status === "completed";
    if (activeTab === "Cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 px-5 pt-5 pb-3"
        style={{
          background: "hsl(var(--background) / 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid hsl(var(--border) / 0.40)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-display font-bold text-xl">My Bookings</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">{filtered.length} bookings</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "hsl(248 62% 32% / 0.10)",
              border: "1px solid hsl(248 62% 32% / 0.16)",
            }}
          >
            <CalendarDays className="w-4 h-4" style={{ color: "hsl(248 62% 42%)" }} />
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const color = tabColors[tab];
            return (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.90 }}
                onClick={() => setActiveTab(tab)}
                className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 relative overflow-hidden"
                style={isActive
                  ? {
                    background: color,
                    color: "hsl(0 0% 100%)",
                    boxShadow: `0 4px 14px ${color.replace(")", " / 0.35)")}`,
                  }
                  : {
                    background: "hsl(var(--muted))",
                    color: "hsl(var(--muted-foreground))",
                  }
                }
              >
                <span className="relative z-10">{tab}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Content ── */}
      <div className="px-5 mt-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((booking, i) => (
            <BookingCard key={booking.id} booking={booking} index={i} />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-4"
              >
                📋
              </motion.p>
              <p className="font-display font-semibold text-sm text-foreground">No bookings here</p>
              <p className="text-xs text-muted-foreground mt-1.5">
                {activeTab === "All" ? "Your booking history will appear here" : `No ${activeTab.toLowerCase()} bookings`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bookings;
