import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Timeline from './Timeline';
import Location from './Location';
import DetailsSection from './DetailsSection';
import GiftsSection from './GiftsSection';
import FlyingBirds from './FlyingBirds';

export default function Invitation({ weddingData }) {
    if (!weddingData) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-wedding-sand overflow-x-hidden pb-10"
        >
            <Hero weddingData={weddingData} />

            <div className="relative z-10 -mt-20 bg-wedding-sand rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pt-0 overflow-hidden">
                <Location weddingData={weddingData} />
                <Timeline weddingData={weddingData} />
                <DetailsSection />
                <GiftsSection />

                {/* Footer */}
                <footer className="text-center mt-20 pb-10 text-stone-400 text-sm font-light">
                    <h2 className="font-script text-3xl mb-4 text-wedding-gold-dark">
                        {weddingData.groom} & {weddingData.bride}
                    </h2>
                    <p>Nous espérons vous voir bientôt</p>
                </footer>
            </div>

        </motion.div>
    );
}
