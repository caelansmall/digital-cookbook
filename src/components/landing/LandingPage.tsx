import BackgroundCarousel from "./BackgroundCarousel";
import TitleCard from "./TitleCard";

function LandingPage() {
  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <BackgroundCarousel />

      <TitleCard />
    </div>
  );
};

export default LandingPage;
