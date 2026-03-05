import { useParams, useNavigate } from "react-router-dom";
import { services } from "@/data/mock-data";
import { ArrowLeft, Star, Clock, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Service not found</p>
      </div>
    );
  }

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("Booking confirmed!", {
      description: `${service.name} on ${selectedDate} at ${selectedTime}`,
    });
    navigate("/bookings");
  };

  const categoryEmoji = service.category === "Cleaning" ? "🧹" : service.category === "Plumbing" ? "🔧" : service.category === "Electrical" ? "⚡" : service.category === "Painting" ? "🎨" : service.category === "Carpentry" ? "🪚" : service.category === "Appliance Repair" ? "🔩" : service.category === "Pest Control" ? "🐛" : "💇";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="gradient-hero h-48 relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-4 h-4 text-primary-foreground" />
        </button>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl"
        >
          {categoryEmoji}
        </motion.span>
        {service.popular && (
          <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-[10px] font-bold px-3 py-1 rounded-full">
            POPULAR
          </span>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 -mt-6 relative z-10"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display font-bold text-xl text-card-foreground">{service.name}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{service.category}</p>
            </div>
            <span className="font-display font-bold text-2xl text-card-foreground">${service.price}</span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-semibold">{service.rating}</span>
              <span className="text-xs text-muted-foreground">({service.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{service.duration}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{service.description}</p>

          {/* Highlights */}
          <div className="mt-4 space-y-2">
            {["Verified professionals", "30-day warranty", "Transparent pricing"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-xs text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-5">
          <h3 className="font-display font-semibold text-sm mb-2">Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/40"
          />
        </div>

        {/* Time Selection */}
        <div className="mt-4">
          <h3 className="font-display font-semibold text-sm mb-2">Select Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedTime === time
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 p-4 md:pb-4 pb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-display font-bold text-lg">${service.price}</span>
        </div>
        <Button
          onClick={handleBook}
          className="w-full gradient-accent text-secondary-foreground font-display font-bold h-12 rounded-xl text-sm hover:opacity-90 transition"
        >
          Book Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
