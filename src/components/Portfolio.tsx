import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView
} from "framer-motion";
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

// ======================
// PREMIUM PORTFOLIO PROJECTS
// ======================
const projects = [
  {
    number: "01",
    title: "Mercer Estate",
    category: "Residential",
    image: portfolio1,
    size: "large",
    location: "Greenwich, CT",
    year: "2024",
    accent: "from-blue-600 to-blue-800",
    architect: "Foster + Partners",
    scope: "Full Restoration"
  },
  {
    number: "02",
    title: "Summit Tech Campus",
    category: "Commercial",
    image: portfolio2,
    size: "small",
    location: "Austin, TX",
    year: "2023",
    accent: "from-blue-500 to-blue-700",
    architect: "Gensler",
    scope: "New Construction"
  },
  {
    number: "03",
    title: "Heritage Museum",
    category: "Storm Damage Repair",
    image: portfolio3,
    size: "small",
    location: "Boston, MA",
    year: "2024",
    accent: "from-blue-700 to-blue-900",
    architect: "Renzo Piano",
    scope: "Preservation"
  },
  {
    number: "04",
    title: "Eastgate Distribution",
    category: "Industrial",
    image: portfolio4,
    size: "large",
    location: "Chicago, IL",
    year: "2023",
    accent: "from-blue-600 to-blue-800",
    architect: "SOM",
    scope: "Structural Upgrade"
  },
  {
    number: "05",
    title: "Whitfield Manor",
    category: "Luxury Estate",
    image: portfolio5,
    size: "large",
    location: "Los Angeles, CA",
    year: "2024",
    accent: "from-blue-500 to-blue-700",
    architect: "Olson Kundig",
    scope: "Storm Damage Repair"
  },
];

