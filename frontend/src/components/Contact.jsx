import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", vehicle_type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", vehicle_type: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Get In Touch
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight uppercase text-white mb-6">
              Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-lg">
              Ready to give your vehicle the premium treatment it deserves? Reach out for a custom quote or to schedule your mobile detailing service.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <Mail size={20} strokeWidth={1.5} className="text-[#D92323]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:AeroExoticDetailing@gmail.com" className="text-white hover:text-[#D92323] transition-colors text-sm">
                    AeroExoticDetailing@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <Phone size={20} strokeWidth={1.5} className="text-[#D92323]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                  <a href="tel:+15097995696" className="text-white hover:text-[#D92323] transition-colors text-sm">
                    (509) 799-5696
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <MapPin size={20} strokeWidth={1.5} className="text-[#D92323]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Service Area</p>
                  <p className="text-white text-sm">Spokane, WA & Surrounding Areas</p>
                  <p className="text-gray-500 text-xs">Coeur d'Alene, Priest Lake & Inland NW</p>
                </div>
              </div>
            </div>

            {/* Quote text */}
            <div className="mt-12 p-6 rounded-xl bg-[#111111] border border-white/5">
              <p className="text-sm text-gray-400 italic leading-relaxed">
                "Designed for vehicles that demand the highest level of care — inside & out."
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Name *</label>
                  <Input
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 h-11"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email *</label>
                  <Input
                    data-testid="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Phone</label>
                  <Input
                    data-testid="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 h-11"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Vehicle Type</label>
                  <Select value={form.vehicle_type} onValueChange={(v) => setForm({ ...form, vehicle_type: v })}>
                    <SelectTrigger data-testid="contact-vehicle-type" className="bg-[#111111] border-white/10 text-white h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-white/10">
                      <SelectItem value="sedan">Sedan / Coupe</SelectItem>
                      <SelectItem value="suv">SUV / Truck</SelectItem>
                      <SelectItem value="exotic">Exotic / Sports Car</SelectItem>
                      <SelectItem value="luxury">Luxury Vehicle</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Message *</label>
                <Textarea
                  data-testid="contact-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your vehicle and what service you're interested in..."
                  className="bg-[#111111] border-white/10 text-white placeholder:text-gray-600 min-h-[120px] resize-none"
                  required
                />
              </div>

              <Button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200 font-heading font-semibold h-12 text-base"
              >
                <Send size={16} className="mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
