import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const TeaserReel = () => {
    const [showCooking, setShowCooking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" },
                audio: true
            });

            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.onstop = handleStop;

            mediaRecorderRef.current.start();
            setIsRecording(true);

            // Re-trigger animation if desired, or just let user record current state
            // setShowCooking(false); setTimeout(() => setShowCooking(true), 100);

        } catch (err) {
            console.error("Error starting recording:", err);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            // Also stop tracks to clear the red recording dot faster
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleDataAvailable = (e) => {
        if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
        }
    };

    const handleStop = () => {
        const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm"
        });
        recordedChunksRef.current = []; // Clear for next time

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "wedding-teaser.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Sequence the animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCooking(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#3A4D39', // Sage Green
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            color: '#ECE3CE', // Cream
            fontFamily: '"Cormorant Garamond", serif',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '56.25vh', // 9:16 aspect ratio constraint
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'radial-gradient(circle at center, #4F6F52 0%, #3A4D39 100%)',
            }}>

                {/* Decorative Circles */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        border: '1px solid rgba(236, 227, 206, 0.2)',
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        border: '1px solid rgba(236, 227, 206, 0.1)',
                    }}
                />

                {/* Text Animations */}
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            fontSize: '2rem',
                            fontWeight: 300,
                            marginBottom: '1rem',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Quelque Chose de Spécial
                    </motion.h2>

                    {showCooking && (
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2 }}
                            style={{
                                fontSize: '3.5rem',
                                fontWeight: 600,
                                color: '#FFD700', // Goldish
                                margin: 0,
                                lineHeight: 1.1,
                                background: 'linear-gradient(45deg, #FFD700, #FDB931)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Se Prépare...
                        </motion.h1>
                    )}
                </div>

                {/* Simulated Video Content */}
                {showCooking && (
                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        width: '85%',
                        zIndex: 10
                    }}>
                        {/* 1. Code Simulation (Typewriter Effect) */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                width: '100%',
                                background: '#1e1e1e',
                                borderRadius: '8px',
                                border: '1px solid #D4AF37',
                                padding: '15px',
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                color: '#d4d4d4',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                overflow: 'hidden',
                                height: '120px',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <TypewriterCode />
                        </motion.div>

                        {/* 2. Execution Simulation (Flashing Effect) */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            style={{
                                width: '100%',
                                height: '120px',
                                background: '#000',
                                borderRadius: '8px',
                                border: '1px solid #D4AF37',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <PulsingEffect />
                            <div style={{ position: 'relative', zIndex: 2, color: '#D4AF37', fontWeight: 'bold', letterSpacing: '2px' }}>
                                CHARGEMENT...
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        fontSize: '1.2rem',
                        letterSpacing: '0.2em',
                        opacity: 0.8
                    }}
                >
                    RESTEZ À L'ÉCOUTE
                </motion.div>

                {/* Recording Button Interface */}
                <div style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 100
                }}>
                    {!isRecording ? (
                        <button
                            onClick={handleStartRecording}
                            style={{
                                padding: '10px 20px',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: '1px solid #D4AF37',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontFamily: 'var(--font-serif)'
                            }}
                        >
                            <span style={{ width: 10, height: 10, background: 'red', borderRadius: '50%' }}></span>
                            REC
                        </button>
                    ) : (
                        <button
                            onClick={handleStopRecording}
                            style={{
                                padding: '10px 20px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-serif)'
                            }}
                        >
                            STOP & SAUVEGARDER
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

// Helper Component: Simulates typing code
const TypewriterCode = () => {
    const codeString = `const Mariage = () => {
  const [amour, setAmour] = useState(true);
  
  return (
    <PourToujours
       partenaire="Toi"
       date="2026"
    />
  );
};`;

    const [text, setText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(codeString.slice(0, i));
            i++;
            if (i > codeString.length) {
                i = 0; // Loop it
                // setTimeout(() => setText(''), 1000); 
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.2' }}>
            <span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#4ec9b0' }}>Mariage</span> = () ={'>'} {'{'}
            <br />
            {text.split('\n').filter((_, index) => index > 0).map((line, idx) => (
                <div key={idx}>{line}</div>
            ))}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ borderRight: '2px solid white', marginLeft: '2px' }}
            />
        </div>
    );
};

// Helper Component: Simulates execution/flashing
const PulsingEffect = () => {
    return (
        <>
            <motion.div
                animate={{
                    scale: [1, 2, 3],
                    opacity: [0.8, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%)',
                }}
            />
            <motion.div
                animate={{
                    background: ['radial-gradient(circle, #000 20%, #333 100%)', 'radial-gradient(circle, #111 20%, #444 100%)', 'radial-gradient(circle, #000 20%, #333 100%)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}
            />
        </>
    )
}

export default TeaserReel;
