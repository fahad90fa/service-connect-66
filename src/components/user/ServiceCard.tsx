import { Star, Clock, ArrowUpRight } from "lucide-react";
import { Service } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categoryConfig: Record<string, { emoji: string; from: string; to: string; glow: string }> = {
  "Cleaning":        { emoji: "🧹", from: "hsl(180 70% 28%)",  to: "hsl(196 76% 38%)",  glow: "hsl(180 70% 38% / 0.35)" },
  "Plumbing":        { emoji: "🔧", from: "hsl(210 72% 32%)",  to: "hsl(228 68% 40%)",  glow: "hsl(210 72% 42% / 0.35)" },
  "Electrical":      { emoji: "⚡", from: "hsl(36 96% 36%)",   to: "hsl(22 90% 44%)",   glow: "hsl(36 96% 52% / 0.40)" },
  "Painting":        { emoji: "🎨", from: "hsl(265 68% 38%)",  to: "hsl(280 65% 48%)",  glow: "hsl(265 68% 52% / 0.35)" },
  "Carpentry":       { emoji: "🪚", from: "hsl(25 70% 32%)",   to: "hsl(15 72% 42%)",   glow: "hsl(25 70% 42% / 0.35)" },
  "Appliance Repair":{ emoji: "🔩", from: "hsl(220 20% 28%)",  to: "hsl(230 18% 38%)",  glow: "hsl(220 20% 48% / 0.30)" },
  "Pest Control":    { emoji: "🐛", from: "hsl(140 55% 26%)",  to: "hsl(152 62% 34%)",  glow: "hsl(152 62% 38% / 0.35)" },
  "Salon at Home":   { emoji: "💇", from: "hsl(340 72% 38%)",  to: "hsl(356 68% 48%)",  glow: "hsl(340 72% 52% / 0.35)" },
};

const fallback = { emoji: "🔨", from: "hsl(248 60% 28%)", to: "hsl(265 68% 38%)", glow: "hsl(248 60% 42% / 0.35)" };

const ServiceCard = ({ service, index = 0 }: { service: Service; index?: number }) => {
  const navigate = useNavigate();
  const cfg = categoryConfig[service.category] ?? fallback;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/services/${service.id}`)}
      className="group cursor-pointer rounded-[1.25rem] overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border) / 0.55)",
        boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06), 0 1px 0 hsl(0 0% 100% / 0.9) inset",
        transition: "box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="h-32 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${cfg.from} 0%, ${cfg.to} 100%)` }}
      >
        <div
          className="absolute inset-0 shimmer"
          style={{ background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.06) 50%, transparent 100%)" }}
        />
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20"
          style={{ background: "hsl(0 0% 100%)", filter: "blur(16px)" }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10"
          style={{ background: "hsl(0 0% 100%)", filter: "blur(12px)" }}
        />

        <motion.span
          className="text-4xl relative z-10 select-none"
          whileHover={{ scale: 1.22, rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 0.45 }}
        >
          {cfg.emoji}
        </motion.span>

        {service.popular && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.07, type: "spring", stiffness: 300 }}
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
            style={{
              background: "hsl(36 96% 52%)",
              color: "hsl(228 60% 10%)",
              boxShadow: `0 2px 12px ${cfg.glow}`,
            }}
          >
            🔥 Hot
          </motion.div>
        )}
      </div>

      <div className="p-3.5">
        <h3 className="font-display font-semibold text-sm text-card-foreground truncate leading-snug">
          {service.name}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{service.category}</p>

        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            <span className="text-xs font-bold text-card-foreground">{service.rating}</span>
            <span className="text-[10px] text-muted-foreground">({service.reviewCount})</span>
          </div>
          <div className="flex items-center gap-0.5 text-muted-foreground ml-auto">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{service.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
          <div>
            <span className="font-display font-bold text-base text-card-foreground">${service.price}</span>
            <span className="text-[10px] text-muted-foreground ml-1">/ visit</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.12, rotate: -5 }}
            whileTap={{ scale: 0.92 }}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})`,
              boxShadow: `0 4px 12px ${cfg.glow}`,
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
