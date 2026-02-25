import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ weddingData }) {
    return (
        <div className="h-[100dvh] w-full relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">

            {/* Anti-Gravity Parallax Background */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <img
                    src="/bg-wedding.png"
                    alt="Ethereal Wedding"
                    className="w-full h-full object-cover animate-fade-in scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10"></div>
                <div className="absolute inset-0 bg-black/5"></div>
            </div>

            <div className="z-10 relative flex flex-col items-center w-full max-w-lg">
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white drop-shadow-md tracking-[0.2em] text-xs sm:text-sm uppercase mb-6 font-semibold bg-black/10 px-3 py-1 rounded-full backdrop-blur-[2px]"
                >
                    NOUS NOUS MARIONS
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-6xl sm:text-8xl font-script text-[#D4AF37] mb-4 leading-none mx-[-1rem]"
                    style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.2)' }}
                >
                    {weddingData?.groom} <img src="/image-removebg-preview (2).png" alt="&" className="inline-block h-10 sm:h-16 mx-2 sm:mx-4 align-middle object-contain" /> {weddingData?.bride}
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-[1px] bg-white/80 mx-auto my-8 shadow-lg relative flex justify-center items-center"
                >
                    <div className="w-2 h-2 rotate-45 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-3xl sm:text-4xl font-serif text-white drop-shadow-md italic"
                >
                    {weddingData?.formattedDate}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 z-10 animate-bounce cursor-pointer flex flex-col items-center gap-2"
            >
                <span className="text-white text-xs tracking-widest uppercase drop-shadow-md">Découvrir</span>
                <div className="w-[1px] h-8 bg-white/50"></div>
            </motion.div>
        </div>
    );
}
