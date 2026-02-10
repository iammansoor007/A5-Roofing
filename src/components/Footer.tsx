import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.fromTo(footerRef.current.querySelectorAll(".footer-reveal"), { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
    });
  }, []);

  return (
    <footer ref={footerRef} className="section-padding bg-primary border-t border-foreground/10">
      <div className="grid-editorial">
        <div className="md:col-span-4 footer-reveal">
          <h3 className="font-heading text-foreground text-2xl font-medium mb-4 tracking-tight">Apex Roofing</h3>
          <p className="body-sm text-muted-foreground max-w-xs">Engineering roofs that endure time. Licensed, insured, and committed to structural excellence.</p>
        </div>
        <div className="md:col-span-2 md:col-start-6 footer-reveal">
          <h4 className="font-heading text-foreground text-sm font-medium mb-4 uppercase tracking-wider">Services</h4>
          <ul className="space-y-3">
            {["Residential", "Commercial", "Restoration", "Emergency", "Maintenance"].map((item) => (
              <li key={item}><motion.a href="#" className="body-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block" whileHover={{ x: 4 }}>{item}</motion.a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 footer-reveal">
          <h4 className="font-heading text-foreground text-sm font-medium mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3">
            {["About", "Leadership", "Careers", "Contact"].map((item) => (
              <li key={item}><motion.a href="#" className="body-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-block" whileHover={{ x: 4 }}>{item}</motion.a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3 md:col-start-10 footer-reveal">
          <h4 className="font-heading text-foreground text-sm font-medium mb-4 uppercase tracking-wider">Contact</h4>
          <div className="space-y-3">
            <p className="body-sm text-muted-foreground">info@apexroofing.com</p>
            <p className="body-sm text-muted-foreground">(555) 012-3456</p>
            <p className="body-sm text-muted-foreground mt-4">1240 Industrial Boulevard<br />Suite 400<br />Austin, TX 78701</p>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 footer-reveal">
        <p className="body-sm text-muted-foreground/60">© 2024 Apex Roofing. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Sitemap"].map((item) => (
            <motion.a key={item} href="#" className="body-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-300" whileHover={{ y: -1 }}>{item}</motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
