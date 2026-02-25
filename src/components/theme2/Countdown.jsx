import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="py-12 sm:py-20 text-center px-4 w-full"
    >
        {children}
    </motion.div>
);

const calculateTimeLeft = () => {
    // 9th May 2026
    const targetDate = new Date("2026-04-18T16:00:00");
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
            heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            secondes: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timeUnits = [
        { label: 'Jours', value: timeLeft.jours },
        { label: 'Heures', value: timeLeft.heures },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Secondes', value: timeLeft.secondes },
    ];

    return (
        <Section>
            <div className="max-w-4xl mx-auto border-y border-[#D4AF37]/30 py-8 sm:py-12 relative mt-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-[#D4AF37]/30 px-6 py-1 text-wedding-blue-roi-dark tracking-widest text-[10px] sm:text-xs uppercase whitespace-nowrap rounded-full shadow-sm">
                    Le compte à rebours
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-12 font-serif">
                    {timeUnits.map((item, index) => (
                        <div key={item.label} className="flex flex-col items-center">
                            <span className="text-2xl sm:text-5xl font-bold text-[#D4AF37]">
                                {item.value || '0'}
                            </span>
                            <span className="text-[9px] sm:text-xs uppercase tracking-widest text-[#002366]/60 mt-1 sm:mt-2">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
