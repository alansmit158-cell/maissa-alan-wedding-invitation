import { motion } from 'framer-motion';
import styles from './InfoSection.module.css';

const InfoSection = ({ welcomeLocation }) => {
    return (
        <section className={styles.container}>
            <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2>Bienvenue</h2>
                <p>
                    Nous sommes ravis de vous convier à célébrer notre union civile au {welcomeLocation}.
                    Cette journée sera l'occasion de réunir nos familles et nos amis les plus proches
                    pour créer des souvenirs inoubliables. Votre présence est le plus beau cadeau que
                    vous puissiez nous faire.
                </p>
            </motion.div>

            <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2>Code Vestimentaire</h2>
                <p className={styles.emphasis}>Tenue de Gala Demandée</p>
                <p>
                    Nous vous invitons à revêtir vos plus belles tenues.
                    Pour les messieurs, smoking ou costume sombre.
                    Pour les dames, robe longue ou de cocktail chic.
                    Prévoyez des chaussures confortables pour la cérémonie dans les jardins.
                </p>
            </motion.div>

            <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2>Cadeaux</h2>
                <p>
                    Votre présence à nos côtés est le plus beau des cadeaux.
                    Si toutefois vous souhaitez nous gâter, une urne sera mise à votre disposition
                    le jour J pour participer à notre voyage de noces au Japon.
                </p>
            </motion.div>
        </section>
    );
};

export default InfoSection;
