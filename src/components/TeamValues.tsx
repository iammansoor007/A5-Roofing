import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM UNSplash IMAGES - CURATED
// ======================
const Images = {
  // CEO & Founder
  Ceo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",

  // Executive Team
  Cto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80",
  Cmo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
  Cdo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1061&q=80",

  // Lead Engineers
  Engineer1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
  Engineer2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
  Engineer3: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",

  // Architects
  Architect1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
  Architect2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",

  // Heritage
  Pattern: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Studio: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
};

// ======================
// PREMIUM SVG ICONS - FULLY DEFINED
// ======================
const Icons = {
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h4v12H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8h4v2c.6-.8 1.5-2 3-2 2.5 0 4 1.5 4 4v8h-4v-6c0-1.5-.5-2-2-2s-2 .5-2 2v6h-4V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Quote: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 11H6V7h4v4z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 11h-4V7h4v4z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  ),
  Award: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14l-2 6 6-2 6 2-2-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ======================
// CINEMATIC PARALLAX LAYER
// ======================
const ParallaxLayer = ({ children, speed = 0.1, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);

  return (
    <motion.div ref={ref} style={{ y }} className={`absolute inset-0 will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};

// ======================
// HERO PORTRAIT - CEO SECTION
// ======================
const CeoPortrait = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Gradient Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-700" />

        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={Images.Ceo}
            alt="Founder & CEO"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

          {/* Animated Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke="url(#ceoGradient)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHovered ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="ceoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Sparkle />
              FOUNDER • EST. 2007
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 right-6"
        >
          <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-blue-200">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Icons.Award />
              25+ YEARS LEGACY
            </span>
          </div>
        </motion.div>
      </div>

      {/* CEO Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center md:text-left"
      >
        <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-3">
          Alexander Mercer
          <span className="block text-sm font-mono text-blue-600 mt-2 tracking-[0.2em] uppercase">
            Founder & Chief Executive Officer
          </span>
        </h3>

        <div className="max-w-2xl mt-6 relative">
          <div className="absolute -left-4 top-0 text-blue-400/30">
            <Icons.Quote />
          </div>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed pl-6 italic">
            "Architecture is not about buildings—it's about the legacy we leave for generations.
            Every project is a covenant between our craft and their future."
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Icons.Linkedin />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Icons.Mail />
          </motion.a>
          <span className="text-sm text-slate-400 ml-2">
            • 4 patents • 37 awards
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ======================
// TEAM MEMBER CARD - PREMIUM
// ======================
const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-[320px] md:h-[360px] object-cover"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              animate={isHovered ? { y: -5 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-white mb-1">
                {member.name}
              </h4>
              <p className="text-sm text-blue-200 font-light tracking-wide mb-3">
                {member.role}
              </p>

              {/* Expertise Tags */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-2">
                  {member.expertise.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Links - Hover Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex flex-col gap-2"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <Icons.Linkedin />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <Icons.Mail />
            </motion.a>
          </motion.div>

          {/* Corner Accent */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/30" />
        </div>
      </div>
    </motion.div>
  );
};

// ======================
// CULTURE STATS
// ======================
const CultureStat = ({ value, label, delay }) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const duration = 2000;
    const end = parseInt(value);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-light text-blue-900 mb-2">
        {displayValue}+
      </div>
      <div className="text-xs font-medium text-blue-600/70 uppercase tracking-[0.2em]">
        {label}
      </div>
    </motion.div>
  );
};

// ======================
// MAIN TEAM SECTION - AWARD WINNING
// ======================
const Team = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const teamMembers = [
    // Executive Leadership
    {
      name: "Isabella Chen",
      role: "Chief Technology Officer",
      image: Images.Cto,
      expertise: ["Structural AI", "Parametric Design", "R&D"],
      category: "executive"
    },
    {
      name: "Marcus Webb",
      role: "Chief Design Officer",
      image: Images.Cdo,
      expertise: ["Heritage Architecture", "Material Innovation", "3D Twin"],
      category: "executive"
    },
    {
      name: "Sophia Laurent",
      role: "Chief Marketing Officer",
      image: Images.Cmo,
      expertise: ["Brand Strategy", "Client Relations", "Legacy"],
      category: "executive"
    },
    // Lead Engineers
    {
      name: "James Okafor",
      role: "Lead Structural Engineer",
      image: Images.Engineer1,
      expertise: ["High-Rise", "Seismic Retrofit", "Steel"],
      category: "engineering"
    },
    {
      name: "Elena Voss",
      role: "Senior Materials Engineer",
      image: Images.Engineer2,
      expertise: ["Sustainable Materials", "Coatings", "R&D"],
      category: "engineering"
    },
    {
      name: "David Park",
      role: "Lead Systems Engineer",
      image: Images.Engineer3,
      expertise: ["HVAC Integration", "Smart Systems", "IoT"],
      category: "engineering"
    },
    // Architects
    {
      name: "Olivia Martinez",
      role: "Principal Architect",
      image: Images.Architect1,
      expertise: ["Modernist", "Historic Preservation", "Residential"],
      category: "architecture"
    },
    {
      name: "Thomas Wright",
      role: "Senior Architect",
      image: Images.Architect2,
      expertise: ["Commercial", "Industrial", "Master Planning"],
      category: "architecture"
    }
  ];

  const filteredMembers = activeFilter === 'all'
    ? teamMembers
    : teamMembers.filter(m => m.category === activeFilter);

  const cultureStats = [
    { value: "17", label: "Years of Excellence" },
    { value: "47", label: "Industry Awards" },
    { value: "32", label: "Master Craftsmen" },
    { value: "8", label: "Patents Held" }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.team-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
      className="relative bg-white py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* ====================== */}
      {/* PREMIUM BACKGROUND */}
      {/* ====================== */}

      {/* Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, #2563eb 1px, transparent 1px),
                            linear-gradient(to bottom, #2563eb 1px, transparent 1px)
                        `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50 to-transparent opacity-60 blur-3xl" />

      {/* Heritage Pattern */}
      <ParallaxLayer speed={0.05} className="z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
          <img
            src={Images.Pattern}
            alt="Heritage pattern"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.08} className="z-0">
        <div className="absolute top-20 left-0 w-1/4 h-1/3">
          <img
            src={Images.Studio}
            alt="Studio"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30">

        {/* ====================== */}
        {/* SECTION HEADER */}
        {/* ====================== */}
        <div className="max-w-3xl mx-auto text-center mb-20 team-reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-300 to-blue-500" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600">
              The Collective
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 leading-tight">
            Masters of the<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">
              architectural craft
            </span>
          </h2>

          <p className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto">
            A multidisciplinary collective of engineers, architects, and visionaries—united by precision, driven by legacy.
          </p>
        </div>

        {/* ====================== */}
        {/* CEO FEATURE */}
        {/* ====================== */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <CeoPortrait />

          {/* Culture Stats */}
          <div className="space-y-12">
            <div className="team-reveal">
              <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-6">
                A lineage of<br />
                <span className="font-medium text-blue-800">excellence since 2007</span>
              </h3>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                What began as a singular vision has grown into a collective of the world's finest
                structural artisans. Our team brings together centuries of cumulative expertise,
                united by an uncompromising commitment to precision.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-blue-100/50 team-reveal">
              {cultureStats.map((stat, index) => (
                <CultureStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 team-reveal">
              <div className="flex -space-x-3">
                {teamMembers.slice(0, 6).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white flex items-center justify-center text-blue-800 text-xs font-medium shadow-sm"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-medium shadow-sm">
                  +47
                </div>
              </div>
              <span className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">47 experts</span> across 3 continents
              </span>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* FILTER TABS - MINIMAL */}
        {/* ====================== */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 team-reveal">
          {[
            { id: 'all', label: 'All Minds' },
            { id: 'executive', label: 'Executive' },
            { id: 'engineering', label: 'Engineering' },
            { id: 'architecture', label: 'Architecture' }
          ].map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                                relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300
                                ${activeFilter === filter.id
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-blue-50/50'
                }
                            `}
            >
              {activeFilter === filter.id && (
                <motion.div
                  layoutId="teamFilter"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ====================== */}
        {/* TEAM GRID */}
        {/* ====================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {filteredMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* ====================== */}
        {/* JOIN THE COLLECTIVE */}
        {/* ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-24 p-12 md:p-16 bg-gradient-to-br from-blue-50/50 to-white rounded-3xl border border-blue-200/50 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.05)_0%,_transparent_70%)]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Icons.Sparkle />
            </div>

            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
              Join the collective
            </h3>

            <p className="text-slate-600 text-base md:text-lg mb-8">
              We're always seeking master craftsmen, visionary engineers, and architectural artisans.
              If you demand perfection, you'll find your home here.
            </p>

            <motion.a
              href="/careers"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-xs font-medium tracking-[0.2em] uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-500"
            >
              View opportunities
              <Icons.ArrowRight />
            </motion.a>

            <p className="text-xs text-slate-400 mt-6">
              Currently reviewing applications for 4 positions
            </p>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-blue-200/50" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-blue-200/50" />
        </motion.div>

        {/* ====================== */}
        {/* FOOTER NOTE */}
        {/* ====================== */}
        <div className="text-center mt-16">
          <p className="text-xs text-slate-400 font-mono">
            Permanence over perfection • Legacy over novelty
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;