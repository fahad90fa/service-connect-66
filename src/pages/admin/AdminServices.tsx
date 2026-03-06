import AdminLayout from "@/components/admin/AdminLayout";
import { services, categories } from "@/data/mock-data";
import { Search, Plus, Star, MoreVertical } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const AdminServices = () => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "All" || s.category === catFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-2xl">Services</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage service catalog and pricing</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition shadow-lg shadow-primary/15"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mt-5"
        >
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-muted rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {["All", ...categories.map((c) => c.name)].map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCatFilter(cat)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  catFilter === cat ? "bg-primary text-primary-foreground shadow-md shadow-primary/15" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl border border-border/60 p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.category}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">{service.description}</p>
              <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-border/40">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-bold">{service.rating}</span>
                </div>
                <span className="font-display font-bold text-sm">${service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
