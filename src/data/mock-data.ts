export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  price: number;
  address: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  role: "user" | "provider" | "admin";
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  serviceCount: number;
}

export const categories: Category[] = [
  { id: "1", name: "Cleaning", icon: "🧹", serviceCount: 12 },
  { id: "2", name: "Plumbing", icon: "🔧", serviceCount: 8 },
  { id: "3", name: "Electrical", icon: "⚡", serviceCount: 10 },
  { id: "4", name: "Painting", icon: "🎨", serviceCount: 6 },
  { id: "5", name: "Carpentry", icon: "🪚", serviceCount: 7 },
  { id: "6", name: "Appliance Repair", icon: "🔩", serviceCount: 9 },
  { id: "7", name: "Pest Control", icon: "🐛", serviceCount: 4 },
  { id: "8", name: "Salon at Home", icon: "💇", serviceCount: 15 },
];

export const services: Service[] = [
  { id: "1", name: "Deep Home Cleaning", category: "Cleaning", description: "Professional deep cleaning for your entire home including kitchen, bathrooms, and living areas.", price: 79, rating: 4.8, reviewCount: 342, duration: "3-4 hrs", image: "", popular: true },
  { id: "2", name: "Bathroom Cleaning", category: "Cleaning", description: "Thorough bathroom sanitization and cleaning service.", price: 35, rating: 4.7, reviewCount: 218, duration: "1-2 hrs", image: "" },
  { id: "3", name: "Pipe Leak Repair", category: "Plumbing", description: "Fix leaking pipes and faucets with guaranteed workmanship.", price: 55, rating: 4.6, reviewCount: 156, duration: "1-2 hrs", image: "" },
  { id: "4", name: "Drain Unclogging", category: "Plumbing", description: "Professional drain cleaning and unclogging service.", price: 45, rating: 4.5, reviewCount: 89, duration: "1 hr", image: "" },
  { id: "5", name: "Wiring & Rewiring", category: "Electrical", description: "Complete electrical wiring installation and repair.", price: 90, rating: 4.9, reviewCount: 201, duration: "2-4 hrs", image: "", popular: true },
  { id: "6", name: "Fan Installation", category: "Electrical", description: "Ceiling and exhaust fan installation service.", price: 30, rating: 4.4, reviewCount: 134, duration: "1 hr", image: "" },
  { id: "7", name: "Interior Painting", category: "Painting", description: "Professional interior wall painting with premium paints.", price: 150, rating: 4.7, reviewCount: 97, duration: "1-2 days", image: "" },
  { id: "8", name: "Furniture Assembly", category: "Carpentry", description: "Assembly of flat-pack furniture and fixtures.", price: 40, rating: 4.3, reviewCount: 78, duration: "1-2 hrs", image: "" },
  { id: "9", name: "AC Service & Repair", category: "Appliance Repair", description: "Complete AC servicing, gas refill, and repair.", price: 60, rating: 4.8, reviewCount: 412, duration: "1-2 hrs", image: "", popular: true },
  { id: "10", name: "Haircut at Home", category: "Salon at Home", description: "Professional haircut service at your doorstep.", price: 25, rating: 4.6, reviewCount: 567, duration: "30-45 min", image: "" },
  { id: "11", name: "Pest Treatment", category: "Pest Control", description: "Complete pest control treatment for your home.", price: 70, rating: 4.5, reviewCount: 123, duration: "2-3 hrs", image: "" },
  { id: "12", name: "Full Home Painting", category: "Painting", description: "Complete home painting service including primer and finish coats.", price: 450, rating: 4.9, reviewCount: 64, duration: "3-5 days", image: "", popular: true },
];

export const bookings: Booking[] = [
  { id: "B001", serviceId: "1", serviceName: "Deep Home Cleaning", providerName: "Sarah Johnson", date: "2026-03-06", time: "10:00 AM", status: "confirmed", price: 79, address: "123 Main St, Apt 4B" },
  { id: "B002", serviceId: "9", serviceName: "AC Service & Repair", providerName: "Mike Chen", date: "2026-03-04", time: "2:00 PM", status: "completed", price: 60, address: "123 Main St, Apt 4B" },
  { id: "B003", serviceId: "5", serviceName: "Wiring & Rewiring", providerName: "David Kim", date: "2026-03-03", time: "9:00 AM", status: "completed", price: 90, address: "456 Oak Ave" },
  { id: "B004", serviceId: "10", serviceName: "Haircut at Home", providerName: "Lisa Park", date: "2026-03-07", time: "4:00 PM", status: "pending", price: 25, address: "123 Main St, Apt 4B" },
  { id: "B005", serviceId: "3", serviceName: "Pipe Leak Repair", providerName: "Tom Wilson", date: "2026-02-28", time: "11:00 AM", status: "cancelled", price: 55, address: "789 Pine Rd" },
];

export const adminStats = {
  totalBookings: 1247,
  activeUsers: 3842,
  serviceProviders: 156,
  revenue: 89450,
  bookingsByStatus: {
    pending: 23,
    confirmed: 45,
    "in-progress": 12,
    completed: 1134,
    cancelled: 33,
  },
  recentBookings: bookings,
  monthlyRevenue: [
    { month: "Oct", revenue: 12400 },
    { month: "Nov", revenue: 15200 },
    { month: "Dec", revenue: 18900 },
    { month: "Jan", revenue: 14300 },
    { month: "Feb", revenue: 16800 },
    { month: "Mar", revenue: 11850 },
  ],
};

export const allUsers: UserProfile[] = [
  { id: "U001", name: "Alex Rivera", email: "alex@example.com", phone: "+1 555-0101", avatar: "", address: "123 Main St", role: "user" },
  { id: "U002", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-0102", avatar: "", address: "456 Oak Ave", role: "provider" },
  { id: "U003", name: "Mike Chen", email: "mike@example.com", phone: "+1 555-0103", avatar: "", address: "789 Pine Rd", role: "provider" },
  { id: "U004", name: "Emma Wilson", email: "emma@example.com", phone: "+1 555-0104", avatar: "", address: "321 Elm St", role: "user" },
  { id: "U005", name: "David Kim", email: "david@example.com", phone: "+1 555-0105", avatar: "", address: "654 Maple Dr", role: "provider" },
  { id: "U006", name: "Lisa Park", email: "lisa@example.com", phone: "+1 555-0106", avatar: "", address: "987 Cedar Ln", role: "provider" },
  { id: "U007", name: "Admin User", email: "admin@servicehub.com", phone: "+1 555-0100", avatar: "", address: "HQ", role: "admin" },
];
