import React, { useState, useEffect } from 'react';
import '../page/css/something.css';
import waxSeal from './assets/Wax Seal Button.svg';
import image4 from './assets/image 4.svg';
import group19 from './assets/Group 19.png';

function Something({ onProceed }) {
  const [step, setStep] = useState('idle');

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e) => {
      if (step === 'letter2_open' && e.deltaY > 0) {
        closeLetter2AndProceed();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (step === 'letter2_open') {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY; // positif jika swipe up (scroll ke bawah)

        if (deltaY > 50) { // Threshold 50px
          closeLetter2AndProceed();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, onProceed]);

  const closeLetter2AndProceed = () => {
    setStep('letter2_closing');
    setTimeout(() => {
      setStep('done'); // amplop tetap terbuka, semua letter masuk
      if (onProceed) onProceed();
    }, 1000); // durasi animasi close letter2
  };

  const handleEnvelopeClick = () => {
    if (step === 'idle') {
      setStep('letter1_open');
    }
  };

  const handleLetter1Click = (e) => {
    e.stopPropagation();
    if (step === 'letter1_open') {
      setStep('letter1_closing');
      setTimeout(() => {
        setStep('letter2_open');
      }, 1000); // tunggu animasi menutup selesai sebelum buka letter 2
    }
  };

  const isLocked = step !== 'idle' && step !== 'done';
  const lockFinal = step === 'done';

  return (
    <div className="something-body">
     <div className={`wrapper ${isLocked || lockFinal ? 'locked' : ''}`}>
      <div className="lid one"></div>
      <div className="lid seal">
        <img src={waxSeal} className="wax-seal-img" alt="Wax Seal" />
      </div>
      <div className="lid two"></div>
      <div className="lid three"></div>
      <div 
        className="envelope" 
        onClick={handleEnvelopeClick}
        style={{ cursor: step === 'idle' ? 'pointer' : 'default', pointerEvents: step === 'idle' ? 'auto' : 'none' }}
      ></div>
      <div className={`letter letter2 ${step === 'letter2_open' ? 'extracted' : ''} ${step === 'letter2_closing' ? 'closing' : ''}`}>
        <img src={group19} className="group19-img" alt="Group 19" />
      </div>
      <div 
        className={`letter letter1 ${step === 'letter1_open' ? 'extracted' : ''} ${step === 'letter1_closing' ? 'closing' : ''}`}
        onClick={handleLetter1Click}
        style={{ 
          cursor: step === 'letter1_open' ? 'pointer' : 'default',
          pointerEvents: step === 'letter1_open' ? 'auto' : 'none' 
        }}
      >
        <div className="letter-content">
          <div className="letter-left">
            <h1 className="happy-text">Happy</h1>
            <h2 className="sweet-text">Sweet</h2>
            <img src={image4} className="balloon-img" alt="17" />
            <p className="bottom-text">My Dear Joy &lt;3</p>
          </div>
          <div className="letter-right">
            <p className="message-text">
              From the bottom of my heart, I write this letter without using any LLM. My dear <strong>Raisya Aprilia Khairunisa</strong>, may you enjoy your <strong>17th</strong> birthday. I hope many good things happen to you from now and furthermore. I’m so proud of you for surviving until now. Your very existence means a lot to me, my dear Raisya. May you achieve all of your dreams, goals, and the future you always wished for.
            </p>
            <p className="message-text tight-money">
              I couldn’t give much give this year since money is so tight, fuck.
            </p>
            <p className="sincerely-text">Sincerely, -H</p>
          </div>
        </div>
      </div>
     </div>
     
     {step === 'letter2_open' && (
       <div className="swipe-up-text">Swipe Up!</div>
     )}
    </div>
  );
}

export default Something;
