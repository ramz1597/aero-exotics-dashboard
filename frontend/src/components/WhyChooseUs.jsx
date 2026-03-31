import { MapPin, Droplets, Shield, Clock, Star, Wrench } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Mobile Convenience",
    description: "We come to you. Home, office, hangar, or marina — premium detailing wherever your vehicle is.",
  },
  {
    icon: Star,
    title: "Attention to Detail",
    description: "Every surface, seam, and crevice receives meticulous care. No shortcuts, no compromises.",
  },
  {
    icon: Shield,
    title: "Specialized Care",
    description: "Expertise across automotive, aviation, and marine surfaces. The right products for every finish.",
  },
  {
    icon: Droplets,
    title: "Premium Products",
    description: "We use only professional-grade, paint-safe products designed for high-value vehicles.",
  },
  {
    icon: Wrench,
    title: "Professional Experience",
    description: "Trained technicians with years of experience on exotic, luxury, and specialty vehicles.",
  },
  {
    icon: Clock,
    title: "Customized Plans",
    description: "Tailored packages for every vehicle and budget. From quick refreshes to full corrections.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" data-testid="why-choose-section" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            The Difference
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            Why AeroExotic
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                data-testid={`why-feature-${i}`}
                className="group p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/15 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 group-hover:bg-[#D92323]/10 transition-colors">
                  <Icon size={22} strokeWidth={1.5} className="text-gray-400 group-hover:text-[#D92323] transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
