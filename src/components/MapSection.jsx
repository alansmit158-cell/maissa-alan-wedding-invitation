import styles from './MapSection.module.css';
import { MapPin } from 'lucide-react';

const MapSection = ({ mapLocationName, mapIframeSrc, mapLinkInfo }) => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <MapPin size={32} color="#B2AC88" />
                <h2>Le Lieu</h2>
                <p>{mapLocationName}</p>
            </div>
            <div className={styles.mapWrapper}>
                <iframe
                    src={mapIframeSrc}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wedding Location"
                ></iframe>
            </div>
            <a
                href={mapLinkInfo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
            >
                Ouvrir dans Google Maps
            </a>
        </section>
    );
};

export default MapSection;
