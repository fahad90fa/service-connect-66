import { User, Mail, Phone, MapPin, ChevronRight, LogOut, Bell, Shield, HelpCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      <div className="gradient-hero px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-primary-foreground">Alex Rivera</h1>
            <p className="text-xs text-primary-foreground/60">alex@example.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Bookings", value: "12" },
            { label: "Reviews", value: "8" },
            { label: "Saved", value: "5" },
          ].map((stat) => (
            <div key={stat.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 text-center border border-primary-foreground/10">
              <p className="font-display font-bold text-lg text-primary-foreground">{stat.value}</p>
              <p className="text-[10px] text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Info */}
      <div className="px-5 mt-5">
        <h2 className="font-display font-semibold text-sm mb-3">Personal Information</h2>
        <div className="bg-card rounded-xl border border-border/60 divide-y divide-border/50">
          {[
            { icon: User, label: "Full Name", value: "Alex Rivera" },
            { icon: Mail, label: "Email", value: "alex@example.com" },
            { icon: Phone, label: "Phone", value: "+1 555-0101" },
            { icon: MapPin, label: "Address", value: "123 Main St, Apt 4B" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-sm text-card-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 mt-5">
        <h2 className="font-display font-semibold text-sm mb-3">Settings</h2>
        <div className="bg-card rounded-xl border border-border/60 divide-y divide-border/50">
          {menuItems.map(({ icon: Icon, label, badge }) => (
            <button key={label} className="flex items-center gap-3 px-4 py-3.5 w-full hover:bg-muted/50 transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-card-foreground text-left">{label}</span>
              {badge && (
                <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Admin Link & Logout */}
      <div className="px-5 mt-5 space-y-3">
        <button
          onClick={() => navigate("/admin")}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm hover:opacity-90 transition"
        >
          <Shield className="w-4 h-4" />
          Go to Admin Panel
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive rounded-xl py-3 font-semibold text-sm hover:bg-destructive/20 transition">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
