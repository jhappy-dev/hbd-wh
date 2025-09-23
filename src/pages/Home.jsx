import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GraphemeSplitter from 'grapheme-splitter';

function Home() {
  const navigate = useNavigate();

  const fullMessage = `똑똑 👀
테스트 홈페이지입니다.:D
이것저것 추가하는 중.:D
곧 완성되겠지...:D`; 

  const [typedMessage, setTypedMessage] = useState('');
  const typingSpeed = 70;

  useEffect(() => {
    const splitter = new GraphemeSplitter();
    const chars = splitter.splitGraphemes(fullMessage);

    let index = 0;

    const interval = setInterval(() => {
      if (index < chars.length) {
        setTypedMessage((prev) => {
          const next = prev + chars[index];
          console.log('추가 문자:', chars[index]); // 디버깅
          return next;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      { <img src="img/banner.png" className="banner-image" /> }
      <p
        style={{
          whiteSpace: 'pre-line',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        {typedMessage}
      </p>

      <button onClick={() => navigate('/test/about')}>1.🎁</button>
      <button onClick={() => navigate('/test/present')}>2. 🎈</button>
      <button onClick={() => navigate('/test/letter')}>3. 💌</button>
    </div>
  );
}

export default Home;
