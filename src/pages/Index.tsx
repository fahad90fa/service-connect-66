import { Search, ChevronRight, Star, Sparkles, TrendingUp } from "lucide-react";
import { categories, services } from "@/data/mock-data";
import ServiceCard from "@/components/user/ServiceCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const Index = () => {
  const navigate = useNavigate();
  const popularServices = services.filter((s) => s.popular);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="gradient-hero px-5 pt-14 pb-10 rounded-b-[2rem] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-info/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-4 h-4 text-secondary" />
            </motion.div>
            <p className="text-primary-foreground/70 text-sm font-body">Good morning 👋</p>
          </div>
          <h1 className="font-display text-[1.65rem] font-bold text-primary-foreground mt-1 leading-tight">
            What service do<br />you need today?
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => navigate("/services")}
          className="mt-6 flex items-center gap-3 bg-primary-foreground/12 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/18 transition-all duration-300 relative z-10 group"
        >
          <Search className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground/80 transition-colors" />
          <span className="text-sm text-primary-foreground/45 group-hover:text-primary-foreground/60 transition-colors">Search for a service...</span>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="px-5 mt-7"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-base">Categories</h2>
          <button onClick={() => navigate("/services")} className="text-xs text-secondary font-semibold flex items-center gap-0.5 hover:gap-1.5 transition-all">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>
        <div className="grid grid-cols-4 gap-2.5">
          {categories.slice(0, 8).map((cat, i) => (
            <motion.button
              key={cat.id}
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/services?category=${cat.name}`)}
              className="flex flex-col items-center gap-2 p-3.5 bg-card rounded-2xl border border-border/60 hover:border-secondary/40 hover:shadow-md transition-all duration-300"
            >
              <motion.span
                className="text-2xl"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
              >
                {cat.icon}
              </motion.span>
              <span className="text-[10px] font-medium text-card-foreground leading-tight text-center">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Popular Services */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-5 mt-8"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <h2 className="font-display font-bold text-base">Popular Services</h2>
          </div>
          <button onClick={() => navigate("/services")} className="text-xs text-secondary font-semibold flex items-center gap-0.5 hover:gap-1.5 transition-all">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {popularServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Quick Promo Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-5 mt-8"
      >
        <div className="gradient-accent rounded-2xl p-5 relative overflow-hidden group cursor-pointer" onClick={() => navigate("/services")}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)' }} />
          </div>
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary-foreground/70 text-[10px] font-bold uppercase tracking-[0.15em]"
            >
              ✨ Limited Offer
            </motion.p>
            <h3 className="font-display font-bold text-xl text-secondary-foreground mt-1.5 leading-tight">20% off your<br/>first booking!</h3>
            <p className="text-secondary-foreground/60 text-xs mt-1.5">Use code <span className="font-bold text-secondary-foreground bg-secondary-foreground/10 px-1.5 py-0.5 rounded">FIRST20</span></p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 bg-primary text-primary-foreground text-xs font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-lg shadow-primary/20"
            >
              Book Now →
            </motion.button>
          </div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 bottom-2 text-6xl opacity-20"
          >
            🎉
          </motion.div>
        </div>
      </motion.section>

      {/* Top Rated */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="px-5 mt-8 mb-4"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <h2 className="font-display font-bold text-base">Top Rated</h2>
        </motion.div>
        <div className="space-y-2.5">
          {services.filter(s => s.rating >= 4.8).slice(0, 3).map((s, i) => (
            <motion.div
              key={s.id}
              variants={fadeUp}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/services/${s.id}`)}
              className="flex items-center gap-3.5 bg-card rounded-2xl border border-border/60 p-3.5 cursor-pointer hover:shadow-md hover:border-secondary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-xl shrink-0"
              >
                {s.category === "Cleaning" ? "🧹" : s.category === "Electrical" ? "⚡" : s.category === "Appliance Repair" ? "🔩" : s.category === "Painting" ? "🎨" : "🔨"}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-card-foreground truncate">{s.name}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-semibold">{s.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({s.reviewCount} reviews)</span>
                </div>
              </div>
              <span className="font-display font-bold text-sm text-card-foreground">${s.price}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
