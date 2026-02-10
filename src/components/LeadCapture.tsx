import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LeadCapture = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".reveal-field"), { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-deep">
      <div className="grid-editorial">
        <div className="md:col-span-5 mb-12 md:mb-0">
          <div className="accent-line mb-6 reveal-field" />
          <h2 className="heading-md text-foreground mb-6 reveal-field">Start Your<br />Project.</h2>
          <p className="body-lg text-muted-foreground reveal-field mb-8">Every enduring roof starts with understanding your vision. Get your free estimate today.</p>
          <div className="space-y-4 reveal-field">
            {[{ icon: "📞", text: "(555) 012-3456" }, { icon: "✉️", text: "info@apexroofing.com" }, { icon: "📍", text: "1240 Industrial Blvd, Austin, TX" }].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="body-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
              <div className="accent-line mx-auto mb-6" />
              <h3 className="heading-md text-foreground mb-4">Thank You</h3>
              <p className="body-lg text-muted-foreground">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-card border border-border/30">
              {[{ name: "name", label: "Full Name", type: "text" }, { name: "email", label: "Email Address", type: "email" }, { name: "phone", label: "Phone Number", type: "tel" }].map((field) => (
                <div key={field.name} className="reveal-field">
                  <label className="font-body text-sm text-muted-foreground mb-2 block font-medium">{field.label}</label>
                  <input type={field.type} required className="w-full bg-primary/50 border border-border/50 px-4 py-3 text-foreground font-body focus:border-foreground focus:outline-none transition-all duration-300" onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)} />
                </div>
              ))}
              <div className="reveal-field">
                <label className="font-body text-sm text-muted-foreground mb-2 block font-medium">Project Details</label>
                <textarea rows={4} className="w-full bg-primary/50 border border-border/50 px-4 py-3 text-foreground font-body focus:border-foreground focus:outline-none transition-all duration-300 resize-none" onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
              </div>
              <motion.button type="submit" className="reveal-field w-full bg-foreground text-primary py-4 font-heading font-medium tracking-tight text-base inline-flex items-center justify-center gap-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Submit Inquiry
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
