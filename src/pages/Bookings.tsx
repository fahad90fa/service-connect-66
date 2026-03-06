import { useState } from "react";
import { bookings } from "@/data/mock-data";
import BookingCard from "@/components/user/BookingCard";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["All", "Upcoming", "Completed", "Cancelled"] as const;

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
    <div className="min-h-screen bg-background pb-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border/40 px-5 pt-5 pb-3"
      >
        <h1 className="font-display font-bold text-xl">My Bookings</h1>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="px-5 mt-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((booking, i) => (
            <BookingCard key={booking.id} booking={booking} index={i} />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-3"
              >
                📋
              </motion.p>
              <p className="text-sm text-muted-foreground font-medium">No bookings found</p>
              <p className="text-xs text-muted-foreground mt-1">Your booking history will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bookings;
