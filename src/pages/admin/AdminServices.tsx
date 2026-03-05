import AdminLayout from "@/components/admin/AdminLayout";
import { services, categories } from "@/data/mock-data";
import { Search, Plus, Star, MoreVertical } from "lucide-react";
import { useState } from "react";

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
          <div>
            <h1 className="font-display font-bold text-2xl">Services</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage service catalog and pricing</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition">
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-5">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto">
            {["All", ...categories.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  catFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((service) => (
            <div key={service.id} className="bg-card rounded-xl border border-border/60 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.category}</p>
                </div>
                <button className="p-1 rounded hover:bg-muted transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-semibold">{service.rating}</span>
                </div>
                <span className="font-display font-bold text-sm">${service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
