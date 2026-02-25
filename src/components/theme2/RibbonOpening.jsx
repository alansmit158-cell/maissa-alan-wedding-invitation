import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RibbonOpening({ onOpen, onMusicStart, wedding }) {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = () => {
        // 1. Play Music immediately on user interaction (Click)
        if (onMusicStart) onMusicStart();

        // 2. Start Animation
        setIsOpened(true);

        // 3. Delay content switch
        setTimeout(() => {
            if (onOpen) onOpen();
        }, 1500);
    };

    return (
        <div className="h-[100dvh] w-full relative overflow-hidden bg-[#FAFAF8]">

            {/* --- HIDDEN CONTENT (Invitation Preview) --- 
                Visible underneath as the curtains open.
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <motion.div
                    initial="hidden"
                    animate={isOpened ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                delay: 0.2,
                                duration: 1,
                                staggerChildren: 0.4
                            }
                        }
                    }}
                    className="text-center p-10 h-full w-full flex flex-col justify-center items-center bg-white/50 backdrop-blur-sm border border-wedding-gold/20"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                        <p className="font-serif text-[#8A9A5B] tracking-[0.3em] uppercase text-xs mb-6">Bienvenue au mariage de</p>
                    </motion.div>

                    <motion.h1
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 1.5 } } }}
                        className="font-script text-6xl sm:text-7xl text-[#3A4D39] mb-4 drop-shadow-sm"
                    >
                        {wedding ? `${wedding.groom} & ${wedding.bride}` : 'Pedro & Julia'}
                    </motion.h1>

                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                        <div className="w-16 h-[1px] bg-[#8A9A5B] mx-auto mb-4 opacity-50"></div>
                        <p className="font-serif text-wedding-gold-dark italic text-lg mb-2">{wedding ? wedding.formattedDate : '15 Juin 2026'}</p>
                        <p className="font-sans text-stone-400 text-xs tracking-widest uppercase">{wedding ? wedding.location : 'Tunisie'}</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- LEFT RIBBON (Curtain) --- */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full z-10"
                initial={{ x: 0 }}
                animate={isOpened ? { x: "-50%" } : { x: 0 }} // Move cleanly off-screen
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} // Custom elegant cubic-bezier
                style={{
                    clipPath: "inset(0 49.9% 0 0)" // Shows left half + 0.1% overlap to fix gap line
                }}
            >
                <img
                    src="/ribbon.png"
                    alt="Ruban Gauche"
                    className="w-full h-full object-cover"
                />
                {/* Overlay shadow for depth when closed */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* --- RIGHT RIBBON (Curtain) --- */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full z-10"
                initial={{ x: 0 }}
                animate={isOpened ? { x: "50%" } : { x: 0 }} // Move cleanly off-screen
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    clipPath: "inset(0 0 0 49.9%)" // Shows right half + 0.1% overlap to fix gap line
                }}
            >
                <img
                    src="/ribbon.png"
                    alt="Ruban Droit"
                    className="w-full h-full object-cover"
                />
                {/* Overlay shadow */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* --- TRIGGER BUTTON (Invisible Knot) --- */}
            {!isOpened && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                    <button
                        onClick={handleOpen}
                        className="w-32 h-32 rounded-full cursor-pointer outline-none tap-highlight-transparent relative"
                        aria-label="Ouvrir le ruban"
                    >
                        {/* Visual hint (optional, subtle pulse) */}
                        <span className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></span>
                    </button>

                    {/** Text Hint Animated */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                        className="absolute top-[80px] text-white/90 font-serif italic text-sm tracking-widest whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none"
                    >
                        Touchez le nœud
                    </motion.span>
                </div>
            )}

        </div>
    );
}

// CSS Utility for 'tap-highlight-transparent' should be in index.css, mostly -webkit-tap-highlight-color: transparent;
