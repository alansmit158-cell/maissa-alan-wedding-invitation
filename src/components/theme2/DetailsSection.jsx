import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shirt, HelpCircle } from 'lucide-react';

const Section = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`py-12 sm:py-20 px-4 w-full ${className}`}
    >
        {children}
    </motion.div>
);

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-wedding-gold/20 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left gap-4 group"
            >
                <span className="font-serif text-lg text-gray-700 group-hover:text-wedding-gold-dark transition-colors">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-wedding-gold" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-gray-500 font-light leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function DetailsSection() {
    return (
        <Section>
            <div className="max-w-3xl mx-auto space-y-16">
                {/* Dress Code */}
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                        <Shirt className="w-8 h-8 text-wedding-blue-roi-dark" />
                    </div>
                    <h3 className="text-3xl font-serif text-gray-800 mb-8">Dress Code</h3>

                    <div className="grid sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/20">
                        <div>
                            <h4 className="font-script text-3xl text-wedding-blue-roi-dark mb-2">Général</h4>
                            <p className="text-gray-600">Bleu Royal, Bleu Ciel, Beige, Doré</p>
                        </div>
                        <div>
                            <h4 className="font-script text-3xl text-[#D4AF37] mb-2">Spécial Henné</h4>
                            <p className="text-gray-600">Robe Kabyle vivement souhaitée pour les photos</p>
                        </div>
                    </div>
                </div>

                {/* Gifts */}
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                        <HelpCircle className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-3xl font-serif text-gray-800 mb-4">Cadeaux</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-[#D4AF37]/10 p-8 max-w-xl mx-auto italic font-serif text-lg text-gray-700">
                        Une boîte aux lettres sera mise à disposition des mariés pour recevoir vos enveloppes.
                    </div>
                </div>
            </div>
        </Section>
    );
}
