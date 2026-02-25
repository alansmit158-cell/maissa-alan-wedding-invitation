import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = ({ wedding }) => {
    return (
        <div className={styles.heroContainer}>
            <motion.div
                className={styles.backgroundImage}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
            >
                <img src="/src/assets/venue.png" alt="Wedding Venue" />
                <div className={styles.overlay} />
            </motion.div>

            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <h1 className={styles.names}>{wedding.groom} & {wedding.bride}</h1>
                <p className={styles.date}>{wedding.formattedDate}</p>
                <p className={styles.location}>{wedding.location}</p>
            </motion.div>
        </div>
    );
};

export default Hero;
