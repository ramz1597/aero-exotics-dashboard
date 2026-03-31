import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    id: "essential-wash",
    name: "Essential Wash",
    price: "$60",
    priceLabel: "Starting at",
    features: [
      "Hand wash with high pH-enhanced cleaning agents",
      "Professional foam cannon application",
      "Wheels & tires meticulously cleaned",
      "Tire shine",
    ],
    popular: false,
  },
  {
    id: "interior-refresh",
    name: "Interior Refresh",
    price: "$95",
    priceLabel: "Starting at",
    features: [
      "Full interior vacuum",
      "Wipe down of dash, doors & console",
      "Leather & upholstery conditioning",
      "Interior windows cleaned",
      "Light deodorizer",
    ],
    popular: false,
  },
  {
    id: "society-signature",
    name: "Society Signature",
    price: "$160",
    priceLabel: "Starting at",
    features: [
      "Interior Refresh included",
      "Essential Wash included",
      "Door jambs cleaned",
      "Wax sealant applied (1 month protection)",
    ],
    popular: true,
  },
  {
    id: "black-label",
    name: "Black Label Detail",
    subtitle: "Ultimate Detail",
    price: "$220 - $250",
    priceLabel: "",
    features: [
      "Full Society Signature Package",
      "Deep carpet & seat shampoo",
      "Steam removal",
      "Leather cleaning & conditioning",
      "Full exterior detail",
      "Wax sealant applied",
      "Door jambs & trim dressed",
    ],
    popular: false,
    premium: true,
  },
];

const addOns = [
  { name: "Pet Hair Removal", price: "$25 - $50" },
  { name: "Heavy Stain Removal", price: "$25+" },
  { name: "Ceramic Coating", price: "$200+" },
  { name: "Exterior Wax Sealant", price: "$60 - $90" },
  { name: "Leather & Carpet Shampoo & Conditioner", price: "$80+" },
];

export default function PricingTable({ onBookClick }) {
  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Packages
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white mb-4">
            Detailing Packages
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Pricing varies based on vehicle size and condition
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              data-testid={`pricing-tier-${pkg.id}`}
              className={`relative rounded-xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                pkg.premium
                  ? "metallic-card ring-1 ring-white/20 shadow-[0_0_30px_rgba(217,35,35,0.1)]"
                  : pkg.popular
                  ? "bg-[#111111] border border-[#D92323]/30"
                  : "bg-[#111111] border border-white/5"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D92323] text-white border-0 text-[10px] tracking-wider uppercase px-3">
                  Most Popular
                </Badge>
              )}
              {pkg.premium && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black border-0 text-[10px] tracking-wider uppercase px-3">
                  Ultimate
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-1">
                  {pkg.name}
                </h3>
                {pkg.subtitle && (
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{pkg.subtitle}</p>
                )}
                <div className="mt-4">
                  {pkg.priceLabel && (
                    <span className="text-xs text-gray-500 block mb-1">{pkg.priceLabel}</span>
                  )}
                  <span className="font-heading text-3xl font-bold text-white">{pkg.price}</span>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={14} className="text-[#D92323] mt-1 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-sm text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                data-testid={`pricing-${pkg.id}-btn`}
                onClick={onBookClick}
                className={`w-full font-heading font-semibold ${
                  pkg.premium
                    ? "bg-white text-black hover:bg-gray-200"
                    : pkg.popular
                    ? "bg-[#D92323] text-white hover:bg-[#b91c1c]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        {/* Add-Ons */}
        <div className="rounded-xl bg-[#111111] border border-white/5 p-8">
          <h3 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-[#D92323]">+</span> Add-Ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, i) => (
              <div
                key={i}
                data-testid={`addon-${i}`}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-sm text-gray-300">{addon.name}</span>
                <span className="text-sm font-semibold text-white ml-4">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
