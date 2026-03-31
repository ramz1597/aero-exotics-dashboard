import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection({ onBookClick }) {
  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-testid="hero-section" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://customer-assets.emergentagent.com/job_exotic-cars-2/artifacts/2i3lu9i6_DALL%C2%B7E%202026-03-21%2009.47.08%20-%20Ultra-realistic%20cinematic%20hero%20image%20of%20a%20Porsche%20911%20GT3%20RS%20in%20aggressive%20stance%2C%20matte%20black%20with%20subtle%20carbon%20fiber%20weave%20visible%2C%20shot%20at%20golden%20.webp"
          alt="Porsche 911 GT3 RS"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          {/* Overline */}
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 mb-6 animate-fade-up opacity-0 stagger-1"
          >
            Aircraft &bull; Watercraft &bull; Automotive Detailing
          </p>

          {/* Headline */}
          <h1
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white mb-6 animate-fade-up opacity-0 stagger-2 leading-[0.95]"
          >
            Precision Detailing
            <br />
            <span className="text-gray-400">Delivered On-Site</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0 stagger-3">
            AeroExotic delivers premium mobile detailing for clients who demand more than a standard wash. From exotic vehicles to aircraft and watercraft — precision, presentation, convenience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 stagger-4">
            <Button
              data-testid="hero-book-now-btn"
              onClick={onBookClick}
              className="bg-white text-black hover:bg-gray-200 font-heading font-bold text-base px-8 py-6 hover:scale-[1.02] transition-transform"
            >
              Book Now
            </Button>
            <Button
              data-testid="hero-view-services-btn"
              onClick={scrollToServices}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-heading font-semibold text-base px-8 py-6 hover:scale-[1.02] transition-transform"
            >
              View Services
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
