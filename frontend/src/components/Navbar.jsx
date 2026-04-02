import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Get a Quote", href: "#quote" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass-surface py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" data-testid="logo-link">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663449353326/5LTm2mWiJD2WntxvpmBGXZ/metallic_logo_5e7cb07f.jpeg"
            alt="AeroExotic"
            className="h-10 w-10 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all"
          />
          <span className="font-heading font-bold text-lg tracking-tight text-white hidden sm:block">
            AEROEXOTIC
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              data-testid={`nav-${link.label.toLowerCase()}`}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D92323] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+15097995696"
            data-testid="nav-phone-link"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Phone size={14} strokeWidth={1.5} />
            (509) 799-5696
          </a>
          <Button
            data-testid="nav-book-now-btn"
            onClick={() => {
              const el = document.querySelector("#quote");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-black hover:bg-gray-200 font-heading font-semibold text-sm px-6 hidden sm:inline-flex"
          >
            Get a Quote
          </Button>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-surface mt-2 mx-4 rounded-lg p-6 animate-fade-in" data-testid="mobile-menu">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-gray-300 hover:text-white text-base font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a href="tel:+15097995696" className="flex items-center gap-2 text-gray-300 hover:text-white text-base font-medium transition-colors">
              <Phone size={16} /> (509) 799-5696
            </a>
            <Button
              data-testid="mobile-book-now-btn"
              onClick={() => { setMobileOpen(false); const el = document.querySelector("#quote"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-white text-black hover:bg-gray-200 font-heading font-semibold w-full mt-2"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
