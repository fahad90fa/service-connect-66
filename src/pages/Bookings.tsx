import { useState } from "react";
import { bookings } from "@/data/mock-data";
import BookingCard from "@/components/user/BookingCard";

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
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50 px-5 pt-5 pb-3">
        <h1 className="font-display font-bold text-xl">My Bookings</h1>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        {filtered.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm text-muted-foreground">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
