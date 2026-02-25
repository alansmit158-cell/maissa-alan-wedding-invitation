import React from 'react';
import { motion } from 'framer-motion';

const Bird = ({ delay, duration, startY, endY, size, direction = 'ltr' }) => {
    const isRtl = direction === 'rtl';

    return (
        <motion.div
            initial={{
                x: isRtl ? "115vw" : "-15vw",
                y: startY,
                opacity: 0
            }}
            animate={{
                x: isRtl ? "-15vw" : "115vw",
                y: endY,
                opacity: [0, 1, 1, 0]
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
            }}
            className="fixed pointer-events-none z-[100]"
        >
            <img
                src="/Bird Soar Sticker by Ashley Longshore.gif"
                alt="Bird"
                style={{
                    width: size,
                    transform: isRtl ? 'scaleX(-1)' : 'none',
                    mixBlendMode: 'multiply'
                }}
                className="drop-shadow-sm"
            />
        </motion.div>
    );
};

export default function FlyingBirds() {
    const birds = [
        // Left to Right
        { id: 1, delay: 0, duration: 6, startY: "20vh", endY: "30vh", size: 130, direction: 'ltr' },
        { id: 2, delay: 3, duration: 7, startY: "60vh", endY: "50vh", size: 90, direction: 'ltr' },
        { id: 3, delay: 6, duration: 9, startY: "10vh", endY: "15vh", size: 130, direction: 'ltr' },

        // Right to Left
        { id: 4, delay: 2, duration: 8, startY: "40vh", endY: "45vh", size: 100, direction: 'rtl' },
        { id: 5, delay: 5, duration: 8.5, startY: "80vh", endY: "70vh", size: 110, direction: 'rtl' },
        { id: 6, delay: 8, duration: 6.5, startY: "30vh", endY: "20vh", size: 95, direction: 'rtl' },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
            {birds.map(bird => (
                <Bird key={bird.id} {...bird} />
            ))}
        </div>
    );
}
