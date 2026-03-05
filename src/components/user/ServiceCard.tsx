import { Star, Clock, ArrowRight } from "lucide-react";
import { Service } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({ service, index = 0 }: { service: Service; index?: number }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/services/${service.id}`)}
      className="group bg-card rounded-xl border border-border/60 overflow-hidden cursor-pointer hover:shadow-lg hover:border-secondary/30 transition-all duration-300"
    >
      <div className="gradient-primary h-28 flex items-center justify-center relative overflow-hidden">
        <span className="text-4xl">{
          service.category === "Cleaning" ? "🧹" :
          service.category === "Plumbing" ? "🔧" :
          service.category === "Electrical" ? "⚡" :
          service.category === "Painting" ? "🎨" :
          service.category === "Carpentry" ? "🪚" :
          service.category === "Appliance Repair" ? "🔩" :
          service.category === "Pest Control" ? "🐛" :
          service.category === "Salon at Home" ? "💇" : "🔨"
        }</span>
        {service.popular && (
          <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            POPULAR
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-display font-semibold text-sm text-card-foreground truncate">{service.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{service.category}</p>
        <div className="flex items-center gap-2 mt-2">
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
          <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-primary-foreground group-hover:text-secondary-foreground" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
