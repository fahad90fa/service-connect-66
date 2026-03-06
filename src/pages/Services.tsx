import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { services, categories } from "@/data/mock-data";
import ServiceCard from "@/components/user/ServiceCard";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border/40 px-5 pt-5 pb-3"
      >
        <h1 className="font-display font-bold text-xl">Services</h1>

        {/* Search */}
        <div className="flex items-center gap-2 mt-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
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
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  onClick={() => setQuery("")}
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/15"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-foreground" />
          </motion.button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {["All", ...categories.map((c) => c.name)].map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.93 }}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <div className="px-5 mt-4">
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground mb-3"
        >
          {filtered.length} services found
        </motion.p>
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-sm text-muted-foreground font-medium">No services found</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Services;
