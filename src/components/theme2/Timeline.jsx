import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock, Wine, Utensils, Music, Calendar, GlassWater,
    MapPin, Moon, Camera, Home, Image, Star, Heart, Cake, UtensilsCrossed
} from 'lucide-react';

const iconMap = {
    Clock, Wine, Utensils, Music, Calendar, GlassWater,
    MapPin, Moon, Camera, Home, Image, Star, Heart, Cake, UtensilsCrossed
};

// Timeline Item Component
const TimelineItem = ({ time, title, description, mapLink, icon: Icon, isLast }) => (
    <div className="flex gap-4 sm:gap-8 relative pb-12 last:pb-0 group">
        {/* Line */}
        {!isLast && (
            <div className="absolute left-[19px] sm:left-[27px] top-10 bottom-0 w-[1px] bg-wedding-gold/30"></div>
        )}

        {/* Icon Bubble */}
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border border-wedding-gold/30 flex items-center justify-center shrink-0 z-10 shadow-sm"
        >
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-wedding-gold-dark" />
        </motion.div>

        {/* Content */}
        <div className="pt-1 sm:pt-2 text-left flex-1">
            <span className="block font-serif text-wedding-gold-dark font-bold text-lg sm:text-xl mb-1">{time}</span>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="font-script text-2xl sm:text-3xl text-wedding-blue-roi">{title}</h4>
                    {description && <p className="text-gray-500 text-sm mt-1 leading-relaxed">{description}</p>}
                </div>
                {mapLink && (
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-wedding-blue-roi/5 text-wedding-blue-roi hover:bg-wedding-blue-roi/10 transition-colors shrink-0"
                        title="Voir sur Google Maps"
                    >
                        <MapPin className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    </div>
);

export default function Timeline({ weddingData }) {
    return (
        <div className="py-12 sm:py-20 px-4 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10 sm:mb-16"
            >
                <h3 className="text-3xl font-serif text-gray-800 mb-2">Programme de la journée</h3>
                <p className="text-gray-400 italic">Une journée inoubliable</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="pl-4 sm:pl-10"
            >
                {weddingData?.timeline?.map((event, idx) => (
                    <TimelineItem
                        key={idx}
                        time={event.time}
                        title={event.title}
                        description={event.description}
                        mapLink={event.mapLink}
                        icon={iconMap[event.iconName] || Clock}
                        isLast={idx === weddingData.timeline.length - 1}
                    />
                ))}
            </motion.div>
        </div>
    );
}
