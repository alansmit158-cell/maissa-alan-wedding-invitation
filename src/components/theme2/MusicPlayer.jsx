import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ phase }) {
    const introAudioRef = useRef(null);
    const mainAudioRef = useRef(null);

    const [muted, setMuted] = useState(false);

    useEffect(() => {
        const intro = introAudioRef.current;
        const main = mainAudioRef.current;

        if (!intro || !main) return;
        console.log("MusicPlayer Phase:", phase);

        if (phase === 'intro') {
            // Tentative de lecture automatique de l'intro au montage
            intro.volume = 0.6;
            const playPromise = intro.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Intro started playing");
                }).catch(error => {
                    console.log("Autoplay Intro prevented:", error);
                    // On ne fait rien, l'utilisateur devra cliquer pour le Main, qui est forcé
                });
            }
        } else if (phase === 'main') {
            // Lancement de la séquence Main avec Crossfade
            crossfadeToMain(intro, main);
        }
    }, [phase]);

    const crossfadeToMain = async (intro, main) => {
        try {
            console.log("Switching to Wedding Music...");

            // Assure-toi que main est prêt et volume 0
            main.volume = 0;
            // Force play (déclenché par un clic utilisateur normalement)
            await main.play();

            const fadeInterval = setInterval(() => {
                // Monte le volume de main
                if (main.volume < 0.6) {
                    main.volume = Math.min(main.volume + 0.05, 0.6);
                }

                // Descend le volume de intro (si elle jouait)
                if (intro && intro.volume > 0) {
                    intro.volume = Math.max(intro.volume - 0.05, 0);
                }

                // Fin si main est à fond et intro muet
                if (main.volume >= 0.6 && (!intro || intro.volume <= 0)) {
                    clearInterval(fadeInterval);
                    if (intro) intro.pause();
                }
            }, 200);

        } catch (err) {
            console.error("Main playback failed", err);
        }
    };

    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);
        if (introAudioRef.current) introAudioRef.current.muted = newMuted;
        if (mainAudioRef.current) mainAudioRef.current.muted = newMuted;
    };

    return (
        <>
            {/* Piste 1 : Intro (music.mp3) */}
            <audio ref={introAudioRef} loop preload="auto">
                <source src="/music.mp3" type="audio/mpeg" />
            </audio>

            {/* Piste 2 : Main Loop (wedding.mp3) */}
            <audio ref={mainAudioRef} loop preload="auto">
                <source src="/wedding.mp3" type="audio/mpeg" />
                {/* Fallback en ligne */}
                <source src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Pachelbel_Canon_in_D.ogg" type="audio/ogg" />
            </audio>

            <button
                onClick={toggleMute}
                className="fixed top-4 right-4 z-50 bg-white/100 backdrop-blur-md p-3 rounded-full shadow-2xl border border-[#D4AF37] hover:bg-[#D4AF37] transition-all group"
            >
                {muted ? <VolumeX className="text-gray-800 group-hover:text-white w-6 h-6" /> : <Volume2 className="text-gray-800 group-hover:text-white w-6 h-6" />}
            </button>
        </>
    );
}
