import AdminLayout from "@/components/admin/AdminLayout";
import { allUsers } from "@/data/mock-data";
import { Search, MoreVertical, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = allUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage customers and service providers</p>
        </motion.div>

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
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            {["all", "user", "provider", "admin"].map((role) => (
              <motion.button
                key={role}
                whileTap={{ scale: 0.93 }}
                onClick={() => setRoleFilter(role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-300 ${
                  roleFilter === role ? "bg-primary text-primary-foreground shadow-md shadow-primary/15" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {role}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/60 mt-4 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Phone</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-muted-foreground">Role</th>
                  <th className="text-right px-4 py-3.5 text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="border-b border-border/20 hover:bg-muted/15 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-xs">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        user.role === "admin" ? "bg-destructive/10 text-destructive" :
                        user.role === "provider" ? "bg-info/10 text-info" :
                        "bg-success/10 text-success"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