// ======================
// PREMIUM PORTFOLIO ITEM - AWARD WINNING
// ======================
const PortfolioItem = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const itemRef = useRef(null);

  // 3D Tilt Effect - Premium Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 60, damping: 12, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 12, mass: 0.5 });

  const rotateX = useTransform(springY, [-0.4, 0.4], [4, -4]);
  const rotateY = useTransform(springX, [-0.4, 0.4], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width - 0.5) * 0.4;
    const yPct = (mouseY / rect.height - 0.5) * 0.4;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Intersection Observer for load animation
  const inView = useInView(itemRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [inView]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
      className={`portfolio-item group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ${project.size === "large"
        ? "md:row-span-2 aspect-[3/4] md:aspect-[3/4]"
        : "aspect-[4/3] md:aspect-[4/3]"
        }`}
    >
      {/* Premium Gradient Mesh */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15)_0%,_transparent_70%)]" />
      </div>

      {/* Animated Border - SVG Drawing Effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <motion.rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="12 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isHovered ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </svg>

      {/* Image with Parallax Scale */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Floating Particles on Hover */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/80 z-30"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 0.8
              }}
              animate={{
                x: [`50%`, `${15 + (i * 12)}%`],
                y: [`50%`, `${10 + (i * 15)}%`],
                scale: [0, 1.8, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.12,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Content Overlay - Animated */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 md:p-10">
        {/* Category Badge with Slide Up */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3"
        >
          <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/50">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.accent} animate-pulse`} />
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-blue-900">
              {project.category}
            </span>
            <span className="text-[8px] font-mono text-blue-400 bg-blue-50 px-1.5 py-0.5 rounded-full">
              {project.number}
            </span>
          </span>
        </motion.div>

        {/* Title with Letter Spacing Animation */}
        <motion.h3
          className="font-heading text-white text-3xl md:text-4xl font-bold mb-2 leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {project.title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3"
              animate={isHovered ? {
                letterSpacing: "0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              } : {
                letterSpacing: "0em",
                textShadow: "none"
              }}
              transition={{ duration: 0.3, delay: 0.2 + (i * 0.05) }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h3>

        {/* Metadata Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 mt-4 mb-5"
          initial={{ y: 40, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex items-center gap-2 text-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="2.5" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-medium">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
              <path d="M8 2v4M16 2v4M3 10h18" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-medium">{project.year}</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l7 7-7 7-7-7 7-7z" strokeWidth="1.5" />
              <path d="M5 17h14" strokeWidth="1.5" />
              <path d="M5 21h14" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-medium">{project.architect}</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 12H4M12 4v16" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-medium">{project.scope}</span>
          </div>
        </motion.div>

        {/* View Project CTA */}
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ y: 30, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
            View Case Study
          </span>
          <motion.div
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            animate={isHovered ? { x: 5, backgroundColor: "rgba(255,255,255,0.3)" } : { x: 0, backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/0 group-hover:border-white/40 transition-all duration-700 z-30" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/0 group-hover:border-white/40 transition-all duration-700 z-30" />

      {/* Premium Shine Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 80%)",
          mixBlendMode: "overlay"
        }}
        animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
};

// ======================
// PREMIUM BEFORE/AFTER SLIDER - AWARD WINNING
// ======================
const BeforeAfterSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Premium spring animation for smooth sliding
  const sliderX = useMotionValue(50);
  const smoothSliderX = useSpring(sliderX, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Parallax effect for images
  const beforeScale = useTransform(smoothSliderX, [0, 100], [1.1, 1]);
  const afterScale = useTransform(smoothSliderX, [0, 100], [1, 1.1]);

  // Handle movement
  const handleMove = useCallback((clientX) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    x = Math.min(Math.max(x, 3), 97);
    sliderX.set(x);
  }, [isDragging, sliderX]);

  // Event handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Transform for before image width
  const beforeWidth = useTransform(smoothSliderX, (v) => `${v}%`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
      className="mt-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700" />
            <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-700">
              Restoration Showcase
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Before <span className="text-blue-600">&</span> After
          </h3>
          <p className="text-slate-600 text-base mt-3 max-w-lg">
            Witness the transformation of a 1920s heritage facade into a modern masterpiece.
          </p>
        </div>

        {/* Interactive Hint */}
        <motion.div
          animate={!isDragging ? { y: [0, -5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-3 bg-blue-50/80 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
            <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2M12 12v8M8 12v4M16 12v6" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700">
            {isDragging ? 'Release to compare' : 'Drag slider to compare'}
          </span>
        </motion.div>
      </div>

      {/* Premium Comparison Container */}
      <div
        ref={containerRef}
        className="relative aspect-[16/9] max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/25 select-none group"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'ew-resize' }}
      >
        {/* After Image (Full) */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: afterScale }}
        >
          <img
            src={portfolioAfter}
            alt="After restoration"
            className="w-full h-full object-cover"
          />
          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-transparent" />
        </motion.div>

        {/* Before Image (Clipped) */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ width: beforeWidth }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: beforeScale }}
          >
            <img
              src={portfolioBefore}
              alt="Before restoration"
              className="w-full h-full object-cover"
            />
            {/* Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/10 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Animated Divider Line */}
        <motion.div
          className="absolute top-0 bottom-0 w-[3px] z-40"
          style={{ left: useTransform(smoothSliderX, (v) => `${v}%`) }}
        >
          {/* Gradient Line */}
          <div className="absolute inset-0 w-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400 shadow-lg shadow-blue-600/50" />

          {/* Premium Handle */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-blue-600"
            whileHover={{ scale: 1.15, boxShadow: "0 20px 40px rgba(37,99,235,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Double Arrow Icon */}
            <div className="flex gap-1.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Premium Labels */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6 z-50"
        >
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-blue-200">
            <span className="flex items-center gap-2.5 text-sm font-bold text-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              BEFORE • 1927
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 right-6 z-50"
        >
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-blue-200">
            <span className="flex items-center gap-2.5 text-sm font-bold text-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
              </span>
              AFTER • 2024
            </span>
          </div>
        </motion.div>

        {/* Gradient Edge Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none z-30" />
      </div>

      {/* Transformation Stats */}
      <div className="flex justify-center gap-16 mt-12">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
            45+
          </div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            YEARS RESTORED
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
            100%
          </div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            STRUCTURAL INTEGRITY
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
            25YR
          </div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            WARRANTY
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ======================
// PREMIUM LIGHTBOX - CINEMATIC
// ======================
const PremiumLightbox = ({ image, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-blue-950/98 backdrop-blur-xl flex items-center justify-center cursor-pointer p-6 md:p-12"
      onClick={onClose}
    >
      {/* Premium Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
      />

      {/* Close Button - Premium */}
      <motion.button
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 group"
        onClick={onClose}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-500" />
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3 text-white hover:bg-white/20 transition-all duration-500">
            <span className="text-xs font-black tracking-[0.2em] uppercase">Close</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.button>

      {/* Image with Cinematic Reveal */}
      <motion.img
        src={image}
        alt="Project preview"
        className="max-w-full max-h-[90vh] object-contain relative z-30 rounded-2xl shadow-2xl shadow-blue-950/50"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{
          duration: 0.7,
          ease: [0.215, 0.61, 0.355, 1],
          delay: 0.1
        }}
      />

      {/* Image Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-white/80 text-sm"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Click anywhere to close • Press ESC
        </span>
      </motion.div>
    </motion.div>
  );
};

// ======================
// MAIN PORTFOLIO COMPONENT - AWARD WINNING
// ======================
const Portfolio = () => {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Premium filter system
  const categories = ["all", "residential", "commercial", "storm damage", "industrial", "luxury estate"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter]);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  const headerParallax = useTransform(smoothProgress, [0, 1], [0, -30]);
  const bgParallax = useTransform(smoothProgress, [0, 1], [0, 50]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-reveal',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-28 md:py-36"
    >
      {/* ====================== */}
      {/* PREMIUM BACKGROUND LAYERS */}
      {/* ====================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6f0ff_1px,transparent_1px),linear-gradient(to_bottom,#e6f0ff_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-25" />

        {/* Gradient Orbs */}
        <motion.div
          style={{ y: bgParallax }}
          className="absolute top-40 -left-20 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgParallax }}
          className="absolute bottom-40 -right-20 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl"
        />

        {/* Gradient Fades */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-blue-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* ====================== */}
        {/* SECTION HEADER - CINEMATIC */}
        {/* ====================== */}
        <motion.div
          style={{ y: headerParallax }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
        >
          <div className="portfolio-reveal">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800" />
              <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-700">
                Portfolio MMXXIV
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-[-0.02em]">
              FEATURED<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
                PROJECTS
              </span>
            </h2>
          </div>
          <p className="portfolio-reveal text-slate-600 text-lg max-w-md leading-relaxed">
            A5 Roofing is built on a strong foundation of integrity, discipline, and an unwavering commitment to customer care. Every project we complete reflects careful attention to detail, honest communication, and a genuine focus.

          </p>
        </motion.div>

        {/* ====================== */}
        {/* PREMIUM FILTER TABS */}
        {/* ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 ${activeFilter === cat
                ? 'text-white'
                : 'text-slate-600 hover:text-blue-700 bg-white/50 hover:bg-blue-50/80'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="portfolioFilter"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg shadow-blue-600/25"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ====================== */}
        {/* AWARD-WINNING PORTFOLIO GRID */}
        {/* ====================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-32">
          {filteredProjects.map((project, index) => (
            <PortfolioItem
              key={project.title}
              project={project}
              index={index}
              onClick={() => setLightbox(project.image)}
            />
          ))}
        </div>

        {/* ====================== */}
        {/* PREMIUM BEFORE/AFTER SLIDER */}
        {/* ====================== */}
        <BeforeAfterSlider />
      </div>

      {/* ====================== */}
      {/* CINEMATIC LIGHTBOX */}
      {/* ====================== */}
      <AnimatePresence mode="wait">
        {lightbox && (
          <PremiumLightbox
            image={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      {/* ====================== */}
      {/* PREMIUM BOTTOM WAVE */}
      {/* ====================== */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-16 md:h-20"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#portfolioWave)"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
          <defs>
            <linearGradient id="portfolioWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.04" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Portfolio;