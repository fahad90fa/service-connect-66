import { User, Mail, Phone, MapPin, ChevronRight, LogOut, Bell, Shield, HelpCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: MapPin, label: "Saved Addresses" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="gradient-hero px-5 pt-14 pb-10 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-2xl bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center"
          >
            <User className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="font-display font-bold text-lg text-primary-foreground">Alex Rivera</h1>
            <p className="text-xs text-primary-foreground/60">alex@example.com</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3 mt-6 relative z-10"
        >
          {[
            { label: "Bookings", value: "12" },
            { label: "Reviews", value: "8" },
            { label: "Saved", value: "5" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="bg-primary-foreground/8 backdrop-blur-md rounded-2xl p-3.5 text-center border border-primary-foreground/8"
            >
              <p className="font-display font-bold text-xl text-primary-foreground">{stat.value}</p>
              <p className="text-[10px] text-primary-foreground/50 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mt-5"
      >
        <h2 className="font-display font-semibold text-sm mb-3">Personal Information</h2>
        <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 overflow-hidden">
          {[
            { icon: User, label: "Full Name", value: "Alex Rivera" },
            { icon: Mail, label: "Email", value: "alex@example.com" },
            { icon: Phone, label: "Phone", value: "+1 555-0101" },
            { icon: MapPin, label: "Address", value: "123 Main St, Apt 4B" },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-sm text-card-foreground font-medium">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 mt-5"
      >
        <h2 className="font-display font-semibold text-sm mb-3">Settings</h2>
        <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/40 overflow-hidden">
          {menuItems.map(({ icon: Icon, label, badge }, i) => (
            <motion.button
              key={label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-4 py-3.5 w-full hover:bg-muted/30 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-sm text-card-foreground text-left font-medium">{label}</span>
              {badge && (
                <span className="bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Admin Link & Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5 mt-5 space-y-3"
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/admin")}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3.5 font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-primary/15"
        >
          <Shield className="w-4 h-4" />
          Go to Admin Panel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive rounded-xl py-3.5 font-semibold text-sm hover:bg-destructive/15 transition"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
