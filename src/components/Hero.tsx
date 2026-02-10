import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/mainbg.webp";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Manual scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate manual parallax values
  const manualParallaxY = Math.min(scrollY * 0.5, 200);
  const manualScale = 1 + Math.min(scrollY * 0.0003, 0.03);

  // Optimized scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Instant-response transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Preload and set loaded state
  useEffect(() => {
    const img = new Image();
    img.src = heroBg;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    img.onload = () => {
      setImageLoaded(true);
      setIsLoaded(true);
      clearTimeout(timer);
    };

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Minimal Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="w-10 h-10 border-2 border-foreground/10 rounded-full" />
              <div className="absolute inset-0 w-10 h-10 border-2 border-transparent border-t-accent rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-end overflow-hidden bg-primary"
      >
        {/* Background with DUAL parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              transform: `translate3d(0, ${manualParallaxY}px, 0) scale(${manualScale})`,
              willChange: 'transform'
            }}
          >
            <img
              src={heroBg}
              alt="Luxury architectural roofing"
              className={`w-full h-[110%] object-cover object-center absolute -top-[5%] transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Animated gradient overlay */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent md:bg-gradient-to-r md:from-primary/90 md:via-primary/60 md:to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-rose-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
          </div>

          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated floating elements */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div
            className="absolute top-[20%] right-[15%] w-16 h-16 md:w-20 md:h-20 border border-foreground/5 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[10%] w-12 h-12 border border-accent/10 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          />
        </div>

        {/* Main Content - Reduced gaps for larger screens */}
        <div
          ref={containerRef}
          className="section-padding w-full relative z-10 pb-12 md:pb-16 lg:pb-20 pt-16 md:pt-20 lg:pt-24 h-screen flex items-center"
        >
          <motion.div
            style={{ opacity: contentOpacity }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="md:max-w-2xl lg:max-w-3xl  mx-auto md:mx-0">
              {/* Badge - Reduced bottom margin */}
              <motion.div
                className="inline-flex  items-center gap-2 mb-4 md:mb-6 px-4 py-2 bg-accent/10 backdrop-blur-lg border border-accent/20 rounded-full mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--accent)/0.15)" }}
              >
                <motion.div
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-foreground/90 text-xs uppercase tracking-[0.3em] font-medium">
                  Architectural Excellence
                </span>
              </motion.div>

              {/* Headline - Reduced bottom margin */}
              <div className="mb-4 md:mb-6 text-center md:text-left">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7.5xl font-heading font-bold leading-[0.95] md:leading-[0.92] tracking-tight text-foreground"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="block mb-[-0.05em]">Architectural</span>
                  <span className="block mb-[-0.05em] text-accent">Mastery in</span>
                  <span className="block">Every Detail</span>
                </motion.h1>
              </div>

              {/* Subtitle - Reduced bottom margin */}
              <motion.p
                className="text-foreground/80 max-w-xl md:max-w-lg text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Where precision engineering meets timeless design. Award-winning craftsmanship since 2008.
              </motion.p>

              {/* Modern CTA Buttons - Reduced bottom margin and gap */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-3 mb-8 md:mb-10 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {/* Primary CTA */}
                <motion.a
                  href="#contact"
                  className="group relative overflow-hidden px-6 py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 
                           bg-gradient-to-r from-accent to-accent/80 text-primary font-heading 
                           font-semibold text-sm sm:text-base tracking-tight rounded-xl
                           inline-flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-accent/20"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(var(--accent)/0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent via-accent-light to-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    Begin Consultation
                    <motion.svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <path
                        d="M5 10H15M15 10L10 5M15 10L10 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="#portfolio"
                  className="group relative overflow-hidden px-6 py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 
                           border-2 border-foreground/20 text-foreground font-heading 
                           font-semibold text-sm sm:text-base tracking-tight rounded-xl
                           inline-flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm
                           hover:border-accent/50 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    Explore Portfolio
                    <motion.svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      initial={{ rotate: -45 }}
                      whileHover={{ rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </span>

                  <motion.div
                    className="absolute inset-0 bg-accent/5"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>

              {/* Modern Statistics - Reduced top padding and gaps */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 pt-6 md:pt-8 
                         border-t border-foreground/10 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {[
                  {
                    num: "300+",
                    label: "Projects",
                    suffix: "",
                    accent: true,
                    description: "Premium"
                  },
                  {
                    num: "99.8",
                    label: "Satisfaction",
                    suffix: "%",
                    accent: false,
                    description: "Client Rate"
                  },
                  {
                    num: "16",
                    label: "Years",
                    suffix: "+",
                    accent: false,
                    description: "Experience"
                  },
                  {
                    num: "50+",
                    label: "Awards",
                    suffix: "",
                    accent: false,
                    description: "Industry"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center md:text-left group cursor-pointer"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-baseline justify-center md:justify-start gap-0.5">
                      <span className={`font-heading text-2xl sm:text-2.5xl md:text-3xl font-bold ${stat.accent ? 'text-accent' : 'text-foreground'}`}>
                        {stat.num}
                      </span>
                      {stat.suffix && (
                        <span className="text-foreground/60 text-base sm:text-lg">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-foreground/70 text-sm font-medium tracking-wide mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-foreground/50 text-xs font-mono tracking-wide hidden sm:block mt-0.5">
                      {stat.description}
                    </div>

                    {/* Animated underline - smaller */}
                    <motion.div
                      className={`h-0.5 w-5 mx-auto md:mx-0 mt-1.5 ${stat.accent ? 'bg-accent' : 'bg-foreground/20'}`}
                      initial={{ width: 5 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator - Reduced size */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-px h-10 bg-gradient-to-b from-accent via-foreground/40 to-transparent"
                  animate={{
                    height: ["10px", "40px", "10px"],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.span
                  className="font-mono text-xs text-foreground/50 tracking-[0.4em] mt-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  SCROLL
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile Scroll Indicator */}
        {isLoaded && (
          <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <motion.div
                className="w-1 h-6 bg-gradient-to-b from-accent to-transparent rounded-full"
                animate={{
                  height: ["6px", "20px", "6px"],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <span className="font-mono text-[10px] text-foreground/40 tracking-widest mt-1">
                EXPLORE
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;