import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Wrench, Calendar, LogOut, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Wrench, label: "Services", path: "/admin/services" },
  { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-sm">🔨</span>
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-sidebar-foreground">ServiceHub</h2>
              <p className="text-[10px] text-sidebar-foreground/40">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold shadow-sm"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {isActive && (
                  <motion.div
                    layoutId="admin-nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to App
          </motion.button>
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </motion.button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
            <span className="text-xs">🔨</span>
          </div>
          <h2 className="font-display font-bold text-sidebar-foreground text-sm">Admin</h2>
        </div>
        <div className="flex gap-1">
          {navItems.map(({ icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(path)}
                className={`p-2 rounded-lg transition-all ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/50"}`}
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto md:p-6 p-4 pt-16 md:pt-6 bg-background gradient-mesh min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
