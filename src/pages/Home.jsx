import { useEffect, useState } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import confetti from 'canvas-confetti';
import bannerImg from '../assets/img/banner.png';

function Home() {
  const fullMessage = ` 똑똑👀  
놀랐지? 이게 뭘까~~~~?  
바로바로바로!!  
우혁이를 위한 깜짝 생일 페이지지롱 - ̗̀ෆ⎛˶’ᵕ‘˶ ⎞ෆ ̖́-
뭐가 준비돼 있을지 궁금하지?  
힌트는... 사랑 듬뿍 담긴 선물들이라는 거야 (｡•̀ᴗ-)✧  
재밌게 구경할 준비 됐어?  
그럼 위의 탭을 눌러서 순서대로 구경해봐 💙 `;

  const [typedMessage, setTypedMessage] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const typingSpeed = 70;

  useEffect(() => {
    // 🎆 폭죽 + 컨페티 발사
    confettiExplosion();

    // 3.5초 후 타이핑 시작
    const timer = setTimeout(() => {
      setShowTyping(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // 타이핑 애니메이션
  useEffect(() => {
    if (!showTyping) return;

    const splitter = new GraphemeSplitter();
    const chars = splitter.splitGraphemes(fullMessage);
    let index = 0;

    const interval = setInterval(() => {
      setTypedMessage((prev) => prev + chars[index]);
      index++;

      if (index === chars.length-1) {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [showTyping]);

  // 💥 폭죽 + 종이 조각 뿌리기 함수
  const confettiExplosion = () => {
    const duration = 1000; // 더 짧게
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 40,
        startVelocity: 25, 
        decay: 0.94,      
        scalar: 0.8, 
        origin: { x: 0 },
        colors: ['#FFD700', '#FF69B4', '#87CEFA'],
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 40,
        startVelocity: 25,
        decay: 0.94,
        scalar: 0.7,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF69B4', '#87CEFA'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };


  return (
    <div className="home-container">
      <img
        src={bannerImg}
        className="banner-image fade-in-banner"
        alt="배너"
      />
      <p
        style={{
          whiteSpace: 'pre-line',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        {typedMessage}
      </p>
    </div>
  );
}

export default Home;
