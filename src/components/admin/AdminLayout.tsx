import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Wrench, Calendar, LogOut, ChevronLeft } from "lucide-react";

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
          <h2 className="font-display font-bold text-lg text-sidebar-foreground">ServiceHub</h2>
          <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to App
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all mt-1">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-display font-bold text-sidebar-foreground text-sm">Admin</h2>
        <div className="flex gap-1">
          {navItems.map(({ icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`p-2 rounded-lg transition-all ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/60"}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto md:p-6 p-4 pt-16 md:pt-6 bg-background">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
