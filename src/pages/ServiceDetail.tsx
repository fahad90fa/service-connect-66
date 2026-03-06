import { useParams, useNavigate } from "react-router-dom";
import { services } from "@/data/mock-data";
import { ArrowLeft, Star, Clock, Shield, CheckCircle2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-5xl mb-3">😕</p>
          <p className="text-muted-foreground font-medium">Service not found</p>
          <button onClick={() => navigate("/services")} className="text-secondary text-sm font-semibold mt-2">
            Browse services
          </button>
        </motion.div>
      </div>
    );
  }

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("🎉 Booking confirmed!", {
      description: `${service.name} on ${selectedDate} at ${selectedTime}`,
    });
    navigate("/bookings");
  };

  const categoryEmoji = service.category === "Cleaning" ? "🧹" : service.category === "Plumbing" ? "🔧" : service.category === "Electrical" ? "⚡" : service.category === "Painting" ? "🎨" : service.category === "Carpentry" ? "🪚" : service.category === "Appliance Repair" ? "🔩" : service.category === "Pest Control" ? "🐛" : "💇";

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header Image */}
      <div className="gradient-hero h-52 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-20 bg-background rounded-t-[2rem]" />
        </div>
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl glass flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-4 h-4 text-primary-foreground" />
        </motion.button>
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-7xl relative z-10"
        >
          {categoryEmoji}
        </motion.span>
        {service.popular && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10"
          >
            🔥 POPULAR
          </motion.span>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="px-5 -mt-5 relative z-10"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display font-bold text-xl text-card-foreground leading-tight">{service.name}</h1>
              <p className="text-xs text-muted-foreground mt-1">{service.category}</p>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold text-2xl text-card-foreground"
            >
              ${service.price}
            </motion.span>
          </div>

          <div className="flex items-center gap-4 mt-3.5">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-bold">{service.rating}</span>
              <span className="text-xs text-muted-foreground">({service.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{service.duration}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{service.description}</p>

          {/* Highlights */}
          <div className="mt-5 grid grid-cols-1 gap-2.5">
            {[
              { icon: Shield, text: "Verified professionals" },
              { icon: Zap, text: "30-day warranty" },
              { icon: Users, text: "Transparent pricing" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2.5 bg-success/5 rounded-xl px-3 py-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-success" />
                </div>
                <span className="text-xs text-card-foreground font-medium">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-5"
        >
          <h3 className="font-display font-semibold text-sm mb-2.5">Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-card border border-border/60 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-secondary/30 transition-all"
          />
        </motion.div>

        {/* Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <h3 className="font-display font-semibold text-sm mb-2.5">Select Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <motion.button
                key={time}
                whileTap={{ scale: 0.93 }}
                onClick={() => setSelectedTime(time)}
                className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                  selectedTime === time
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Fixed Bottom CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass-strong p-4 md:pb-4 pb-6"
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-muted-foreground">Total Amount</span>
          <span className="font-display font-bold text-lg">${service.price}</span>
        </div>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleBook}
            className="w-full gradient-accent text-secondary-foreground font-display font-bold h-12 rounded-xl text-sm hover:opacity-90 transition shadow-lg shadow-secondary/20"
          >
            Book Service →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;
