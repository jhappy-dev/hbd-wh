import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GraphemeSplitter from 'grapheme-splitter';

function Home() {
  const navigate = useNavigate();

  const fullMessage = `똑 똑👀  
놀랐지? 이게 뭘까~~~~?  
바로바로바로!!  
우혁이를 위한 깜짝 생일 페이지지롱 - ̗̀ෆ⎛˶’ᵕ‘˶ ⎞ෆ ̖́-
뭐가 준비돼 있을지 궁금하지?  
힌트는... 사랑 듬뿍 담긴 선물들이라는 거야 (｡•̀ᴗ-)✧  
재밌게 구경할 준비 됐어?  
그럼 아래 버튼 눌러서 순서대로 구경해봐 💙 `;

  const [typedMessage, setTypedMessage] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const typingSpeed = 70;

  useEffect(() => {
    const splitter = new GraphemeSplitter();
    const chars = splitter.splitGraphemes(fullMessage);
    let index = 0;

    const interval = setInterval(() => {
      setTypedMessage((prev) => prev + chars[index]);
      index++;

      if (index === chars.length-1) {
        clearInterval(interval);
        setIsTypingDone(true); // ✅ 타이핑이 끝났을 때 true로
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <img src="img/banner.png" className="banner-image" alt="배너" />
      <p
        style={{
          whiteSpace: 'pre-line',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        {typedMessage}
      </p>

      {/* ✅ 타이핑이 끝났을 때만 버튼 보이게 */}
      {isTypingDone && (
        <div className="button-group fade-in">
          <button onClick={() => navigate('/hbd-wh/about')}>1.🎁</button>
          <button onClick={() => navigate('/hbd-wh/present')}>2. 🎈</button>
          <button onClick={() => navigate('/hbd-wh/letter')}>3. 💌</button>
        </div>
      )}
    </div>
  );
}

export default Home;
