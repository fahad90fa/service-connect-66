import { Star, Clock, ArrowRight } from "lucide-react";
import { Service } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({ service, index = 0 }: { service: Service; index?: number }) => {
  const navigate = useNavigate();

  const categoryEmoji = service.category === "Cleaning" ? "🧹" :
    service.category === "Plumbing" ? "🔧" :
    service.category === "Electrical" ? "⚡" :
    service.category === "Painting" ? "🎨" :
    service.category === "Carpentry" ? "🪚" :
    service.category === "Appliance Repair" ? "🔩" :
    service.category === "Pest Control" ? "🐛" :
    service.category === "Salon at Home" ? "💇" : "🔨";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/services/${service.id}`)}
      className="group bg-card rounded-2xl border border-border/60 overflow-hidden cursor-pointer hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
    >
      <div className="gradient-primary h-28 flex items-center justify-center relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--secondary)) 0%, transparent 50%)' }} />
        <motion.span
          className="text-4xl relative z-10"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          {categoryEmoji}
        </motion.span>
        {service.popular && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-2.5 right-2.5 bg-secondary text-secondary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-secondary/20"
          >
            POPULAR
          </motion.span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-display font-semibold text-sm text-card-foreground truncate">{service.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{service.category}</p>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            <span className="text-xs font-semibold text-card-foreground">{service.rating}</span>
            <span className="text-[10px] text-muted-foreground">({service.reviewCount})</span>
          </div>
          <div className="flex items-center gap-0.5 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{service.duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-base text-card-foreground">${service.price}</span>
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="w-7 h-7 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors duration-300"
          >
            <ArrowRight className="w-3.5 h-3.5 text-primary-foreground group-hover:text-secondary-foreground transition-colors" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
