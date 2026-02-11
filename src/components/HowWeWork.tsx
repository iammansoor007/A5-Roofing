import { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    useMotionValue
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================
// PREMIUM SVG ICONS
// ======================
const Icons = {
    Discovery: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12l4-4" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" fill="url(#iconGradient)" />
            <defs>
                <linearGradient id="iconGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Engineering: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3L19 2L22 5L17.7 9.3" stroke="url(#engineeringGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.3 17.7L5 22L2 19L6.3 14.7" stroke="url(#engineeringGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8L8 16" stroke="url(#engineeringGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
                <linearGradient id="engineeringGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Installation: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v20M2 12h20" stroke="url(#installationGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 4l16 16M4 20L20 4" stroke="url(#installationGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
                <linearGradient id="installationGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Quality: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" stroke="url(#qualityGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="qualityGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Support: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22z" stroke="url(#supportGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12h8M12 8v8" stroke="url(#supportGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
                <linearGradient id="supportGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Legacy: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16v16H4V4z" stroke="url(#legacyGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 8h8v8H8V8z" stroke="url(#legacyGradient)" strokeWidth="1.5" />
            <defs>
                <linearGradient id="legacyGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Stats: {
        Projects: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="4" height="12" stroke="url(#statGradient)" strokeWidth="1.5" />
                <rect x="10" y="5" width="4" height="15" stroke="url(#statGradient)" strokeWidth="1.5" />
                <rect x="17" y="2" width="4" height="18" stroke="url(#statGradient)" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="statGradient" x1="3" y1="2" x2="21" y2="20">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Years: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="url(#yearsGradient)" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" stroke="url(#yearsGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="yearsGradient" cx1="3" cy1="3" cx2="21" cy2="21">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Satisfaction: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" stroke="url(#satGradient)" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="satGradient" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        Warranty: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v7c0 5.5 10 8 10 8s10-2.5 10-8V7l-10-5z" stroke="url(#warrantyGradient)" strokeWidth="1.5" />
                <path d="M12 6v6l3 2" stroke="url(#warrantyGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                    <linearGradient id="warrantyGradient" x1="2" y1="2" x2="22" y2="22">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                </defs>
            </svg>
        )
    },
    Flow: {
        Discovery: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="white" strokeWidth="1.5" />
                <path d="M12 8v4l3 3" stroke="white" strokeWidth="1.5" />
            </svg>
        ),
        Planning: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M8 2v4M16 2v4M3 10h18" stroke="white" strokeWidth="1.5" />
            </svg>
        ),
        Execution: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M14.7 6.3L19 2L22 5L17.7 9.3" stroke="white" strokeWidth="1.5" />
                <path d="M9.3 17.7L5 22L2 19L6.3 14.7" stroke="white" strokeWidth="1.5" />
                <path d="M16 8L8 16" stroke="white" strokeWidth="1.5" />
            </svg>
        ),
        Delivery: () => (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    }
};

