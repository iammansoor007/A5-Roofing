import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "Apex didn't just replace our roof — they re-engineered the entire system. The attention to structural detail was unlike anything we've experienced.", name: "Catherine Mercer", title: "Director of Facilities, Mercer Holdings" },
  { quote: "The precision and craftsmanship were extraordinary. Our historic property deserved nothing less, and Apex delivered beyond expectations.", name: "James Whitfield", title: "Owner, The Whitfield Estate" },
  { quote: "From initial assessment to final inspection, every phase was executed with military-grade precision. This is how roofing should be done.", name: "Dr. Alina Kovacs", title: "Principal, Kovacs Architecture Studio" },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.15, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-primary">
      <div className="text-center mb-16">
        <div className="accent-line mx-auto mb-6" />
        <h2 className="heading-lg text-foreground">Trusted by Those Who<br />Demand More.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={i} className="testimonial-card p-8 bg-card border border-border/30 relative group" whileHover={{ y: -4 }}>
            <div className="h-px bg-foreground/10 mb-6" />
            <blockquote className="body-sm text-foreground/90 mb-8 leading-relaxed">"{t.quote}"</blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center font-heading font-medium text-foreground text-sm">{t.name.charAt(0)}</div>
              <div>
                <p className="font-heading font-medium text-foreground text-sm">{t.name}</p>
                <p className="font-body text-muted-foreground text-xs">{t.title}</p>
              </div>
            </div>
            <div className="absolute top-6 right-6 text-foreground/5 text-6xl font-heading font-medium leading-none">"</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
