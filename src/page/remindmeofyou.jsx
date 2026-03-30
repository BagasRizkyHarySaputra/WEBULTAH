import React, { useState, useRef } from 'react';
import './css/remindmeofyou.css';
import './css/remindmeofyou-corner.css';

function RemindMeOfYou() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartRef = useRef(null);

  const handlePointerDown = (clientX) => {
    touchStartRef.current = clientX;
  };

  const handlePointerUp = (clientX) => {
    if (touchStartRef.current === null || isAnimating) return;
    const deltaX = touchStartRef.current - clientX;
    
    // Geser ke kiri (deltaX > 50) -> next
    if (deltaX > 50 && activeIndex < 3) {
      changeSection(activeIndex + 1);
    } 
    // Geser ke kanan (deltaX < -50) -> prev
    else if (deltaX < -50 && activeIndex > 0) {
      changeSection(activeIndex - 1);
    }
    
    touchStartRef.current = null;
  };

  const changeSection = (index) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setIsAnimating(true);
    
    // Cooldown match animation duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="remindmeofyou-page-wrapper">
      <div className="remindmeofyou-sidebar-container">
        <div className="remindmeofyou-sidebar">
          <div className={`sidebar-item index0${activeIndex === 0 ? ' active' : ''}`} onClick={() => changeSection(0)} style={{cursor: 'pointer'}}>
            <div className={`sidebar-dot${activeIndex === 0 ? ' filled' : ''}`}></div>
            {activeIndex === 0 && <span className="sidebar-text">Song</span>}
          </div>
          <div className={`sidebar-item index1${activeIndex === 1 ? ' active' : ''}`} onClick={() => changeSection(1)} style={{cursor: 'pointer'}}>
            <div className={`sidebar-dot${activeIndex === 1 ? ' filled' : ''}`}></div>
            {activeIndex === 1 && <span className="sidebar-text">Char</span>}
          </div>
          <div className={`sidebar-item index2${activeIndex === 2 ? ' active' : ''}`} onClick={() => changeSection(2)} style={{cursor: 'pointer'}}>
            <div className={`sidebar-dot${activeIndex === 2 ? ' filled' : ''}`}></div>
            {activeIndex === 2 && <span className="sidebar-text">University</span>}
          </div>
          <div className={`sidebar-item index3${activeIndex === 3 ? ' active' : ''}`} onClick={() => changeSection(3)} style={{cursor: 'pointer'}}>
            <div className={`sidebar-dot${activeIndex === 3 ? ' filled' : ''}`}></div>
            {activeIndex === 3 && <span className="sidebar-text">Anjayyy</span>}
          </div>
        </div>
      </div>

      <div 
        className="remindmeofyou-body" 
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseUp={(e) => handlePointerUp(e.clientX)}
        onMouseLeave={(e) => {
          if (touchStartRef.current !== null) {
            handlePointerUp(e.clientX);
          }
        }}
      >
        <div className="remindmeofyou-corner left" />
        <div className="remindmeofyou-corner right" />

        <h1 className="remindmeofyou-title">
        Things That<br />Reminded Me of
      </h1>
      <div className="remindmeofyou-subtitle">You, anjay</div>
      
      <div className={`remindmeofyou-group17-wrap ${activeIndex === 0 ? 'active' : (prevIndex === 0 ? 'leaving' : 'hidden')}`}>
        <img
          src={require('./assets/Group 17.png')}
          alt="Group 17 decorative"
          className="remindmeofyou-group17"
        />
        <img
          src={isPlaying ? require('./assets/Group 14.png') : require('./assets/Polygon 2.png')}
          alt="Play Lalu Biru"
          className="remindmeofyou-playbtn"
          onClick={togglePlay}
          style={{ cursor: 'pointer' }}
        />
        
        <div className="remindmeofyou-scan-wrap">
          <img
            src={require('./assets/spcode-2AVGJteukNmXt6lxPSOz27 1.png')}
            alt="Spotify scan code"
            className="remindmeofyou-spcode"
          />
          <div className="remindmeofyou-scan-text">
            Scan if the play<br />button doesn’t<br />work
          </div>
        </div>
      </div>
      
      <div className={`remindmeofyou-extra-section ${activeIndex === 1 ? 'active' : (prevIndex === 1 ? 'leaving' : 'hidden')}`}>
        <img src={require('./assets/Group 16.png')} alt="Group 16" />
        <p className="section2-text1">Udah bangun<br/>atau masih<br/>koma?</p>
        <p className="section2-text2">I remember u<br/>simp over this<br/>grandpa...</p>
      </div>

      <div className={`remindmeofyou-extra-section ${activeIndex === 2 ? 'active' : (prevIndex === 2 ? 'leaving' : 'hidden')}`}>
        <img className="section3-img1" src={require('./assets/image 15.png')} alt="Group 16" />
        <p className="section3-text1">Lesgo gurll, there’s<br/>nothing holding u<br/>back from<br/>achieving your<br/>dream university.</p>
        <p className="section3-text2">Manifesting u got<br/>accepted into<br/>UGM!!</p>      
      </div>

      <div className={`remindmeofyou-extra-section ${activeIndex === 3 ? 'active' : (prevIndex === 3 ? 'leaving' : 'hidden')}`}>
        <p className="section4-text1">Yaudah lah, pokoknya gitu.<br/>Met Ultah,</p>
        <p className="section4-text2">nyet</p>
        <p className="section4-text3">Sincerely, -H</p>
      </div>

      <audio 
        ref={audioRef}
        src={require('./assets/Eleanor Whisper - Lalu Biru (SPOTISAVER).mp3')} 
        preload="auto" 
        onEnded={() => setIsPlaying(false)}
      />
      </div>
    </div>
  );
}

export default RemindMeOfYou;