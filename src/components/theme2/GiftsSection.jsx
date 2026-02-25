import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function GiftsSection() {
    return (
        <div className="py-24 px-4 bg-white text-gray-800 text-center relative overflow-hidden">
            <div className="gradient-blur-top"></div>
            <div className="gradient-blur-bottom"></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
            >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Gift className="w-8 h-8 text-wedding-gold-dark" />
                </div>
                <h3 className="text-4xl font-script mb-6 text-wedding-blue-roi-dark">Cadeaux</h3>
                <p className="font-serif text-lg leading-relaxed mb-8">
                    Votre présence est notre plus beau cadeau. <br />
                    Une boîte aux lettres sera mise à disposition des mariés le jour J pour recevoir vos enveloppes.
                </p>

                <div className="inline-block p-6 border border-[#D4AF37]/30 rounded-lg bg-white/40 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-widest opacity-70">En vous remerciant de tout coeur</p>
                    <p className="font-script text-2xl mt-2 text-[#D4AF37]">Maïssa & Alan</p>
                </div>
            </motion.div>
        </div>
    );
}
