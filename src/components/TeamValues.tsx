import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Precision", description: "Every measurement, every cut, every seal — executed with zero tolerance for error." },
  { title: "Integrity", description: "Transparent processes, honest assessments, and materials that meet our exacting standards." },
  { title: "Endurance", description: "We engineer for decades, not years. Our systems are built to outlast expectations." },
  { title: "Craft", description: "The intersection of engineering discipline and artisanal mastery." },
];

const team = [
  { name: "Robert Apex", role: "Founder & Principal Engineer", initial: "RA" },
  { name: "Elena Vasquez", role: "Director of Operations", initial: "EV" },
  { name: "Michael Chen", role: "Lead Structural Engineer", initial: "MC" },
  { name: "Sarah Thornton", role: "Client Relations Director", initial: "ST" },
];

const TeamValues = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".value-item, .team-card");
    items.forEach((item) => {
      gsap.fromTo(item, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 88%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-primary">
      <div className="mb-24">
        <div className="text-center mb-16">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="heading-lg text-foreground">Core Values.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} className="value-item p-8 bg-card border border-border/30 hover:border-foreground/20 transition-all duration-500 text-center group" whileHover={{ y: -6 }}>
              <h3 className="font-heading text-foreground text-lg font-medium mb-3">{v.title}</h3>
              <p className="body-sm text-muted-foreground">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-center mb-12">
          <h3 className="heading-md text-foreground">Our Leadership.</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div key={i} className="team-card p-6 bg-card border border-border/30 hover:border-foreground/20 transition-all duration-500 text-center group" whileHover={{ y: -4 }}>
              <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-medium text-foreground text-lg">{t.initial}</span>
              </div>
              <p className="font-heading text-foreground font-medium mb-1">{t.name}</p>
              <p className="font-body text-muted-foreground text-xs">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
