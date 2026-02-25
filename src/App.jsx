import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- THEME 2 IMPORTS ---
import RibbonOpening from './components/theme2/RibbonOpening';
import Invitation from './components/theme2/Invitation';
import MusicPlayer from './components/theme2/MusicPlayer';
import './Theme2Index.css';
import './Theme2App.css';

// --- THEME 1 IMPORTS ---
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import InfoSection from './components/InfoSection';
import MapSection from './components/MapSection';
import './App.css';

const weddingData = {
  id: "maissa-alan",
  bride: "Maïssa",
  groom: "Alan",
  date: "2026-04-18T16:00:00",
  formattedDate: "18 . 04 . 2026",
  location: "Besançon, France",
  welcomeLocation: "Mairie de Besançon & Salle d'Amagney",
  mapLocationName: "Mairie de Besançon",
  mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2716.4862423377707!2d6.0210!3d47.2371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478d629a4a4a4a4a%3A0x4a4a4a4a4a4a4a4a!2sMairie%20de%20Besan%C3%A7on!5e0!3m2!1sfr!2stn!4v1705660000000!5m2!1sfr!2stn",
  mapLinkInfo: "https://maps.google.com/?q=Mairie+de+Besancon",
  theme: "theme2", // Default theme
  timeline: [
    { time: "16h00", title: "Mairie de Besançon", iconName: "MapPin", description: "2 Rue Megevand, 25000 Besançon", mapLink: "https://www.google.com/maps/search/?api=1&query=Mairie+de+Besancon+2+Rue+Megevand+25000" },
    { time: "17h00", title: "Mosquée Saint-Claude", iconName: "Moon", description: "7 Rue Avicenne, 25000 Besançon", mapLink: "https://www.google.com/maps/search/?api=1&query=Grande+Mosquee+de+Besancon+7+Rue+Avicenne+25000" },
    { time: "17h30", title: "Photos à la Citadelle", iconName: "Camera", description: "99 Rue des Fusillés de la Résistance", mapLink: "https://www.google.com/maps/search/?api=1&query=Citadelle+de+Besancon+99+Rue+des+Fusilles+de+la+Resistance+25000" },
    { time: "18h30", title: "Salle d'Amagney", iconName: "Home", description: "Arrivée des mariés à Amagney", mapLink: "https://www.google.com/maps/search/?api=1&query=Salle+evenementielle+Amagney+25220" },
    { time: "18h40", title: "Entrée & Photos", iconName: "Image", description: "Entrée en salle et séance photos" },
    { time: "19h15", title: "Animation", iconName: "Star", description: "Jeu 'Les Z'amours'" },
    { time: "19h30", title: "Service Entrée", iconName: "Utensils", description: "Début du service à table" },
    { time: "20h00", title: "Ouverture du Bal", iconName: "Music", description: "Ouverture de la piste de danse" },
    { time: "21h00", title: "Plat Principal", iconName: "UtensilsCrossed", description: "Service du Couscous traditionnel" },
    { time: "21h45", title: "Henné & Kabyle", iconName: "Heart", description: "Cérémonie du Henné & Danse Kabyle" },
    { time: "22h30", title: "Dessert", iconName: "Cake", description: "Dessert et soirée dansante" }
  ],
  gifts: "Une boîte aux lettres sera mise à disposition des mariés pour recevoir vos enveloppes.",
  dressCode: {
    general: "Bleu Royal, Bleu Ciel, Beige, Doré",
    special: "Robe Kabyle vivement souhaitée pour les photos"
  }
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('theme2');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const introAudio = useRef(new Audio('/wedding.mp3'));
  const mainAudio = useRef(new Audio('/music.mp3'));

  useEffect(() => {
    introAudio.current.loop = true;
    mainAudio.current.loop = true;

    // Attempt Autoplay
    introAudio.current.play()
      .then(() => setIsPlaying(true))
      .catch(e => console.log("Autoplay blocked:", e));

    return () => {
      introAudio.current.pause();
      mainAudio.current.pause();
    };
  }, []);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'theme1' ? 'theme2' : 'theme1');
  };

  const handleOpen = () => {
    if (isPlaying) {
      const fadeDuration = 3000;
      const steps = 30;
      const intervalTime = fadeDuration / steps;
      mainAudio.current.volume = 0;
      mainAudio.current.play().catch(console.error);

      let currentStep = 0;
      const fadeInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        introAudio.current.volume = Math.max(0, 1 - progress);
        mainAudio.current.volume = Math.min(1, progress);

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          introAudio.current.pause();
          introAudio.current.currentTime = 0;
          introAudio.current.volume = 1;
        }
      }, intervalTime);
    }
    setIsEnvelopeOpen(true);
  };

  return (
    <>

      {currentTheme === 'theme2' ? (
        <>
          <MusicPlayer phase={isPlaying ? 'main' : 'intro'} />
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <RibbonOpening
                key="ribbon"
                wedding={weddingData}
                onOpen={handleOpen}
                onMusicStart={() => { if (!isPlaying) setIsPlaying(true); }}
              />
            ) : (
              <Invitation key="invitation" weddingData={weddingData} />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="bg-[#fffcf0] min-h-screen">
          <AnimatePresence>
            {!isEnvelopeOpen && (
              <div className="h-screen w-full flex items-center justify-center p-4">
                <button
                  onClick={handleOpen}
                  className="bg-[#002366] text-white px-8 py-4 rounded-full font-serif text-xl shadow-2xl hover:scale-105 transition-transform"
                >
                  Ouvrir l'Invitation
                </button>
              </div>
            )}
          </AnimatePresence>

          {isEnvelopeOpen && (
            <main>
              <Hero weddingData={weddingData} />
              <div className="relative z-20 bg-[#fffcf0] pb-20">
                <Countdown targetDate={weddingData.date} />
                <Timeline events={weddingData.timeline} />
                <InfoSection welcomeLocation={weddingData.welcomeLocation} />
                <MapSection
                  mapLocationName={weddingData.mapLocationName}
                  mapIframeSrc={weddingData.mapIframeSrc}
                  mapLinkInfo={weddingData.mapLinkInfo}
                />
              </div>
            </main>
          )}
        </div>
      )}
    </>
  );
}

export default App;
