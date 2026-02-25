import React from 'react';
import styles from './Timeline.module.css';
import { motion } from 'framer-motion';
import {
    Calendar, GlassWater, Utensils, Music,
    MapPin, Moon, Camera, Home, Image, Star, Heart, Cake, UtensilsCrossed
} from 'lucide-react';

const iconMap = {
    Calendar, GlassWater, Utensils, Music,
    MapPin, Moon, Camera, Home, Image, Star, Heart, Cake, UtensilsCrossed
};

const Timeline = ({ events }) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Programme</h2>
            <div className={styles.timeline}>
                {events.map((event, index) => (
                    <motion.div
                        className={styles.event}
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <div className={styles.timeColumn}>
                            <span className={styles.time}>{event.time}</span>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.contentColumn}>
                            <div className={styles.iconWrapper}>
                                {event.mapLink ? (
                                    <a href={event.mapLink} target="_blank" rel="noreferrer" title="Voir sur Google Maps">
                                        {iconMap[event.iconName] && React.createElement(iconMap[event.iconName], { size: 24, color: "#D4AF37" })}
                                    </a>
                                ) : (
                                    iconMap[event.iconName] && React.createElement(iconMap[event.iconName], { size: 24, color: "#D4AF37" })
                                )}
                            </div>
                            <h3 className={styles.title}>{event.title}</h3>
                            <p className={styles.description}>{event.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
