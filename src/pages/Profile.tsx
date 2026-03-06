import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Bell, CreditCard, Shield, HelpCircle,
  ChevronRight, LogOut, Edit2, Camera, Star, Calendar, Heart,
  Settings, ExternalLink,
} from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

const Profile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const menuGroups = [
    {
      label: "Account",
      items: [
        { icon: Bell,        label: "Notifications",     badge: "3",  badgeColor: "hsl(0 72% 48%)" },
        { icon: CreditCard,  label: "Payment Methods",   badge: null, badgeColor: "" },
        { icon: MapPin,      label: "Saved Addresses",   badge: null, badgeColor: "" },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: Shield,      label: "Privacy & Security", badge: null, badgeColor: "" },
        { icon: HelpCircle,  label: "Help & Support",     badge: null, badgeColor: "" },
        { icon: Settings,    label: "Preferences",        badge: null, badgeColor: "" },
      ],
    },
  ];

  const stats = [
    { label: "Bookings", value: "12", icon: Calendar, color: "hsl(248 62% 42%)" },
    { label: "Reviews", value: "8", icon: Star, color: "hsl(36 96% 48%)" },
    { label: "Saved", value: "5", icon: Heart, color: "hsl(340 72% 48%)" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* ── Profile Hero ── */}
      <div className="gradient-hero px-5 pt-14 pb-8 rounded-b-[2.5rem] relative overflow-hidden">
        {/* Orbs */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none animate-orb"
          style={{ background: "hsl(265 70% 55% / 0.16)", filter: "blur(40px)" }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full pointer-events-none animate-orb-b"
          style={{ background: "hsl(36 96% 52% / 0.12)", filter: "blur(32px)" }}
        />

        {/* Avatar Row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 relative z-10"
        >
          {/* Avatar */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="w-18 h-18 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg, hsl(265 68% 42%), hsl(248 62% 32%))",
                border: "3px solid hsl(0 0% 100% / 0.20)",
                boxShadow: "0 8px 24px hsl(248 62% 20% / 0.40)",
              }}
            >
              <User className="w-8 h-8 text-white" />
              <div className="absolute inset-0 shimmer" />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.90 }}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl flex items-center justify-center"
              style={{
                background: "hsl(36 96% 52%)",
                boxShadow: "0 3px 10px hsl(36 96% 52% / 0.45)",
                border: "2px solid hsl(0 0% 100%)",
              }}
            >
              <Camera className="w-3 h-3 text-white" />
            </motion.button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg text-white truncate">Alex Rivera</h1>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.90 }}
                onClick={() => setEditMode(!editMode)}
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "hsl(0 0% 100% / 0.12)" }}
              >
                <Edit2 className="w-3 h-3 text-white" />
              </motion.button>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 100% / 0.55)" }}>alex@example.com</p>
            <div
              className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{
                background: "hsl(36 96% 52% / 0.20)",
                border: "1px solid hsl(36 96% 52% / 0.30)",
                color: "hsl(36 96% 78%)",
              }}
            >
              ⭐ Premium Member
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3 mt-6 relative z-10"
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -2, transition: { duration: 0.18 } }}
              className="rounded-2xl p-3.5 text-center relative overflow-hidden"
              style={{
                background: "hsl(0 0% 100% / 0.09)",
                border: "1px solid hsl(0 0% 100% / 0.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5"
                style={{ background: `${color.replace(")", " / 0.20)")}` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </div>
              <p className="font-display font-bold text-xl text-white">{value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "hsl(0 0% 100% / 0.50)" }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Personal Info ── */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 mt-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-sm">Personal Information</h2>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setEditMode(false)}
                  className="text-[11px] font-bold px-3 py-1 rounded-lg"
                  style={{ background: "hsl(248 62% 32% / 0.10)", color: "hsl(248 62% 42%)" }}
                >
                  Done
                </motion.button>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.55)",
                  boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06)",
                }}
              >
                {[
                  { icon: User,  label: "Full Name", value: "Alex Rivera",          type: "text" },
                  { icon: Mail,  label: "Email",     value: "alex@example.com",      type: "email" },
                  { icon: Phone, label: "Phone",     value: "+1 555-0101",           type: "tel" },
                  { icon: MapPin,label: "Address",   value: "123 Main St, Apt 4B",   type: "text" },
                ].map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 px-4 py-3.5"
                    style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border) / 0.40)" : "none" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(var(--muted))" }}>
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-sm text-card-foreground font-medium truncate">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Menu Groups ── */}
      {menuGroups.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 + gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 mt-5"
        >
          <h2 className="font-display font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-2.5">{group.label}</h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.55)",
              boxShadow: "0 2px 16px -4px hsl(248 50% 20% / 0.06), 0 1px 0 hsl(0 0% 100% / 0.85) inset",
            }}
          >
            {group.items.map(({ icon: Icon, label, badge, badgeColor }, i) => (
              <motion.button
                key={label}
                whileHover={{ x: 3, backgroundColor: "hsl(var(--muted) / 0.50)" }}
                whileTap={{ scale: 0.985 }}
                className="flex items-center gap-3 px-4 py-3.5 w-full transition-all duration-200"
                style={{ borderBottom: i < group.items.length - 1 ? "1px solid hsl(var(--border) / 0.35)" : "none" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--muted))" }}>
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <span className="flex-1 text-sm text-card-foreground text-left font-medium">{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: badgeColor }}
                  >
                    {badge}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* ── CTA Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 mt-5 space-y-3"
      >
        <motion.button
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.975 }}
          onClick={() => navigate("/admin")}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-display font-bold text-sm relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(248 62% 32%), hsl(265 68% 42%))",
            color: "hsl(0 0% 100%)",
            boxShadow: "0 6px 24px hsl(248 62% 32% / 0.35)",
          }}
        >
          <Shield className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Admin Panel</span>
          <ExternalLink className="w-3.5 h-3.5 relative z-10 opacity-70" />
          <div className="absolute inset-0 shimmer" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.975 }}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-semibold text-sm transition-all duration-200"
          style={{
            background: "hsl(0 72% 48% / 0.08)",
            color: "hsl(0 68% 44%)",
            border: "1px solid hsl(0 72% 48% / 0.18)",
          }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </motion.div>

      {/* ── App Version ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-[10px] text-muted-foreground mt-6 mb-2"
      >
        ServiceHub v2.0.0 · Made with ❤️
      </motion.p>
    </div>
  );
};

export default Profile;
