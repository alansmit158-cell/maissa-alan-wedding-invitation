import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './Envelope.module.css';

const Envelope = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Trigger parent callback after animation starts
    setTimeout(onOpen, 800);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
    >
      <motion.div
        className={styles.envelopeWrapper}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src="/src/assets/envelope.png"
          alt="Wedding Envelope"
          className={styles.envelopeImage}
          animate={isOpening ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.instruction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Appuyez pour ouvrir
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Envelope;
