import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceDetail from "@/assets/service-detail.jpg";
import aboutImage from "@/assets/about-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { number: "01", title: "Residential Roofing", description: "Custom-engineered residential roof systems. From slate to standing seam, built for lasting beauty.", icon: "🏠" },
  { number: "02", title: "Commercial Systems", description: "Large-scale commercial roofing solutions with TPO, EPDM, and modified bitumen systems.", icon: "🏢" },
  { number: "03", title: "Roof Restoration", description: "Comprehensive restoration programs that extend roof lifecycle by decades.", icon: "🔧" },
  { number: "04", title: "Emergency Repair", description: "24/7 rapid-response structural repair with same-day assessment.", icon: "⚡" },
  { number: "05", title: "Preventive Maintenance", description: "Data-driven inspection and maintenance programs that prevent failures.", icon: "🛡️" },
  { number: "06", title: "Architectural Metal", description: "Bespoke architectural metalwork and copper roofing for landmark properties.", icon: "✨" },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".service-card");
    cards.forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%" },
      });
    });
    const images = sectionRef.current.querySelectorAll(".service-img-reveal");
    images.forEach((img) => {
      gsap.fromTo(img, { clipPath: "inset(100% 0 0 0)" }, {
        clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: img, start: "top 80%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-secondary">
      <div className="grid-editorial mb-20">
        <div className="md:col-span-6">
          <div className="accent-line mb-6" />
          <h2 className="heading-lg text-foreground mb-6">What We<br />Engineer.</h2>
          <p className="body-lg text-muted-foreground max-w-md">From residential masterpieces to commercial-grade systems, every roof is precision-engineered for endurance.</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <div className="service-img-reveal overflow-hidden aspect-[4/3]">
            <img src={serviceDetail} alt="Roofing detail" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div key={service.number} className="service-card group p-8 bg-card border border-border/30 hover:border-foreground/20 transition-all duration-500 relative overflow-hidden" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/[0.03]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{service.icon}</span>
                <span className="font-body text-foreground/30 text-xs tracking-wider font-medium">{service.number}</span>
              </div>
              <h3 className="font-heading text-foreground text-xl font-medium mb-3 group-hover:text-foreground transition-colors duration-300">{service.title}</h3>
              <p className="body-sm text-muted-foreground leading-relaxed">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 text-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="font-body text-sm font-medium">Learn More</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 service-img-reveal overflow-hidden aspect-[21/9] relative">
        <img src={aboutImage} alt="Roofing craftsmanship" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex items-center">
          <div className="px-8 md:px-16 max-w-lg">
            <h3 className="heading-md text-foreground mb-4">Craftsmanship<br />Meets Engineering.</h3>
            <p className="body-sm text-foreground/70">Every project receives the full measure of our 17 years of expertise and precision.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
