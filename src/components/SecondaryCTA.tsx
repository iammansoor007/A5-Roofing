import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioHero from "@/assets/portfolio-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const SecondaryCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector(".cta-content"), { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={portfolioHero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/20" />

      <div className="section-padding w-full relative z-10 cta-content">
        <div className="max-w-3xl mx-auto text-center">
          <div className="accent-line mx-auto mb-8" />
          <h2 className="heading-lg text-foreground mb-6">Your Roof Is a System.<br />Treat It Like One.</h2>
          <p className="body-lg text-muted-foreground mb-10 max-w-xl mx-auto">Stop treating your roof as an afterthought. Partner with engineers who understand structural systems and enduring performance.</p>
          <motion.a href="#contact" className="inline-flex items-center gap-3 bg-foreground text-primary px-10 py-5 font-heading font-medium text-lg tracking-tight" whileHover={{ scale: 1.03, boxShadow: "0 12px 50px hsl(0 0% 100% / 0.15)" }} whileTap={{ scale: 0.97 }}>
            Schedule Free Assessment
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default SecondaryCTA;
