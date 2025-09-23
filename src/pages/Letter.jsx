import React, { useState, useRef } from "react";

const Letter = () => {
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startY = useRef(0);

  // 터치 시작
  const handleTouchStart = (e) => {
    setDragging(true);
    startY.current = e.touches[0].clientY;
  };

  // 터치 이동
  const handleTouchMove = (e) => {
    if (!dragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = startY.current - currentY;

    if (deltaY > 0) {
      setDragOffset(deltaY); // 손가락 따라 편지가 올라옴
    }
  };

  // 터치 종료
  const handleTouchEnd = () => {
    const threshold = 100;
    if (dragOffset > threshold) {
      setOpen(true); // 모달 열기
    }
    setDragging(false);
    setDragOffset(0); // 원위치 복귀
  };

  return (
    <>
      <div className="wrapper">
        <div className="lid one"></div>
        <div className="lid two"></div>
        <div className="envelope"></div>
        <div
          className="letter"
          style={{
            transform: `translateY(${-dragOffset}px)`,
            transition: dragging ? "none" : "transform 0.3s ease",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <p>📩 손가락으로 위로 올려보세요</p>
        </div>
      </div>

      {open && (
        <div className="letter-fullscreen">
          <div className="letter-content">
            <button className="close-btn" onClick={() => setOpen(false)}>
              닫기
            </button>
            <p>
              Dear Friend, <br />
              🎉 드래그해서 연 편지입니다 🎉
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Letter;
