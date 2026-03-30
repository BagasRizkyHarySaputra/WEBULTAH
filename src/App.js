import { useState, useRef } from 'react';
import Something from './page/something';
import RemindMeOfYou from './page/remindmeofyou';

function App() {
  const [canScrollToNext, setCanScrollToNext] = useState(false);
  const nextSectionRef = useRef(null);

  const handleProceedToNext = () => {
    setCanScrollToNext(true);
    // Tunggu render untuk elemen selanjutnya, lalu scroll pelan-pelan
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Kunci scroll body jika belum boleh ke next page
  return (
    <div style={{ minHeight: '100vh', background: '#FFFDF1', overflowY: canScrollToNext ? 'auto' : 'hidden', height: canScrollToNext ? 'auto' : '100vh' }}>
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
