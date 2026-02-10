import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolioBefore from "@/assets/portfolio-before.jpg";
import portfolioAfter from "@/assets/portfolio-after.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Mercer Estate", category: "Residential", image: portfolio1, size: "large" },
  { title: "Summit Tech Campus", category: "Commercial", image: portfolio2, size: "small" },
  { title: "Heritage Museum", category: "Historic", image: portfolio3, size: "small" },
  { title: "Eastgate Distribution", category: "Industrial", image: portfolio4, size: "large" },
  { title: "Whitfield Manor", category: "Luxury Estate", image: portfolio5, size: "large" },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [baPos, setBaPos] = useState(50);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".portfolio-item");
    items.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 85%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <div className="accent-line mb-6" />
          <h2 className="heading-lg text-foreground">Featured Projects.</h2>
        </div>
        <p className="body-sm text-muted-foreground max-w-sm">From luxury estates to commercial campuses — see the quality of our engineering firsthand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {projects.map((project, i) => (
          <motion.div key={project.title} className={`portfolio-item group cursor-pointer relative overflow-hidden ${i === 0 || i === 3 ? "md:row-span-2 aspect-[3/4]" : "aspect-[4/3]"}`} onClick={() => setLightbox(project.image)} whileHover={{ scale: 0.98 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="font-body text-foreground/70 text-xs uppercase tracking-[0.2em] mb-2 block">{project.category}</span>
              <h3 className="font-heading text-foreground text-xl md:text-2xl font-medium">{project.title}</h3>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-foreground/0 group-hover:border-foreground/40 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Before / After */}
      <div className="portfolio-item">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <h3 className="heading-md text-foreground">Before & After.</h3>
          <p className="body-sm text-muted-foreground">Drag to compare the transformation.</p>
        </div>
        <div className="relative aspect-[16/9] max-w-5xl overflow-hidden cursor-ew-resize select-none"
          onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setBaPos(((e.clientX - rect.left) / rect.width) * 100); }}
          onTouchMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setBaPos(((e.touches[0].clientX - rect.left) / rect.width) * 100); }}
        >
          <img src={portfolioAfter} alt="After" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${baPos}%` }}>
            <img src={portfolioBefore} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (baPos / 100)}%`, maxWidth: "none" }} />
          </div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-foreground z-10" style={{ left: `${baPos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L3 10L7 16M13 4L17 10L13 16" stroke="hsl(222, 73%, 44%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-primary/80 px-3 py-1 text-foreground text-xs font-heading uppercase tracking-wider z-20">Before</div>
          <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 text-foreground text-xs font-heading uppercase tracking-wider z-20">After</div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[90] bg-primary/95 flex items-center justify-center cursor-pointer p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.img src={lightbox} alt="Project" className="max-w-full max-h-full object-contain" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.4 }} />
            <div className="absolute top-8 right-8 text-foreground font-heading text-sm uppercase tracking-wider">Click to close</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
