import { Instagram, Mail, MapPin, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer data-testid="footer" className="bg-[#050505] border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663449353326/5LTm2mWiJD2WntxvpmBGXZ/metallic_logo_5e7cb07f.jpeg"
                alt="AeroExotic"
                className="h-10 w-10 rounded-full ring-1 ring-white/10"
              />
              <span className="font-heading font-bold text-lg text-white tracking-tight">AEROEXOTIC</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
              Aircraft &bull; Watercraft &bull; Automotive
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium mobile detailing for clients who demand the highest level of care.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Automotive Detailing</a></li>
              <li><span className="text-sm text-gray-600">Aircraft Detailing <span className="text-[10px] text-[#D92323]">(Coming Soon)</span></span></li>
              <li><span className="text-sm text-gray-600">Watercraft Detailing <span className="text-[10px] text-[#D92323]">(Coming Soon)</span></span></li>
              <li><a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#gallery" className="text-sm text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#process" className="text-sm text-gray-400 hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gray-500" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">Spokane, WA & Surrounding Areas</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gray-500" strokeWidth={1.5} />
                <a href="mailto:aeroexoticdetailing@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  aeroexoticdetailing@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={14} className="text-gray-500" strokeWidth={1.5} />
                <a
                  href="https://www.instagram.com/aeroexotic?igsh=anNudDJmcWNob3I4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  data-testid="instagram-link"
                >
                  @aeroexotic
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} AeroExotic. All rights reserved.
          </p>
          <button
            data-testid="scroll-to-top-btn"
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronUp size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
