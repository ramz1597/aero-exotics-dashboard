import { Plane, Ship, Car, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Car, label: "Exotic Auto Care" },
  { icon: Plane, label: "Aircraft Detailing" },
  { icon: Ship, label: "Marine Services" },
  { icon: Shield, label: "Paint-Safe Products" },
  { icon: Sparkles, label: "White-Glove Service" },
];

export default function TrustBar() {
  return (
    <section data-testid="trust-bar" className="relative py-6 border-y border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors group"
              >
                <Icon size={18} strokeWidth={1.5} className="text-gray-500 group-hover:text-[#D92323] transition-colors" />
                <span className="text-xs font-semibold tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
