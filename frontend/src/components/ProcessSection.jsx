import { MessageSquare, CalendarCheck, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Request a Quote",
    description: "Tell us about your vehicle and select the package that fits your needs.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Schedule Service",
    description: "Choose a date, time, and location that works for you.",
  },
  {
    icon: Truck,
    step: "03",
    title: "We Come to You",
    description: "Our fully equipped mobile unit arrives at your location, ready to detail.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Showroom Results",
    description: "Enjoy a flawless finish. Your vehicle, restored to its best.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" data-testid="process-section" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            Our Process
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} data-testid={`process-step-${i}`} className="relative group">
                <div className="p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/15 transition-all duration-300 h-full">
                  {/* Step number */}
                  <span className="font-heading text-4xl font-black text-white/5 absolute top-4 right-4">
                    {s.step}
                  </span>

                  <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5">
                    <Icon size={22} strokeWidth={1.5} className="text-[#D92323]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.description}</p>
                </div>

                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
