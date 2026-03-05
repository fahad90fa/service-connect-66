import { Search, ChevronRight, Star } from "lucide-react";
import { categories, services } from "@/data/mock-data";
import ServiceCard from "@/components/user/ServiceCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const popularServices = services.filter((s) => s.popular);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-primary-foreground/70 text-sm font-body">Good morning 👋</p>
          <h1 className="font-display text-2xl font-bold text-primary-foreground mt-1">What service do you need?</h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
          onClick={() => navigate("/services")}
          className="mt-5 flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/10 cursor-pointer hover:bg-primary-foreground/15 transition-colors"
        >
          <Search className="w-4 h-4 text-primary-foreground/60" />
          <span className="text-sm text-primary-foreground/50">Search for a service...</span>
        </motion.div>
      </div>

      {/* Categories */}
      <section className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base">Categories</h2>
          <button onClick={() => navigate("/services")} className="text-xs text-secondary font-semibold flex items-center gap-0.5">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {categories.slice(0, 8).map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              onClick={() => navigate(`/services?category=${cat.name}`)}
              className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border/60 hover:border-secondary/40 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-[10px] font-medium text-card-foreground leading-tight text-center">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base">Popular Services</h2>
          <button onClick={() => navigate("/services")} className="text-xs text-secondary font-semibold flex items-center gap-0.5">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popularServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Quick Promo Banner */}
      <section className="px-5 mt-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="gradient-accent rounded-2xl p-5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-secondary-foreground/70 text-xs font-semibold uppercase tracking-wider">Limited Offer</p>
            <h3 className="font-display font-bold text-lg text-secondary-foreground mt-1">20% off your first booking!</h3>
            <p className="text-secondary-foreground/70 text-xs mt-1">Use code <span className="font-bold text-secondary-foreground">FIRST20</span></p>
            <button
              onClick={() => navigate("/services")}
              className="mt-3 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Book Now
            </button>
          </div>
          <div className="absolute right-4 bottom-2 text-6xl opacity-20">🎉</div>
        </motion.div>
      </section>

      {/* Top Rated */}
      <section className="px-5 mt-7 mb-4">
        <h2 className="font-display font-bold text-base mb-3">Top Rated</h2>
        <div className="space-y-2.5">
          {services.filter(s => s.rating >= 4.8).slice(0, 3).map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/services/${s.id}`)}
              className="flex items-center gap-3 bg-card rounded-xl border border-border/60 p-3 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-xl shrink-0">
                {s.category === "Cleaning" ? "🧹" : s.category === "Electrical" ? "⚡" : s.category === "Appliance Repair" ? "🔩" : s.category === "Painting" ? "🎨" : "🔨"}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-card-foreground truncate">{s.name}</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-medium">{s.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({s.reviewCount} reviews)</span>
                </div>
              </div>
              <span className="font-display font-bold text-sm text-card-foreground">${s.price}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
