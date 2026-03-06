import { Search, ChevronRight, Star, TrendingUp, Zap, Shield, Award } from "lucide-react";
import { categories, services } from "@/data/mock-data";
import ServiceCard from "@/components/user/ServiceCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const catColors: Record<string, { from: string; to: string }> = {
  "Cleaning":         { from: "hsl(180 70% 28%)",  to: "hsl(196 76% 38%)" },
  "Plumbing":         { from: "hsl(210 72% 32%)",  to: "hsl(228 68% 40%)" },
  "Electrical":       { from: "hsl(36 96% 36%)",   to: "hsl(22 90% 44%)" },
  "Painting":         { from: "hsl(265 68% 38%)",  to: "hsl(280 65% 48%)" },
  "Carpentry":        { from: "hsl(25 70% 32%)",   to: "hsl(15 72% 42%)" },
  "Appliance Repair": { from: "hsl(220 20% 28%)",  to: "hsl(230 18% 38%)" },
  "Pest Control":     { from: "hsl(140 55% 26%)",  to: "hsl(152 62% 34%)" },
  "Salon at Home":    { from: "hsl(340 72% 38%)",  to: "hsl(356 68% 48%)" },
};

const Index = () => {
  const navigate = useNavigate();
  const popularServices = services.filter((s) => s.popular);
  const topRated = services.filter((s) => s.rating >= 4.8).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* ── Hero ── */}
      <div className="gradient-hero px-5 pt-14 pb-12 rounded-b-[2.5rem] relative overflow-hidden">
        {/* Animated orbs */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full animate-orb pointer-events-none"
          style={{ background: "hsl(265 70% 55% / 0.18)", filter: "blur(48px)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full animate-orb-b pointer-events-none"
          style={{ background: "hsl(36 96% 52% / 0.14)", filter: "blur(36px)" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "hsl(210 85% 52% / 0.10)", filter: "blur(28px)" }}
        />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
            style={{
              background: "hsl(0 0% 100% / 0.10)",
              border: "1px solid hsl(0 0% 100% / 0.14)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-xs">👋</span>
            <span className="text-[11px] font-medium" style={{ color: "hsl(0 0% 100% / 0.70)" }}>
              Good morning, Alex
            </span>
          </motion.div>

          <h1 className="font-display text-[1.9rem] font-bold leading-[1.15]" style={{ color: "hsl(0 0% 100%)" }}>
            What service do<br />
            <span className="text-gradient-gold">you need today?</span>
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => navigate("/services")}
          className="mt-6 flex items-center gap-3 cursor-pointer group relative z-10 rounded-2xl px-4 py-3.5 transition-all duration-300"
          style={{
            background: "hsl(0 0% 100% / 0.10)",
            border: "1px solid hsl(0 0% 100% / 0.14)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "hsl(36 96% 52% / 0.22)" }}
          >
            <Search className="w-4 h-4" style={{ color: "hsl(36 96% 72%)" }} />
          </div>
          <span className="text-sm flex-1" style={{ color: "hsl(0 0% 100% / 0.42)" }}>
            Search for a service...
          </span>
          <div
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
            style={{ background: "hsl(0 0% 100% / 0.10)", color: "hsl(0 0% 100% / 0.50)" }}
          >
            Search
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex items-center gap-4 mt-5 relative z-10"
        >
          {[
            { val: "200+", label: "Services" },
            { val: "50+",  label: "Providers" },
            { val: "4.8★", label: "Avg Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.42 + i * 0.06, type: "spring", stiffness: 250 }}
              className="flex flex-col"
            >
              <span className="font-display font-bold text-sm" style={{ color: "hsl(0 0% 100%)" }}>
                {stat.val}
              </span>
              <span className="text-[10px]" style={{ color: "hsl(0 0% 100% / 0.45)" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Categories ── */}
      <motion.section variants={container} initial="hidden" animate="show" className="px-5 mt-7">
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-base">Browse Categories</h2>
          <button
            onClick={() => navigate("/services")}
            className="text-xs font-semibold flex items-center gap-0.5 transition-all hover:gap-1.5"
            style={{ color: "hsl(248 62% 42%)" }}
          >
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>
        <div className="grid grid-cols-4 gap-2.5">
          {categories.slice(0, 8).map((cat) => {
            const cc = catColors[cat.name] ?? { from: "hsl(248 62% 32%)", to: "hsl(265 68% 42%)" };
            return (
              <motion.button
                key={cat.id}
                variants={scaleIn}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate(`/services?category=${cat.name}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl relative overflow-hidden group"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.55)",
                  boxShadow: "0 2px 12px -4px hsl(248 50% 20% / 0.06)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                  style={{ background: `linear-gradient(145deg, ${cc.from}, ${cc.to})` }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `0 4px 16px ${cc.from}` }}
                  />
                  <motion.span
                    className="text-lg relative z-10"
                    whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.4 } }}
                  >
                    {cat.icon}
                  </motion.span>
                </div>
                <span className="text-[10px] font-semibold text-card-foreground leading-tight text-center">
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* ── Popular Services ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 mt-8"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(248 62% 32% / 0.12)" }}
            >
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "hsl(248 62% 42%)" }} />
            </div>
            <h2 className="font-display font-bold text-base">Popular Services</h2>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="text-xs font-semibold flex items-center gap-0.5 transition-all hover:gap-1.5"
            style={{ color: "hsl(248 62% 42%)" }}
          >
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {popularServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ── Promo Banner ── */}
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 mt-8"
      >
        <div
          className="rounded-2xl p-5 relative overflow-hidden cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, hsl(248 72% 9%) 0%, hsl(265 60% 18%) 50%, hsl(280 58% 22%) 100%)",
          }}
          onClick={() => navigate("/services")}
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full animate-orb"
            style={{ background: "hsl(36 96% 52% / 0.20)", filter: "blur(28px)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-1"
            style={{ background: "linear-gradient(90deg, hsl(36 96% 52% / 0.6), hsl(265 70% 55% / 0.4), transparent)" }}
          />
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
              style={{ background: "hsl(36 96% 52% / 0.18)", color: "hsl(36 96% 72%)", border: "1px solid hsl(36 96% 52% / 0.25)" }}
            >
              ✨ Limited Offer
            </div>
            <h3 className="font-display font-bold text-xl leading-tight" style={{ color: "hsl(0 0% 100%)" }}>
              20% off your<br />first booking!
            </h3>
            <p className="text-xs mt-1.5" style={{ color: "hsl(0 0% 100% / 0.55)" }}>
              Use code{" "}
              <span
                className="font-bold px-1.5 py-0.5 rounded"
                style={{ background: "hsl(0 0% 100% / 0.12)", color: "hsl(0 0% 100% / 0.85)" }}
              >
                FIRST20
              </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold"
              style={{
                background: "hsl(36 96% 52%)",
                color: "hsl(228 60% 10%)",
                boxShadow: "0 4px 20px hsl(36 96% 52% / 0.45)",
              }}
            >
              Book Now →
            </motion.button>
          </div>
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-5 bottom-4 text-6xl opacity-25 select-none"
          >
            🎉
          </motion.div>
        </div>
      </motion.section>

      {/* ── How it works ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-5 mt-8"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "hsl(36 96% 52% / 0.12)" }}>
            <Zap className="w-3.5 h-3.5 text-secondary" />
          </div>
          <h2 className="font-display font-bold text-base">How it Works</h2>
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Search,  label: "Browse",  desc: "Find your service", step: "01" },
            { icon: Shield,  label: "Book",    desc: "Pick a time slot",  step: "02" },
            { icon: Award,   label: "Done",    desc: "Sit back & relax",  step: "03" },
          ].map(({ icon: Icon, label, desc, step }, i) => (
            <motion.div
              key={label}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-2 p-3.5 rounded-2xl text-center relative overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.55)",
                boxShadow: "0 2px 12px -4px hsl(248 50% 20% / 0.06)",
              }}
            >
              <span
                className="font-display font-black text-[10px] tracking-widest absolute top-2 right-2.5"
                style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}
              >
                {step}
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(248 62% 32% / 0.10)" }}
              >
                <Icon className="w-4.5 h-4.5" style={{ color: "hsl(248 62% 42%)" }} />
              </div>
              <div>
                <p className="font-display font-bold text-xs text-card-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Top Rated ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="px-5 mt-8 mb-4"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "hsl(36 96% 52% / 0.14)" }}>
            <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
          </div>
          <h2 className="font-display font-bold text-base">Top Rated</h2>
        </motion.div>
        <div className="space-y-2.5">
          {topRated.map((s, i) => {
            const cfg = { from: "hsl(248 62% 30%)", to: "hsl(265 68% 42%)" };
            return (
              <motion.div
                key={s.id}
                variants={fadeUp}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate(`/services/${s.id}`)}
                className="flex items-center gap-3.5 rounded-2xl p-3.5 cursor-pointer group"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.55)",
                  boxShadow: "0 2px 12px -4px hsl(248 50% 20% / 0.06)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `linear-gradient(145deg, ${cfg.from}, ${cfg.to})` }}
                >
                  {s.category === "Cleaning" ? "🧹" : s.category === "Electrical" ? "⚡" : s.category === "Appliance Repair" ? "🔩" : s.category === "Painting" ? "🎨" : "🔧"}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-sm text-card-foreground truncate">{s.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    <span className="text-xs font-bold">{s.rating}</span>
                    <span className="text-[10px] text-muted-foreground">({s.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-sm text-card-foreground">${s.price}</span>
                  <p className="text-[10px] text-muted-foreground">/ visit</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
