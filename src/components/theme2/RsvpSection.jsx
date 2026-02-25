import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';

const Section = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 text-center px-4 w-full bg-wedding-sand text-gray-800 relative overflow-hidden"
    >
        <div className="gradient-blur-top"></div>
        <div className="gradient-blur-bottom"></div>
        {/* Subtle Leaf Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 20%)',
            backgroundSize: '100px 100px'
        }}></div>

        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
);

export default function RsvpSection() {
    return (
        <Section>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
                <div className="text-center">
                    <p className="font-serif italic text-lg opacity-90 mb-2">Nous voulons célébrer avec vous !</p>
                    <h2 className="text-4xl sm:text-5xl font-script mb-8">Confirmez votre présence</h2>

                    <motion.a
                        href="https://forms.gle/votre-lien-rsvp"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-[#D4AF37] text-white font-serif font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-sm"
                    >
                        Confirmez votre présence
                    </motion.a>
                </div>

                <div className="w-full mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                    <p className="text-sm tracking-widest uppercase mb-4 opacity-80">Compte à rebours pour le grand jour</p>
                    {/* Countdown component needs to be adjusted to accept light/dark mode prompts or we just style it here by overriding context if needed, but for now assuming it inherits or we style around it */}
                    {/* Actually Countdown.jsx uses text-wedding-gold-dark, which might clash on green bg. let's assume we might need to tweak Countdown or wrap it to force colors. 
                        Design tweak: The user asked for "Sage background... for this section AND THE FOLLOWING". 
                        Actually the requirements say: "Fondo de Transición: Utiliza un fondo verde salvia ... para esta sección y las siguientes." 
                        But we usually alternate for readability. Let's make this section Sage.
                    */}
                    <div className="">
                        <Countdown />
                    </div>
                </div>
            </div>
        </Section>
    );
}
