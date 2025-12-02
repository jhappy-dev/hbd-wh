import { useEffect, useRef, useState } from "react";
import { letterTimeline } from "../data.js";

const LetterContent = () => {
  const audioRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const audio = audioRef.current;

    const checkTime = () => {
      const current = audio.currentTime;

      // 현재 시간보다 작은 항목만 visible 처리
      const newVisibleIndexes = letterTimeline
        .map((item, index) => (current >= item.time ? index : null))
        .filter((v) => v !== null);

      setVisibleItems(newVisibleIndexes);
    };

    audio.addEventListener("timeupdate", checkTime);

    return () => {
      audio.removeEventListener("timeupdate", checkTime);
    };
  }, []);

  return (
    <div className="letter-content-page">
      <div className="audio-guide">
        <p>👇 소리 볼륨 올리고 아래 재생 버튼을 눌러봐! 👇</p>
      </div>

      {/* 🔊 오디오 플레이어 */}
      <div className="audio-player-wrapper">
        <audio
          ref={audioRef}
          src="audio/letter.m4a"
          controls
        />
      </div>

      <div className="timeline-container">
        {letterTimeline.map((item, i) =>
          visibleItems.includes(i) && (
            <div key={i} className="fade-in-block">
              {item.type === "text" && (
                <p className="letter-text">{item.content}</p>
              )}

              {item.type === "image" && (
                <div className={`row ${i % 2 === 0 ? "left" : "right"}`}>
                  <img src={`${item.src}`} loading="lazy" className="letter-image" alt="사진" />
                  <p className="text">{item.text}</p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LetterContent;