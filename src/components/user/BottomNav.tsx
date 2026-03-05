import { Home, Search, Calendar, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Services", path: "/services" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-secondary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
