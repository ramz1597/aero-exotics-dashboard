import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get(`${API}/testimonials`).then((r) => setTestimonials(r.data)).catch(() => {});
  }, []);

  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            What Clients Say
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t) => (
            <div
              key={t.id}
              data-testid={`testimonial-${t.id}`}
              className="group p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/15 transition-all duration-300"
            >
              <Quote size={24} className="text-[#D92323]/30 mb-4" strokeWidth={1.5} />

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.vehicle}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[#D92323] fill-[#D92323]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
