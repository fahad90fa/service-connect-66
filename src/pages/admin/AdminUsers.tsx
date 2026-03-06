import AdminLayout from "@/components/admin/AdminLayout";
import { allUsers } from "@/data/mock-data";
import { Search, MoreVertical, User, Shield, Wrench, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roleConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: typeof User }> = {
  admin:    { label: "Admin",    bg: "hsl(0 75% 52% / 0.10)",  text: "hsl(0 70% 42%)",   border: "hsl(0 75% 52% / 0.22)",  icon: Shield },
  provider: { label: "Provider", bg: "hsl(210 85% 52% / 0.10)", text: "hsl(210 75% 38%)", border: "hsl(210 85% 52% / 0.22)", icon: Wrench },
  user:     { label: "User",     bg: "hsl(152 62% 38% / 0.10)", text: "hsl(152 55% 30%)", border: "hsl(152 62% 38% / 0.22)", icon: UserCheck },
};

const roleFilterColors: Record<string, string> = {
  all:      "hsl(248 62% 32%)",
  user:     "hsl(152 62% 34%)",
  provider: "hsl(210 85% 48%)",
  admin:    "hsl(0 72% 48%)",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = allUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const counts = {
    all: allUsers.length,
    user: allUsers.filter((u) => u.role === "user").length,
    provider: allUsers.filter((u) => u.role === "provider").length,
    admin: allUsers.filter((u) => u.role === "admin").length,
  };

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
            <h1 className="font-display font-bold text-2xl">Users</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage customers and service providers</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold"
            style={{
              background: "hsl(248 62% 32% / 0.09)",
              border: "1px solid hsl(248 62% 32% / 0.18)",
              color: "hsl(248 62% 42%)",
            }}
          >
            <Users className="w-3.5 h-3.5" />
            {allUsers.length} total
          </motion.div>
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
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "user", "provider", "admin"] as const).map((role) => {
              const isActive = roleFilter === role;
              const color = roleFilterColors[role];
              return (
                <motion.button
                  key={role}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setRoleFilter(role)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-300 flex items-center gap-1.5"
                  style={isActive
                    ? { background: color, color: "hsl(0 0% 100%)", boxShadow: `0 4px 14px ${color.replace(")", " / 0.30)")}` }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {role}
                  <span
                    className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? "hsl(0 0% 100% / 0.20)" : "hsl(var(--border))",
                      color: isActive ? "hsl(0 0% 100%)" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {counts[role]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.55)",
            boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "hsl(var(--muted) / 0.40)", borderBottom: "1px solid hsl(var(--border) / 0.40)" }}>
                  {["User", "Email", "Phone", "Role", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3.5 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody variants={container} initial="hidden" animate="show">
                <AnimatePresence mode="popLayout">
                  {filtered.map((user, i) => {
                    const rc = roleConfig[user.role];
                    const RoleIcon = rc.icon;
                    return (
                      <motion.tr
                        key={user.id}
                        variants={fadeUp}
                        exit={{ opacity: 0, x: -12 }}
                        className="transition-colors"
                        style={{ borderBottom: "1px solid hsl(var(--border) / 0.25)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted) / 0.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${rc.bg.replace("/ 0.10)", "/ 0.60)")}, ${rc.bg})`,
                                border: `1px solid ${rc.border}`,
                              }}
                            >
                              <User className="w-3.5 h-3.5" style={{ color: rc.text }} />
                            </div>
                            <span className="font-medium text-xs text-foreground">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-xs text-muted-foreground">{user.email}</td>
                        <td className="py-3.5 px-5 text-xs text-muted-foreground">{user.phone}</td>
                        <td className="py-3.5 px-5">
                          <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                            style={{
                              background: rc.bg,
                              color: rc.text,
                              border: `1px solid ${rc.border}`,
                            }}
                          >
                            <RoleIcon className="w-2.5 h-2.5" />
                            {rc.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ color: "hsl(var(--muted-foreground))" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </motion.tbody>
            </table>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-3xl mb-3">👤</p>
                <p className="text-sm font-semibold text-foreground">No users found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
