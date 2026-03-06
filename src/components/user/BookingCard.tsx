import { Booking } from "@/data/mock-data";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Loader2, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

const statusConfig: Record<string, {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
  icon: typeof CheckCircle2;
  pulse: boolean;
}> = {
  pending:      { label: "Pending",     bg: "hsl(36 96% 52% / 0.10)",  text: "hsl(28 90% 42%)",  border: "hsl(36 96% 52% / 0.25)", dot: "hsl(36 96% 52%)",  icon: Clock3,         pulse: true },
  confirmed:    { label: "Confirmed",   bg: "hsl(210 85% 52% / 0.10)", text: "hsl(210 80% 38%)", border: "hsl(210 85% 52% / 0.25)", dot: "hsl(210 85% 52%)", icon: AlertCircle,    pulse: false },
  "in-progress":{ label: "In Progress", bg: "hsl(265 72% 55% / 0.10)", text: "hsl(265 70% 45%)", border: "hsl(265 72% 55% / 0.25)", dot: "hsl(265 72% 55%)", icon: Loader2,        pulse: true },
  completed:    { label: "Completed",   bg: "hsl(152 62% 38% / 0.10)", text: "hsl(152 58% 30%)", border: "hsl(152 62% 38% / 0.20)", dot: "hsl(152 62% 38%)", icon: CheckCircle2,   pulse: false },
  cancelled:    { label: "Cancelled",   bg: "hsl(0 75% 52% / 0.08)",   text: "hsl(0 70% 42%)",   border: "hsl(0 75% 52% / 0.20)",  dot: "hsl(0 75% 52%)",  icon: XCircle,        pulse: false },
};

const BookingCard = ({ booking, index = 0 }: { booking: Booking; index?: number }) => {
  const s = statusConfig[booking.status] ?? statusConfig.pending;
  const StatusIcon = s.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="rounded-[1.25rem] overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border) / 0.55)",
        boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06), 0 1px 0 hsl(0 0% 100% / 0.85) inset",
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-sm text-card-foreground truncate leading-snug">
              {booking.serviceName}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              by <span className="font-medium text-foreground/70">{booking.providerName}</span>
            </p>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
            }}
          >
            <div className="relative flex items-center">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: s.dot }}
              />
              {s.pulse && (
                <div
                  className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-pulse-ring"
                  style={{ background: s.dot }}
                />
              )}
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{ color: s.text }}
            >
              {s.label}
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-2 mt-3.5 pt-3.5"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.45)" }}
        >
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                <Calendar className="w-3 h-3" />
              </div>
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                <Clock className="w-3 h-3" />
              </div>
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                <MapPin className="w-3 h-3" />
              </div>
              <span className="truncate max-w-[120px]">{booking.address}</span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.45)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: s.bg }}
            >
              <StatusIcon className="w-3.5 h-3.5" style={{ color: s.text }} />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">#{booking.id}</span>
          </div>
          <div className="text-right">
            <span className="font-display font-bold text-base text-card-foreground">${booking.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
