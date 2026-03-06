import AdminLayout from "@/components/admin/AdminLayout";
import { services, categories } from "@/data/mock-data";
import { Search, Plus, Star, MoreVertical, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categoryConfig: Record<string, { from: string; to: string; emoji: string }> = {
  "Cleaning":        { emoji: "🧹", from: "hsl(180 70% 28%)",  to: "hsl(196 76% 38%)" },
  "Plumbing":        { emoji: "🔧", from: "hsl(210 72% 32%)",  to: "hsl(228 68% 40%)" },
  "Electrical":      { emoji: "⚡", from: "hsl(36 96% 36%)",   to: "hsl(22 90% 44%)" },
  "Painting":        { emoji: "🎨", from: "hsl(265 68% 38%)",  to: "hsl(280 65% 48%)" },
  "Carpentry":       { emoji: "🪚", from: "hsl(25 70% 32%)",   to: "hsl(15 72% 42%)" },
  "Appliance Repair":{ emoji: "🔩", from: "hsl(220 20% 28%)",  to: "hsl(230 18% 38%)" },
  "Pest Control":    { emoji: "🐛", from: "hsl(140 55% 26%)",  to: "hsl(152 62% 34%)" },
  "Salon at Home":   { emoji: "💇", from: "hsl(340 72% 38%)",  to: "hsl(356 68% 48%)" },
};
const fallbackCfg = { emoji: "🔨", from: "hsl(248 60% 28%)", to: "hsl(265 68% 38%)" };

const catFilterColors: Record<string, string> = {
  "All":              "hsl(248 62% 32%)",
  "Cleaning":        "hsl(180 70% 33%)",
  "Plumbing":        "hsl(210 72% 38%)",
  "Electrical":      "hsl(36 96% 44%)",
  "Painting":        "hsl(265 68% 48%)",
  "Carpentry":       "hsl(25 70% 38%)",
  "Appliance Repair":"hsl(220 20% 38%)",
  "Pest Control":    "hsl(152 62% 34%)",
  "Salon at Home":   "hsl(340 72% 48%)",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const } },
};

const AdminServices = () => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "All" || s.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const allCats = ["All", ...categories.map((c) => c.name)];

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-5">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display font-bold text-2xl">Services</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage service catalog and pricing</p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(248 62% 32%), hsl(265 68% 42%))",
              color: "hsl(0 0% 100%)",
              boxShadow: "0 4px 20px hsl(248 62% 32% / 0.35)",
            }}
          >
            <Plus className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Add Service</span>
            <div className="absolute inset-0 shimmer" />
          </motion.button>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <div
            className="flex-1 min-w-[200px] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all duration-300"
            style={{ background: "hsl(var(--muted))", border: "1.5px solid transparent" }}
            onFocus={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(248 62% 42% / 0.35)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px hsl(248 62% 42% / 0.06)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {allCats.map((cat) => {
              const isActive = catFilter === cat;
              const color = catFilterColors[cat] ?? "hsl(248 62% 32%)";
              return (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.90 }}
                  onClick={() => setCatFilter(cat)}
                  className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
                  style={isActive
                    ? { background: color, color: "hsl(0 0% 100%)", boxShadow: `0 4px 14px ${color.replace(")", " / 0.30)")}` }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Results count ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-xs text-muted-foreground"
        >
          {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
        </motion.p>

        {/* ── Cards Grid ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((service) => {
                const cfg = categoryConfig[service.category] ?? fallbackCfg;
                return (
                  <motion.div
                    key={service.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.22 } }}
                    className="rounded-2xl overflow-hidden group cursor-pointer"
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border) / 0.55)",
                      boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06), 0 1px 0 hsl(0 0% 100% / 0.85) inset",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="h-20 flex items-center justify-between px-4 relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}
                    >
                      <div className="absolute inset-0 shimmer" />
                      <div
                        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20"
                        style={{ background: "hsl(0 0% 100%)", filter: "blur(12px)" }}
                      />
                      <span className="text-3xl relative z-10">{cfg.emoji}</span>
                      <div className="flex items-center gap-2 relative z-10">
                        {service.popular && (
                          <span
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "hsl(36 96% 52%)", color: "hsl(228 60% 10%)" }}
                          >
                            🔥 Hot
                          </span>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.88 }}
                          className="p-1.5 rounded-lg"
                          style={{ background: "hsl(0 0% 0% / 0.20)", color: "hsl(0 0% 100%)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-sm leading-snug">{service.name}</h3>
                      <p className="text-[10px] font-medium mt-0.5" style={{ color: cfg.to }}>{service.category}</p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{service.description}</p>

                      <div
                        className="flex items-center justify-between mt-3.5 pt-3.5"
                        style={{ borderTop: "1px solid hsl(var(--border) / 0.40)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span className="text-xs font-bold">{service.rating}</span>
                            <span className="text-[10px] text-muted-foreground">({service.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span className="text-[10px]">{service.duration}</span>
                          </div>
                        </div>
                        <span className="font-display font-bold text-sm">${service.price}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-4"
              >
                🔧
              </motion.p>
              <p className="font-display font-semibold text-sm">No services found</p>
              <p className="text-xs text-muted-foreground mt-1.5">Try a different search or category</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setSearch(""); setCatFilter("All"); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold"
                style={{
                  background: "hsl(248 62% 32% / 0.10)",
                  color: "hsl(248 62% 42%)",
                  border: "1px solid hsl(248 62% 32% / 0.20)",
                }}
              >
                Clear filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
