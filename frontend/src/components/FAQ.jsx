import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What areas do you serve?",
    a: "We provide mobile detailing services throughout Spokane, WA and the surrounding areas including Coeur d'Alene, Priest Lake, and the greater Inland Northwest region.",
  },
  {
    q: "Do you need water or power at my location?",
    a: "Our mobile unit is fully self-contained with its own water supply and power equipment. No hookups are required at your location.",
  },
  {
    q: "What types of vehicles do you detail?",
    a: "We service all vehicles from daily drivers to exotic and luxury cars. Our specialization is high-value vehicles including sports cars, luxury SUVs, classic cars, and performance vehicles. Aircraft and watercraft detailing is coming soon.",
  },
  {
    q: "What is ceramic coating?",
    a: "Ceramic coating is a liquid polymer applied to your vehicle's exterior that creates a long-lasting protective layer. It provides superior gloss, UV resistance, hydrophobic properties, and protects against environmental contaminants. Pricing starts at $200+.",
  },
  {
    q: "How long does a typical detail take?",
    a: "An Essential Wash takes approximately 1-2 hours. Interior Refresh is 1.5-2 hours. The Society Signature package takes 2-3 hours, and the Black Label Detail takes 4-6 hours depending on vehicle size and condition.",
  },
  {
    q: "How do I get a quote?",
    a: "Click the 'Book Now' button at the top of the page to walk through our booking wizard, or use our contact form to send us a message. We'll respond promptly with a custom quote based on your vehicle and needs.",
  },
  {
    q: "Does pricing vary by vehicle size?",
    a: "Yes. Our listed prices are starting rates for standard-sized vehicles. Larger vehicles (trucks, SUVs, full-size sedans) or vehicles in particularly rough condition may have adjusted pricing. We'll confirm pricing before service begins.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Questions
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            FAQ
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="rounded-xl bg-[#111111] border border-white/5 px-6 hover:border-white/10 transition-colors"
            >
              <AccordionTrigger className="text-left text-white font-heading font-semibold text-sm hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
