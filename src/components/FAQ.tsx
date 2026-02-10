import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "What makes Apex Roofing different from other contractors?", a: "We are a design-led, engineering-first roofing firm. Every project begins with structural analysis, not a sales pitch. Our team includes licensed structural engineers and master craftsmen with 17+ years of experience." },
  { q: "What types of roofing materials do you work with?", a: "We work with the full spectrum: architectural shingles, natural slate, clay and concrete tile, standing seam metal, copper, TPO, EPDM, and modified bitumen systems." },
  { q: "Do you offer warranties?", a: "Yes. All projects include our comprehensive warranty program: 25-year workmanship warranty, full manufacturer material warranties, and our exclusive Endurance Guarantee." },
  { q: "How long does a typical project take?", a: "Residential projects typically take 3–7 days. Commercial projects range from 2–8 weeks depending on scope." },
  { q: "Do you handle insurance claims?", a: "We provide complete insurance liaison services, including comprehensive damage documentation, code-compliant scope of work, and direct communication with adjusters." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 90%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-deep">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="heading-lg text-foreground">Frequently Asked<br />Questions.</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item bg-card border border-border/30 overflow-hidden hover:border-foreground/15 transition-all duration-300">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-6 flex justify-between items-center gap-6 group">
                <span className="font-heading text-foreground text-base md:text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-foreground text-2xl font-light flex-shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="body-sm text-muted-foreground px-6 pb-6 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
