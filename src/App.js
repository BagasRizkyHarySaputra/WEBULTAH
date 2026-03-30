import { useState, useRef, useEffect } from 'react';
import Something from './page/something';
import RemindMeOfYou from './page/remindmeofyou';

function App() {
  const [canScrollToNext, setCanScrollToNext] = useState(false);
  const nextSectionRef = useRef(null);

  useEffect(() => {
    if (!canScrollToNext) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Pastikan bisa scroll
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [canScrollToNext]);

  const handleProceedToNext = () => {
    setCanScrollToNext(true);
    // Tunggu render untuk elemen selanjutnya, lalu scroll pelan-pelan
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Kunci scroll body jika belum boleh ke next page
  return (
    <div style={{ minHeight: '100vh', background: '#FFFDF1' }}>
      <Something onProceed={handleProceedToNext} />
      {canScrollToNext && (
        <div ref={nextSectionRef}>
          <RemindMeOfYou />
        </div>
      )}
    </div>
  );
}

export default App;
