import { Booking } from "@/data/mock-data";
import { Calendar, Clock, MapPin } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  confirmed: "bg-info/15 text-info border-info/30",
  "in-progress": "bg-secondary/15 text-secondary border-secondary/30",
  completed: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <div className="bg-card rounded-xl border border-border/60 p-4 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold text-sm text-card-foreground">{booking.serviceName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">by {booking.providerName}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${statusColors[booking.status]}`}>
          {booking.status}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {booking.date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {booking.time}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {booking.address}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="font-display font-bold text-card-foreground">${booking.price}</span>
        <span className="text-xs text-muted-foreground">#{booking.id}</span>
      </div>
    </div>
  );
};

export default BookingCard;
