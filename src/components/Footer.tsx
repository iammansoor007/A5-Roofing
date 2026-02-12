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
// PREMIUM UNSplash IMAGES
// ======================
const Images = {
  Hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Pattern: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  Abstract: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
};

// ======================
// PREMIUM SVG ICONS
// ======================
const Icons = {
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h4v12H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8h4v2c.6-.8 1.5-2 3-2 2.5 0 4 1.5 4 4v8h-4v-6c0-1.5-.5-2-2-2s-2 .5-2 2v6h-4V8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.8 9 5-.2-2.2.6-4.5 2.5-6 2.5-2 6-1.5 7.5 1 1.1-.2 2.2-.6 3-1 0 0-.5 1.7-2 3 1.1-.1 2-.5 3-1 0 0-.5 1.6-2 3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  Location: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  ),
  Infinity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13.833 9.167C14.5 8.5 15.3 8 16.5 8C18.5 8 20 9.5 20 12C20 14.5 18.5 16 16.5 16C14.5 16 13 14.5 13 12C13 9.5 11.5 8 9.5 8C7.5 8 6 9.5 6 12C6 14.5 7.5 16 9.5 16C10.7 16 11.5 15.5 12.167 14.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// ======================
// CINEMATIC PARALLAX LAYER
// ======================
const ParallaxLayer = ({ children, speed = 0.05, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute inset-0 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ======================
// QUANTUM PARTICLE FIELD
// ======================
const QuantumParticles = () => {
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 0.5,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.2 + 0.05,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, -15, 10, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// ======================
// NEWSLETTER FORM
// ======================
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
                    relative flex items-center bg-white/5 backdrop-blur-sm rounded-full border transition-all duration-500
                    ${isFocused
            ? 'border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]'
            : 'border-white/10 hover:border-white/20'
          }
                `}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            Subscribe
            <Icons.ArrowRight />
          </motion.button>
        </div>
      </form>

      {/* Success Message */}
      <AnimatePresence>
        {isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-0 right-0 text-center"
          >
            <span className="text-xs text-blue-400">
              ✓ Thank you for subscribing
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ======================
// FOOTER LINK GROUP
// ======================
const FooterLinkGroup = ({ title, links }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <motion.a
              href={link.href}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-300 group"
            >
              <span className="text-[10px] text-blue-400/50 group-hover:text-blue-400 transition-colors">
                →
              </span>
              {link.label}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ======================
// STUDIO LOCATION
// ======================
const StudioLocation = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group"
    >
      <motion.div
        animate={isHovered ? {
          scale: 1.05,
          opacity: 0.1
        } : {
          scale: 1,
          opacity: 0.05
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 blur-2xl"
      />

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="text-blue-400/80">
            <Icons.Location />
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 mb-2">
              Principal Studio
            </h4>
            <p className="text-sm text-white/80 leading-relaxed mb-1">
              200 Park Avenue
            </p>
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              New York, NY 10166
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              View on map
              <Icons.ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ======================
// CONTACT INFO
// ======================
const ContactInfo = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
        Contact
      </h4>
      <div className="space-y-3">
        <a href="mailto:studio@a5roofing.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group">
          <span className="text-blue-400/70 group-hover:text-blue-400">
            <Icons.Mail />
          </span>
          studio@a5roofing.com
        </a>
        <a href="tel:+12125550170" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group">
          <span className="text-blue-400/70 group-hover:text-blue-400">
            <Icons.Phone />
          </span>
          +1 (212) 555-0170
        </a>
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="text-blue-400/70">
            <Icons.Infinity />
          </span>
          <span>24/7 Emergency Response</span>
        </div>
      </div>
    </div>
  );
};

// ======================
// SOCIAL LINKS
// ======================
const SocialLinks = () => {
  const socials = [
    { icon: Icons.Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Icons.Twitter, href: '#', label: 'Twitter' },
    { icon: Icons.Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          aria-label={social.label}
        >
          <social.icon />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      ))}
    </div>
  );
};

// ======================
// AWARDS GRID
// ======================
const AwardsGrid = () => {
  const awards = [
    { year: '2025', title: 'AIA National Honor Award', org: 'American Institute of Architects' },
    { year: '2024', title: 'Engineering Excellence Award', org: 'ACEC' },
    { year: '2023', title: 'Heritage Preservation Medal', org: 'National Trust' },
    { year: '2022', title: 'Innovation in Steel Design', org: 'AISC' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {awards.map((award, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
        >
          <span className="text-xs font-mono text-blue-400/80">{award.year}</span>
          <h5 className="text-sm font-medium text-white mt-2 mb-1">{award.title}</h5>
          <p className="text-[10px] text-white/50">{award.org}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ======================
// HORIZONTAL SCROLL MARQUEE
// ======================
const LegacyMarquee = () => {
  return (
    <div className="relative overflow-hidden py-8 border-t border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8">
            <span className="text-xs font-mono text-blue-400/40">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20">
              ENGINEERING A5 ROOFING
            </span>
            <span className="text-xs font-mono text-blue-400/40">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20">
              SINCE 2007
            </span>
            <span className="text-xs font-mono text-blue-400/40">
              <Icons.Sparkle />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-white/20">
              PERMANENCE OVER PERFECTION
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ======================
// MAIN FOOTER - AWARD WINNING
// ======================
const Footer = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const companyLinks = [
    { label: 'Studio', href: '/studio' },
    { label: 'Manifesto', href: '/manifesto' },
    { label: 'Process', href: '/process' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ];

  const servicesLinks = [
    { label: 'Residential', href: '/residential' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Heritage', href: '/heritage' },
    { label: 'Emergency', href: '/emergency' },
    { label: 'Consulting', href: '/consulting' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Licenses', href: '/licenses' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Ethics', href: '/ethics' },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <footer
      ref={sectionRef}
      className="relative bg-slate-950 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #0f1a2a, #030712)'
      }}
    >
      {/* ====================== */}
      {/* CINEMATIC BACKGROUND */}
      {/* ====================== */}

      {/* Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
                        `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-950/30 to-transparent opacity-60 blur-3xl" />

      {/* Parallax Layers */}
      <ParallaxLayer speed={0.03} className="z-0">
        <div className="absolute top-40 right-0 w-2/5 h-2/5">
          <img
            src={Images.Abstract}
            alt="Abstract architecture"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.05} className="z-0">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3">
          <img
            src={Images.Pattern}
            alt="Heritage pattern"
            className="w-full h-full object-cover opacity-[0.02]"
          />
        </div>
      </ParallaxLayer>

      {/* Quantum Particles */}
      <QuantumParticles />

      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-30">

        {/* ====================== */}
        {/* TOP SECTION */}
        {/* ====================== */}
        <div className="grid lg:grid-cols-2 gap-16 pt-24 pb-16 border-b border-white/10">

          {/* Left Column - Brand */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-600/30">
                  <span className="text-white font-bold text-xl">A5</span>
                </div>

              </div>

              <p className="text-white/60 text-base leading-relaxed max-w-md">
                Forging architectural permanence through precision engineering and uncompromising craftsmanship since 2007.
              </p>

              <SocialLinks />
            </motion.div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
                Subscribe to A5 roofing insights
              </h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Right Column - Studio Location & Contact */}
          <div className="grid md:grid-cols-2 gap-8">
            <StudioLocation />
            <ContactInfo />
          </div>
        </div>

        {/* ====================== */}
        {/* MIDDLE SECTION - LINKS */}
        {/* ====================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/10">
          <FooterLinkGroup title="Studio" links={companyLinks} />
          <FooterLinkGroup title="Services" links={servicesLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />

          {/* Certifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
              Certifications
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/40">
                  ISO
                </div>
                <span className="text-xs text-white/60">9001:2024</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/40">
                  LEED
                </div>
                <span className="text-xs text-white/60">Platinum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/40">
                  BREEAM
                </div>
                <span className="text-xs text-white/60">Outstanding</span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* AWARDS SECTION */}
        {/* ====================== */}
        <div className="py-16 border-b border-white/10">
          <div className="flex items-center gap-3 mb-10">
            <Icons.Sparkle />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50">
              Recognition
            </span>
          </div>
          <AwardsGrid />
        </div>

        {/* ====================== */}
        {/* LEGACY MARQUEE */}
        {/* ====================== */}
        <LegacyMarquee />

        {/* ====================== */}
        {/* BOTTOM BAR */}
        {/* ====================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 text-xs text-white/40">
          <div className="flex items-center gap-4">
            <span>© 2026 A5 Roofing</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* FINAL ENERGY WAVE */}
      {/* ====================== */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-20 md:h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#footerWave)"
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
          <defs>
            <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;