// ======================
// CINEMATIC BACKGROUND ORBS
// ======================
const CinematicBackground = () => (
    <div className="absolute inset-0 pointer-events-none">
        {/* Deep Space Grid */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #2563eb20 1px, transparent 1px),
                    linear-gradient(to bottom, #2563eb20 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }}
        />

        {/* Quantum Orbs */}
        <motion.div
            animate={{
                x: [0, 40, 0, -40, 0],
                y: [0, -30, 40, 30, 0],
                scale: [1, 1.2, 1, 1.1, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 -left-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
            animate={{
                x: [0, -50, 0, 50, 0],
                y: [0, 40, -30, -40, 0],
                scale: [1, 1.3, 1, 1.2, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 -right-20 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-3xl"
        />
        <motion.div
            animate={{
                x: [0, 30, -30, 20, 0],
                y: [0, -40, 30, -20, 0],
                scale: [1, 1.1, 1.2, 1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl"
        />

        {/* Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                animate={{ y: ['0%', '1000%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                animate={{ y: ['-100%', '900%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Gradient Fades */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-blue-50/30 to-transparent" />
    </div>
);

// ======================
// PREMIUM PROCESS STEP COMPONENT
// ======================
const ProcessStep = ({ step, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 40, damping: 8, mass: 0.3 });
    const springY = useSpring(y, { stiffness: 40, damping: 8, mass: 0.3 });

    const rotateX = useTransform(springY, [-0.4, 0.4], [4, -4]);
    const rotateY = useTransform(springX, [-0.4, 0.4], [-4, 4]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
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

    // Progress circle animation
    const circleProgress = useMotionValue(0);
    const springProgress = useSpring(circleProgress, { stiffness: 50, damping: 15 });

    useEffect(() => {
        if (isHovered) {
            circleProgress.set(1);
        } else {
            circleProgress.set(0);
        }
    }, [isHovered]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformPerspective: 2000
            }}
            className="relative group"
        >
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-blue-200/50 hover:border-blue-400 transition-all duration-700 overflow-hidden shadow-2xl hover:shadow-blue-500/20 p-8 md:p-10">

                {/* Quantum Gradient Background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-white to-white pointer-events-none"
                    animate={{
                        opacity: isHovered ? 1 : 0.6,
                        background: isHovered
                            ? 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.08), transparent 80%)'
                            : 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.02), transparent 80%)'
                    }}
                    transition={{ duration: 0.6 }}
                />

                {/* Animated Border with Gradient */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.rect
                        x="2"
                        y="2"
                        width="calc(100% - 4px)"
                        height="calc(100% - 4px)"
                        fill="none"
                        stroke="url(#stepGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="12 12"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isHovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                        <linearGradient id="stepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Floating Particles */}
                {isHovered && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full z-30"
                                style={{
                                    background: i % 2 === 0 ? '#3b82f6' : '#2563eb',
                                    boxShadow: `0 0 10px ${i % 2 === 0 ? '#3b82f6' : '#2563eb'}`,
                                }}
                                initial={{
                                    x: '50%',
                                    y: '50%',
                                    scale: 0,
                                    opacity: 0.8
                                }}
                                animate={{
                                    x: [`50%`, `${15 + (i * 10)}%`],
                                    y: [`50%`, `${10 + (i * 12)}%`],
                                    scale: [0, 2.5, 0],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.12,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Content */}
                <div className="relative z-20">

                    {/* Step Number with Animated Circle */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="relative">
                            {/* Animated Progress Ring */}
                            <svg width="80" height="80" className="absolute -top-4 -left-4">
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    fill="none"
                                    stroke="#2563eb"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    style={{
                                        pathLength: springProgress,
                                        rotate: -90,
                                        scale: 1,
                                    }}
                                    className="opacity-20"
                                />
                                <motion.circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    fill="none"
                                    stroke="url(#stepGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    style={{
                                        pathLength: springProgress,
                                        rotate: -90,
                                        scale: 1,
                                    }}
                                />
                            </svg>

                            {/* Step Number */}
                            <motion.span
                                className="relative text-6xl md:text-7xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent"
                                animate={isHovered ? { scale: 1.15, y: -8, x: 5 } : { scale: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {step.number}
                            </motion.span>

                            {/* Glow Effect */}
                            <motion.div
                                className="absolute -inset-3 bg-blue-500/30 rounded-full blur-xl"
                                animate={{ scale: isHovered ? 1.5 : 0.8, opacity: isHovered ? 0.4 : 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>

                        {/* Duration Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                            className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-4 py-2 rounded-full border border-blue-200 shadow-lg"
                        >
                            <span className="text-xs font-black tracking-wider text-blue-700">
                                {step.duration}
                            </span>
                        </motion.div>
                    </div>

                    {/* Title with Icon */}
                    <div className="flex items-center gap-4 mb-4">
                        <motion.div
                            animate={isHovered ? {
                                rotate: 360,
                                scale: 1.2,
                            } : {
                                rotate: 0,
                                scale: 1
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-blue-600"
                        >
                            {step.icon}
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {step.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-base leading-relaxed mb-6">
                        {step.description}
                    </p>

                    {/* Feature List - Animated Reveal */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 border-t border-blue-200">
                            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-700 mb-4">
                                Key Deliverables
                            </h4>
                            <ul className="space-y-3">
                                {step.deliverables.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex items-center gap-2 text-sm text-slate-600"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.button
                        className="flex items-center gap-3 mt-6 text-blue-700 group/btn"
                        whileHover={{ x: 8 }}
                    >
                        <span className="text-xs font-black tracking-[0.2em] uppercase">
                            Explore Process
                        </span>
                        <motion.div
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-lg"
                            animate={isHovered ? {
                                x: 5,
                                boxShadow: "0 10px 25px rgba(37,99,235,0.4)"
                            } : {
                                x: 0,
                                boxShadow: "0 5px 15px rgba(37,99,235,0.2)"
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </motion.button>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-blue-300/30 group-hover:border-blue-500/50 transition-all duration-700" />
                <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-blue-300/30 group-hover:border-blue-500/50 transition-all duration-700" />
            </div>
        </motion.div>
    );
};

// ======================
// PREMIUM STATS CARD
// ======================
const StatCard = ({ value, label, icon, delay }) => {
    const ref = useRef(null);
    const [displayValue, setDisplayValue] = useState(0);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;

        let startTime;
        const duration = 2500;
        const start = 0;
        const end = parseInt(value);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * eased);
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(end);
            }
        };

        requestAnimationFrame(animate);
    }, [inView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
        >
            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-200/50 p-6 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-xl opacity-50" />
                        <div className="relative text-blue-600">
                            {icon}
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
                            {displayValue}+
                        </div>
                        <div className="text-xs font-bold tracking-wider text-slate-500 mt-1">
                            {label}
                        </div>
                    </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1), transparent 70%)",
                    }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
};

// ======================
// QUANTUM PROCESS FLOW
// ======================
const QuantumProcessFlow = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative py-24">
            {/* Quantum Energy Line */}
            <svg
                className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block"
                style={{ height: '100%' }}
            >
                <motion.line
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    stroke="url(#quantumFlow)"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    style={{
                        pathLength: lineProgress,
                        opacity: lineProgress
                    }}
                />
                <defs>
                    <linearGradient id="quantumFlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6">
                            <animate attributeName="stopColor" values="#3b82f6;#2563eb;#1e40af;#3b82f6" dur="5s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Flow Nodes */}
            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-12">
                {[
                    { number: "01", label: "Discovery", icon: <Icons.Flow.Discovery />, desc: "Architectural immersion" },
                    { number: "02", label: "Engineering", icon: <Icons.Flow.Planning />, desc: "Precision calculus" },
                    { number: "03", label: "Execution", icon: <Icons.Flow.Execution />, desc: "Artisanal mastery" },
                    { number: "04", label: "Legacy", icon: <Icons.Flow.Delivery />, desc: "Eternal stewardship" }
                ].map((node, i) => {
                    const nodeProgress = useTransform(
                        scrollYProgress,
                        [i * 0.25, (i + 1) * 0.25],
                        [0, 1]
                    );

                    const scale = useSpring(nodeProgress, { stiffness: 60, damping: 20 });
                    const opacity = useSpring(nodeProgress, { stiffness: 60, damping: 20 });

                    return (
                        <motion.div
                            key={node.number}
                            style={{ scale, opacity }}
                            className="relative group"
                        >
                            {/* Energy Ring */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700" />

                            {/* Node */}
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl shadow-blue-600/40">
                                        <span className="text-white">
                                            {node.icon}
                                        </span>
                                    </div>

                                    {/* Pulse Rings */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                                        animate={{
                                            scale: [1, 1.4, 1],
                                            opacity: [0.6, 0, 0.6]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            delay: i * 0.3
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-blue-300"
                                        animate={{
                                            scale: [1, 1.8, 1],
                                            opacity: [0.4, 0, 0.4]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.4
                                        }}
                                    />
                                </div>

                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-700 mb-2">
                                    PHASE {node.number}
                                </span>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">
                                    {node.label}
                                </h4>
                                <p className="text-sm text-slate-500">
                                    {node.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// ======================
// CRYSTAL CTA BANNER - WITH GRADIENT EFFECT
// ======================
const CrystalCTABanner = () => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-40 rounded-3xl overflow-hidden"
    >
        {/* Quantum Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950" />

        {/* Animated Crystal Grid */}
        <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                    <pattern id="crystal-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="url(#crystalGradient)" strokeWidth="0.5" />
                    </pattern>
                    <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#crystal-grid)" />
            </svg>
        </div>

        {/* Floating Energy Orbs */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                animate={{
                    x: [0, 30, 0, -30, 0],
                    y: [0, -20, 30, 20, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -40, 20, 40, 0],
                    y: [0, 30, -20, -30, 0],
                    scale: [1, 0.9, 1.3, 1, 1],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
            />
        </div>

        {/* Scanning Line */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                animate={{ y: ['0%', '1000%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Content */}
        <div className="relative px-8 py-20 md:px-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 z-30">
            <div className="max-w-2xl">
                <motion.div
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(59,130,246,0.3)",
                            "0 0 40px rgba(59,130,246,0.6)",
                            "0 0 20px rgba(59,130,246,0.3)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
                >
                    INITIATE YOUR<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300">
                        LEGACY PROTOCOL
                    </span>
                </motion.div>

                <p className="text-blue-200/90 text-lg md:text-xl leading-relaxed">
                    Your vision, our engineering. Together we forge structures that transcend generations.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 bg-white text-blue-900 text-xs font-black tracking-[0.25em] uppercase rounded-full overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        COMMISSION
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-transparent border-2 border-white/30 text-white text-xs font-black tracking-[0.25em] uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-500 backdrop-blur-sm"
                >
                    VIEW MANIFESTO
                </motion.button>
            </div>
        </div>

        {/* Crystal Corner Accents */}
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-white/30 rounded-tl-3xl" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-white/30 rounded-br-3xl" />
    </motion.div>
);

// ======================
// MAIN HOW WE WORK SECTION
// ======================
const HowWeWork = () => {
    const sectionRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const processSteps = [
        {
            number: "01",
            title: "Discovery & Consultation",
            duration: "2-3 Days",
            icon: <Icons.Discovery />,
            description: "We don't just consult—we immerse. Our team deploys advanced site intelligence and structural psychology to decode your vision at the molecular level.",
            deliverables: [
                "Quantum site analysis",
                "Structural DNA mapping",
                "Material alchemy selection",
                "Reality capture (3D twin)"
            ]
        },
        {
            number: "02",
            title: "Precision Engineering",
            duration: "5-7 Days",
            icon: <Icons.Engineering />,
            description: "Where science becomes art. Our engineers sculpt digital twins with sub-millimeter accuracy, pushing the boundaries of what's structurally possible.",
            deliverables: [
                "Parametric modeling",
                "Load calculus optimization",
                "Generative design iterations",
                "Performance simulation"
            ]
        },
        {
            number: "03",
            title: "Artisanal Execution",
            duration: "Varies",
            icon: <Icons.Installation />,
            description: "Masters of the craft. Our certified artisans execute with surgical precision, transforming digital blueprints into tangible magnificence.",
            deliverables: [
                "Zero-defect installation",
                "Real-time QA telemetry",
                "Craft documentation",
                "Precision certification"
            ]
        },
        {
            number: "04",
            title: "Intelligent Assurance",
            duration: "Ongoing",
            icon: <Icons.Quality />,
            description: "Perfection is measured, not assumed. Our multi-spectral inspection protocol ensures every detail exceeds industry benchmarks.",
            deliverables: [
                "Holographic scanning",
                "Structural integrity verification",
                "Performance validation",
                "Legacy documentation"
            ]
        },
        {
            number: "05",
            title: "Eternal Support",
            duration: "25 Yrs",
            icon: <Icons.Support />,
            description: "Our commitment transcends installation. We offer predictive maintenance and lifetime stewardship of your structural asset.",
            deliverables: [
                "Predictive maintenance AI",
                "24/7 guardian response",
                "Annual deep diagnostics",
                "Material lifecycle tracking"
            ]
        },
        {
            number: "06",
            title: "Legacy Forging",
            duration: "∞",
            icon: <Icons.Legacy />,
            description: "We build for centuries. Your project becomes part of our heritage archive—a testament to timeless engineering.",
            deliverables: [
                "Heritage certification",
                "Historical documentation",
                "Future-proof engineering",
                "Legacy vault preservation"
            ]
        }
    ];

    const stats = [
        { value: "2500", label: "Projects Manifested", icon: <Icons.Stats.Projects /> },
        { value: "17", label: "Years of Mastery", icon: <Icons.Stats.Years /> },
        { value: "100", label: "Precision Index", icon: <Icons.Stats.Satisfaction /> },
        { value: "25", label: "Legacy Warranty", icon: <Icons.Stats.Warranty /> }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !isClient) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cinematic-reveal',
                { y: 70, opacity: 0, rotateX: 10 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "expo.out",
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
            className="relative bg-white overflow-hidden py-32 md:py-40"
        >
            {/* Cinematic Background */}
            <CinematicBackground />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">

                {/* ====================== */}
                {/* SECTION HEADER - COSMIC */}
                {/* ====================== */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-4xl mx-auto mb-20 cinematic-reveal"
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                        <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-700">
                            ENGINEERING ALCHEMY
                        </span>
                        <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 via-blue-500 to-transparent" />
                    </div>

                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-[-0.03em] mb-8">
                        HOW WE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
                            MANIFEST
                        </span>
                    </h2>

                    <p className="text-slate-600 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                        A meticulously orchestrated symphony of science and artistry —
                        transforming architectural vision into eternal reality.
                    </p>

                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-12 rounded-full" />
                </motion.div>

                {/* ====================== */}
                {/* QUANTUM STATS GRID */}
                {/* ====================== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            icon={stat.icon}
                            delay={0.2 + index * 0.15}
                        />
                    ))}
                </div>

                {/* ====================== */}
                {/* QUANTUM PROCESS FLOW */}
                {/* ====================== */}
                <QuantumProcessFlow />

                {/* ====================== */}
                {/* PROCESS STEPS GRID */}
                {/* ====================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                    {processSteps.map((step, index) => (
                        <ProcessStep key={step.number} step={step} index={index} />
                    ))}
                </div>

                {/* ====================== */}
                {/* CRYSTAL CTA BANNER */}
                {/* ====================== */}
                <CrystalCTABanner />
            </div>

            {/* ====================== */}
            {/* QUANTUM ENERGY WAVE */}
            {/* ====================== */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
                <svg
                    viewBox="0 0 1440 120"
                    className="relative block w-full h-20 md:h-24"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="url(#quantumWave)"
                        d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
                    />
                    <defs>
                        <linearGradient id="quantumWave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
};

export default HowWeWork;