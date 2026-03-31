import { useState } from "react";
import { Car, Plane, Ship, Lock, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const services = [
  {
    id: "automotive",
    icon: Car,
    title: "Automotive Detailing",
    description: "Comprehensive interior and exterior detailing for luxury and exotic vehicles. From gentle hand washes to meticulous paint correction and ceramic coatings.",
    image: "https://images.pexels.com/photos/14231684/pexels-photo-14231684.jpeg",
    active: true,
  },
  {
    id: "aircraft",
    icon: Plane,
    title: "Aircraft Detailing",
    description: "Specialized cleaning and detailing for jets, turboprops, and helicopters. Aviation-approved products to protect sensitive finishes and surfaces.",
    image: "https://images.pexels.com/photos/25724429/pexels-photo-25724429.jpeg",
    active: false,
  },
  {
    id: "watercraft",
    icon: Ship,
    title: "Watercraft Detailing",
    description: "High-end detailing for yachts, sailboats, and personal watercraft. Hull cleaning, topside polishing, teak care, and marine-grade protection.",
    image: "https://images.pexels.com/photos/9716320/pexels-photo-9716320.jpeg",
    active: false,
  },
];

function NotifyForm({ serviceType }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/notify`, { email, service_type: serviceType });
      toast.success("You'll be notified when this service launches!");
      setEmail("");
    } catch (err) {
      if (err.response?.status === 400) {
        toast.info("You're already subscribed!");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
      <Input
        data-testid={`notify-email-${serviceType}`}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-black/60 border-white/20 text-white placeholder:text-gray-500 text-sm h-9"
        required
      />
      <Button
        data-testid={`notify-submit-${serviceType}`}
        type="submit"
        disabled={loading}
        className="bg-[#D92323] hover:bg-[#b91c1c] text-white text-sm h-9 px-4 whitespace-nowrap"
      >
        <Bell size={14} className="mr-1" />
        Notify Me
      </Button>
    </form>
  );
}

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            What We Do
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            Our Services
          </h2>
        </div>

        {/* Service Cards - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className="relative group rounded-xl overflow-hidden min-h-[420px]"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      <Icon size={20} strokeWidth={1.5} className="text-white" />
                    </div>
                    {service.active ? (
                      <Badge className="bg-white/10 text-white border-white/20 text-[10px] tracking-wider uppercase">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-[#D92323]/20 text-[#D92323] border-[#D92323]/30 text-[10px] tracking-wider uppercase">
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Coming Soon overlay with Notify Me */}
                  {!service.active && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <Lock size={12} />
                        <span>Be the first to know when we launch</span>
                      </div>
                      <NotifyForm serviceType={service.id} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
