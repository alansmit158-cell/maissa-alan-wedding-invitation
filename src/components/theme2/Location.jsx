import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const Section = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="py-12 sm:py-20 text-center px-4 w-full bg-white/50"
    >
        {children}
    </motion.div>
);

export default function Location({ weddingData }) {
    if (!weddingData) return null;
    return (
        <Section>
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
                <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto text-wedding-gold mb-4" />
                    <h3 className="text-4xl sm:text-5xl font-script text-wedding-blue-roi-dark mb-2">{weddingData.mapLocationName}</h3>
                    <p className="font-serif text-gray-600 text-lg">{weddingData.location}</p>
                    <p className="text-gray-500 font-light mt-1">{weddingData.welcomeLocation}</p>
                </div>

                {/* Map Container */}
                <div className="w-full h-64 sm:h-80 bg-[#e5e0d8] rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] relative group border border-white">
                    {weddingData.mapIframeSrc ? (
                        <iframe
                            src={weddingData.mapIframeSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Wedding Location Map"
                            className="absolute inset-0 w-full h-full object-cover"
                        ></iframe>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-center bg-no-repeat bg-contain transform scale-50 grayscale transition-all duration-700"></div>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 transition-opacity duration-300 opacity-90 hover:opacity-100">
                        <a
                            href={weddingData.mapLinkInfo}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/90 backdrop-blur text-wedding-gold-dark font-serif px-6 py-3 rounded-full shadow-lg border border-wedding-gold/20 flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <Navigation className="w-4 h-4" />
                            Ouvrir dans Maps
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    );
}
