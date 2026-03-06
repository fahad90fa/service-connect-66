import { useParams, useNavigate } from "react-router-dom";
import { services } from "@/data/mock-data";
import { ArrowLeft, Star, Clock, Shield, CheckCircle2, Users, Zap, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const categoryConfig: Record<string, { emoji: string; from: string; to: string; glow: string }> = {
  "Cleaning":        { emoji: "🧹", from: "hsl(180 70% 28%)",  to: "hsl(196 76% 38%)",  glow: "hsl(180 70% 38% / 0.40)" },
  "Plumbing":        { emoji: "🔧", from: "hsl(210 72% 32%)",  to: "hsl(228 68% 40%)",  glow: "hsl(210 72% 42% / 0.40)" },
  "Electrical":      { emoji: "⚡", from: "hsl(36 96% 36%)",   to: "hsl(22 90% 44%)",   glow: "hsl(36 96% 52% / 0.45)" },
  "Painting":        { emoji: "🎨", from: "hsl(265 68% 38%)",  to: "hsl(280 65% 48%)",  glow: "hsl(265 68% 52% / 0.40)" },
  "Carpentry":       { emoji: "🪚", from: "hsl(25 70% 32%)",   to: "hsl(15 72% 42%)",   glow: "hsl(25 70% 42% / 0.40)" },
  "Appliance Repair":{ emoji: "🔩", from: "hsl(220 20% 28%)",  to: "hsl(230 18% 38%)",  glow: "hsl(220 20% 48% / 0.35)" },
  "Pest Control":    { emoji: "🐛", from: "hsl(140 55% 26%)",  to: "hsl(152 62% 34%)",  glow: "hsl(152 62% 38% / 0.40)" },
  "Salon at Home":   { emoji: "💇", from: "hsl(340 72% 38%)",  to: "hsl(356 68% 48%)",  glow: "hsl(340 72% 52% / 0.40)" },
};
const fallback = { emoji: "🔨", from: "hsl(248 60% 28%)", to: "hsl(265 68% 38%)", glow: "hsl(248 60% 42% / 0.40)" };

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="text-5xl mb-3">😕</p>
          <p className="text-foreground font-semibold mb-1">Service not found</p>
          <button
            onClick={() => navigate("/services")}
            className="text-sm font-bold mt-1"
            style={{ color: "hsl(36 96% 48%)" }}
          >
            Browse services →
          </button>
        </motion.div>
      </div>
    );
  }

  const cfg = categoryConfig[service.category] ?? fallback;

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("🎉 Booking confirmed!", {
      description: `${service.name} on ${selectedDate} at ${selectedTime}`,
    });
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* ── Hero Header ── */}
      <div
        className="h-56 relative flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${cfg.from} 0%, ${cfg.to} 100%)` }}
      >
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none animate-orb"
          style={{ background: "hsl(0 0% 100% / 0.12)", filter: "blur(32px)" }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "hsl(0 0% 100% / 0.08)", filter: "blur(24px)" }}
        />
        <div className="absolute inset-0 shimmer" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.90 }}
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 rounded-xl flex items-center justify-center z-10"
          style={{
            background: "hsl(0 0% 0% / 0.25)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsl(0 0% 100% / 0.18)",
          }}
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>

        {/* Emoji */}
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="text-7xl relative z-10 select-none drop-shadow-lg"
        >
          {cfg.emoji}
        </motion.span>

        {service.popular && (
          <motion.span
            initial={{ opacity: 0, y: -12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 280 }}
            className="absolute top-5 right-5 text-[10px] font-bold px-3 py-1 rounded-full z-10"
            style={{
              background: "hsl(36 96% 52%)",
              color: "hsl(228 60% 10%)",
              boxShadow: `0 4px 16px ${cfg.glow}`,
            }}
          >
            🔥 POPULAR
          </motion.span>
        )}

        {/* Fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, hsl(var(--background)))` }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 -mt-2 relative z-10"
      >
        {/* Main Card */}
        <div
          className="rounded-[1.5rem] p-5 mb-4"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.55)",
            boxShadow: "0 4px 24px -8px hsl(248 50% 20% / 0.10), 0 1px 0 hsl(0 0% 100% / 0.85) inset",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-bold text-xl leading-tight">{service.name}</h1>
              <div
                className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  background: `${cfg.from.replace(")", " / 0.12)")}`,
                  color: cfg.to,
                }}
              >
                {cfg.emoji} {service.category}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 260 }}
              className="text-right shrink-0"
            >
              <span className="font-display font-black text-2xl text-card-foreground">${service.price}</span>
              <p className="text-[10px] text-muted-foreground">per visit</p>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: s <= Math.floor(service.rating) ? "hsl(36 96% 52%)" : "transparent",
                      color: "hsl(36 96% 52%)",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{service.rating}</span>
              <span className="text-xs text-muted-foreground">({service.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{service.duration}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{service.description}</p>

          {/* Highlights */}
          <div className="mt-4 grid grid-cols-1 gap-2">
            {[
              { icon: Shield, text: "Verified & background-checked professionals", color: "hsl(152 62% 34%)" },
              { icon: Zap, text: "30-day service guarantee included", color: "hsl(36 96% 44%)" },
              { icon: Users, text: "Transparent pricing — no hidden fees", color: "hsl(210 72% 42%)" },
            ].map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                style={{ background: `${color.replace(")", " / 0.07)")}`, border: `1px solid ${color.replace(")", " / 0.14)")}` }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${color.replace(")", " / 0.14)")}` }}
                >
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>
                <span className="text-xs font-medium text-card-foreground">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Provider Mini Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[1.5rem] p-4 mb-4 flex items-center gap-3.5"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.55)",
            boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
            style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}
          >
            👨‍🔧
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm">Sarah Johnson</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-secondary text-secondary" />
                <span className="text-[11px] font-bold">4.9</span>
              </div>
              <span className="text-[10px] text-muted-foreground">• 248 jobs done</span>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: "hsl(var(--muted))" }}
            >
              <Phone className="w-4 h-4 text-muted-foreground" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: "hsl(var(--muted))" }}
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h3 className="font-display font-semibold text-sm mb-2.5 flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black"
              style={{ background: `${cfg.from.replace(")", " / 0.15)")}`, color: cfg.to }}
            >
              1
            </span>
            Select Date
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300"
            style={{
              background: "hsl(var(--card))",
              border: selectedDate ? `1.5px solid ${cfg.to.replace(")", " / 0.40)")}` : "1.5px solid hsl(var(--border) / 0.55)",
              color: "hsl(var(--foreground))",
            }}
          />
        </motion.div>

        {/* Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display font-semibold text-sm mb-2.5 flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black"
              style={{ background: `${cfg.from.replace(")", " / 0.15)")}`, color: cfg.to }}
            >
              2
            </span>
            Select Time
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time, i) => {
              const isSelected = selectedTime === time;
              return (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.46 + i * 0.04, type: "spring", stiffness: 300 }}
                  whileTap={{ scale: 0.91 }}
                  onClick={() => setSelectedTime(time)}
                  className="px-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                  style={isSelected
                    ? {
                      background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})`,
                      color: "hsl(0 0% 100%)",
                      boxShadow: `0 4px 16px ${cfg.glow}`,
                    }
                    : {
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--muted-foreground))",
                    }
                  }
                >
                  {time}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Fixed Bottom CTA ── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 280, damping: 28 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-5 py-4"
        style={{
          background: "hsl(var(--background) / 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid hsl(var(--border) / 0.40)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Amount</p>
            <p className="font-display font-black text-xl">${service.price}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(152 62% 34%)" }} />
            <span>Free cancellation</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.975 }}
          onClick={handleBook}
          className="w-full h-13 py-3.5 rounded-xl font-display font-bold text-sm relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})`,
            color: "hsl(0 0% 100%)",
            boxShadow: `0 8px 28px ${cfg.glow}`,
          }}
        >
          <span className="relative z-10">Book Now — ${service.price}</span>
          <div className="absolute inset-0 shimmer" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;
