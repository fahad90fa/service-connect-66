import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { services, categories } from "@/data/mock-data";
import ServiceCard from "@/components/user/ServiceCard";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const catColors: Record<string, string> = {
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

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const activeCategory = searchParams.get("category") || "All";

  const filtered = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, query]);

  const setCategory = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const allCats = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* ── Sticky Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 px-5 pt-5 pb-3"
        style={{
          background: "hsl(var(--background) / 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid hsl(var(--border) / 0.40)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-display font-bold text-xl">Services</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">{filtered.length} available near you</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{
              background: "hsl(36 96% 52% / 0.12)",
              border: "1px solid hsl(36 96% 52% / 0.22)",
              color: "hsl(36 96% 48%)",
            }}
          >
            <Sparkles className="w-3 h-3" />
            New
          </motion.div>
        </div>

        {/* Search Row */}
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all duration-300"
            style={{
              background: "hsl(var(--muted))",
              border: "1.5px solid transparent",
            }}
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuery("")}
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(248 62% 32%), hsl(265 68% 42%))",
              boxShadow: "0 4px 16px hsl(248 62% 32% / 0.30)",
            }}
          >
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </motion.button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {allCats.map((cat) => {
            const isActive = activeCategory === cat;
            const color = catColors[cat] ?? "hsl(248 62% 32%)";
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.90 }}
                onClick={() => setCategory(cat)}
                className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 relative overflow-hidden"
                style={isActive
                  ? {
                    background: color,
                    color: "hsl(0 0% 100%)",
                    boxShadow: `0 4px 14px ${color.replace(")", " / 0.35)")}`,
                  }
                  : {
                    background: "hsl(var(--muted))",
                    color: "hsl(var(--muted-foreground))",
                  }
                }
              >
                {isActive && (
                  <motion.div
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: color }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Results ── */}
      <div className="px-5 mt-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3"
            >
              {filtered.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-4"
              >
                🔍
              </motion.p>
              <p className="font-display font-semibold text-sm text-foreground">No services found</p>
              <p className="text-xs text-muted-foreground mt-1.5">Try a different search or category</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setQuery(""); setCategory("All"); }}
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
    </div>
  );
};

export default Services;
