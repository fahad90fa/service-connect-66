import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Wrench, Calendar, LogOut, ChevronLeft, Zap } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users,           label: "Users",     path: "/admin/users" },
  { icon: Wrench,          label: "Services",  path: "/admin/services" },
  { icon: Calendar,        label: "Bookings",  path: "/admin/bookings" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside
        className="w-60 hidden md:flex flex-col shrink-0 relative"
        style={{
          background: "hsl(var(--sidebar-background))",
          borderRight: "1px solid hsl(var(--sidebar-border))",
        }}
      >
        {/* Sidebar orb */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "hsl(36 96% 52% / 0.07)", filter: "blur(40px)" }}
        />

        {/* Logo */}
        <div
          className="p-5 relative z-10"
          style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -4 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(36 96% 52%), hsl(28 90% 56%))",
                boxShadow: "0 4px 16px hsl(36 96% 52% / 0.40)",
              }}
            >
              <span className="text-base relative z-10">🔨</span>
              <div className="absolute inset-0 shimmer" />
            </motion.div>
            <div>
              <h2 className="font-display font-bold text-sm" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                Service<span className="text-gradient-gold">Hub</span>
              </h2>
              <p className="text-[9px] font-medium uppercase tracking-widest" style={{ color: "hsl(var(--sidebar-foreground) / 0.35)" }}>
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 relative z-10">
          <p
            className="text-[9px] font-semibold uppercase tracking-widest px-3 py-2 mt-1"
            style={{ color: "hsl(var(--sidebar-foreground) / 0.30)" }}
          >
            Navigation
          </p>
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                whileHover={{ x: isActive ? 0 : 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative overflow-hidden"
                style={isActive
                  ? {
                    background: "hsl(var(--sidebar-accent))",
                    color: "hsl(var(--sidebar-primary))",
                    fontWeight: 600,
                    boxShadow: "0 2px 12px hsl(248 70% 5% / 0.20)",
                  }
                  : {
                    color: "hsl(var(--sidebar-foreground) / 0.55)",
                  }
                }
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-active-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "hsl(var(--sidebar-accent))" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10 flex-1 text-left">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="admin-dot"
                    className="w-1.5 h-1.5 rounded-full relative z-10"
                    style={{ background: "hsl(var(--sidebar-primary))" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-1 relative z-10" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
            style={{ color: "hsl(var(--sidebar-foreground) / 0.50)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to App
          </motion.button>
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
            style={{ color: "hsl(0 72% 52%)" }}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </motion.button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{
          background: "hsl(var(--sidebar-background) / 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid hsl(var(--sidebar-border))",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(36 96% 52%), hsl(28 90% 56%))" }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="font-display font-bold text-sm" style={{ color: "hsl(var(--sidebar-foreground))" }}>
            Admin
          </h2>
        </div>
        <div className="flex gap-1">
          {navItems.map(({ icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                whileTap={{ scale: 0.88 }}
                onClick={() => navigate(path)}
                className="p-2 rounded-xl transition-all"
                style={isActive
                  ? {
                    background: "hsl(var(--sidebar-accent))",
                    color: "hsl(var(--sidebar-primary))",
                  }
                  : {
                    color: "hsl(var(--sidebar-foreground) / 0.45)",
                  }
                }
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main
        className="flex-1 overflow-auto md:p-6 p-4 pt-16 md:pt-6 min-h-screen gradient-mesh"
        style={{ background: "hsl(var(--background))" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
