import { Booking } from "@/data/mock-data";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const statusConfig: Record<string, { bg: string; dot: string }> = {
  pending: { bg: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning" },
  confirmed: { bg: "bg-info/10 text-info border-info/20", dot: "bg-info" },
  "in-progress": { bg: "bg-secondary/10 text-secondary border-secondary/20", dot: "bg-secondary" },
  completed: { bg: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  cancelled: { bg: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
};

const BookingCard = ({ booking, index = 0 }: { booking: Booking; index?: number }) => {
  const status = statusConfig[booking.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ x: 4 }}
      className="bg-card rounded-2xl border border-border/60 p-4 hover:shadow-md hover:border-border transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold text-sm text-card-foreground">{booking.serviceName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">by {booking.providerName}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${status.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse-soft`} />
          {booking.status}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 mt-3.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {booking.date}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {booking.time}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {booking.address}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-border/40">
        <span className="font-display font-bold text-card-foreground text-base">${booking.price}</span>
        <span className="text-[10px] text-muted-foreground font-mono">#{booking.id}</span>
      </div>
    </motion.div>
  );
};

export default BookingCard;
