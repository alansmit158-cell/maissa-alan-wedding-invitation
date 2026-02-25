import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
                heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                secondes: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div className={styles.timeUnit} key={interval}>
                <span className={styles.number}>{timeLeft[interval]}</span>
                <span className={styles.label}>{interval}</span>
            </div>
        );
    });

    return (
        <div className={styles.container}>
            <h2>Le Grand Jour</h2>
            <div className={styles.timer}>
                {timerComponents.length ? timerComponents : <span>C'est l'heure !</span>}
            </div>
        </div>
    );
};

export default Countdown;
