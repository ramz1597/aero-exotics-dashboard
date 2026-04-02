import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zip_code: "",
    service_type: "",
    vehicle_type: "",
    year_make_model: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.zip_code || !form.service_type || !form.vehicle_type || !form.year_make_model) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quotes`, { ...form, source: "Website Form" });
      toast.success("Quote request sent! We'll text you within minutes.");
      setForm({ name: "", phone: "", zip_code: "", service_type: "", vehicle_type: "", year_make_model: "", notes: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="quote" data-testid="quote-section" className="py-24 lg:py-32 bg-[#050505] relative">
      {/* Subtle accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D92323]/40 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D92323] mb-4">
            Limited Availability
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white mb-4">
            Get Your Quote in Seconds
          </h2>
          <p className="text-base text-gray-400">
            We'll text you within minutes to finalize details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-2xl bg-[#111111] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
              <Input
                data-testid="quote-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-11"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number *</label>
              <Input
                data-testid="quote-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-11"
                required
              />
            </div>
          </div>

          {/* ZIP + Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">ZIP Code *</label>
              <Input
                data-testid="quote-zip"
                value={form.zip_code}
                onChange={(e) => setForm({ ...form, zip_code: e.target.value })}
                placeholder="99201"
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-11"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Select Your Detail *</label>
              <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                <SelectTrigger data-testid="quote-service-type" className="bg-black/40 border-white/10 text-white h-11">
                  <SelectValue placeholder="Choose a package" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="Founders Detail — $100 (Limited Time)">Founders Detail — $100 (Limited Time)</SelectItem>
                  <SelectItem value="Black Label Detail — Starting at $200">Black Label Detail — Starting at $200</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vehicle Type + Make/Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Vehicle Type *</label>
              <Select value={form.vehicle_type} onValueChange={(v) => setForm({ ...form, vehicle_type: v })}>
                <SelectTrigger data-testid="quote-vehicle-type" className="bg-black/40 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-white/10">
                  <SelectItem value="Sedan / Coupe">Sedan / Coupe</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Truck / Large Vehicle">Truck / Large Vehicle</SelectItem>
                  <SelectItem value="Exotic">Exotic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Make / Model *</label>
              <Input
                data-testid="quote-make-model"
                value={form.year_make_model}
                onChange={(e) => setForm({ ...form, year_make_model: e.target.value })}
                placeholder="e.g. 2024 Porsche 911"
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-11"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Anything specific?</label>
            <Input
              data-testid="quote-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Pet hair, heavy stains, ceramic coating interest..."
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-11"
            />
          </div>

          {/* CTA */}
          <Button
            data-testid="quote-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-[#D92323] hover:bg-[#b91c1c] text-white font-heading font-bold h-13 text-base py-3 mt-2 hover:scale-[1.01] transition-transform"
          >
            <Send size={16} className="mr-2" />
            {loading ? "Sending..." : "Get My Quote"}
          </Button>

          <p className="text-center text-xs text-gray-500 mt-3">
            We'll text you within minutes to finalize details.
          </p>
        </form>

        {/* Call CTA */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-2">Prefer to talk?</p>
          <a
            href="tel:+15097995696"
            data-testid="quote-call-btn"
            className="inline-flex items-center gap-2 text-white hover:text-[#D92323] transition-colors font-heading font-semibold text-lg"
          >
            <Phone size={18} />
            (509) 799-5696
          </a>
        </div>
      </div>
    </section>
  );
}
