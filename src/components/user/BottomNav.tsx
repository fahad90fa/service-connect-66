import { Home, Search, Calendar, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: Home,     label: "Home",     path: "/" },
  { icon: Search,   label: "Services", path: "/services" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: User,     label: "Profile",  path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/admin") || location.pathname === "/login") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-5 md:hidden pointer-events-none">
      <motion.nav
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 320, damping: 28 }}
        className="pointer-events-auto"
      >
        <div
          className="flex items-center gap-1 px-3 py-2.5 rounded-[2rem]"
          style={{
            background: "hsl(248 62% 32% / 0.96)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid hsl(0 0% 100% / 0.12)",
            boxShadow: "0 8px 40px -8px hsl(248 62% 20% / 0.60), 0 2px 0 hsl(0 0% 100% / 0.08) inset",
          }}
        >
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-[1.5rem] transition-all duration-300"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-[1.5rem]"
                      style={{ background: "hsl(36 96% 52% / 0.18)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={isActive ? { y: -1 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "hsl(36 96% 52% / 0.35)",
                        filter: "blur(6px)",
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Icon
                    className="w-5 h-5 relative z-10 transition-colors duration-300"
                    style={{ color: isActive ? "hsl(36 96% 60%)" : "hsl(0 0% 100% / 0.50)" }}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </motion.div>

                <span
                  className="text-[9px] font-semibold tracking-wide transition-all duration-300 relative z-10"
                  style={{
                    color: isActive ? "hsl(36 96% 68%)" : "hsl(0 0% 100% / 0.40)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};

export default BottomNav;
