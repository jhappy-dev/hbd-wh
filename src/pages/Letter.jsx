import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Letter = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [nickname, setNickname] = useState("");
  const [showLetter, setShowLetter] = useState(false);

  const correctAnswer = ["마눌", "갈릭", "GARLIC"];

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    // 애니메이션 (flap + heart) 끝난 후 팝업 등장
    setTimeout(() => {
      setShowPopup(true);
    }, 1800); // Dribbble 효과가 약 1.6초
  };

  const checkAnswer = () => {
    if (correctAnswer.includes(nickname.trim().toUpperCase())) {
      navigate("/hbd-wh/letter-content");   // << 새로운 URL로 이동
    } else {
      alert("애칭이 틀렸어! 다시 생각해봐 🥺");
    }
  };

  return (
    <>
      <div className="envlope-wrapper">
        <p
          style={{
            marginTop: "40px",
            textAlign: "center"
          }}
        >
          마지막으로 내가 준비한 편지를 읽어봐 👀 <br/>
          아래 편지지를 클릭하면 편지 볼 수 있어!
        </p>

        <div
          id="envelope"
          className={isOpen ? "open" : "close"}
          onClick={handleOpen}
        >
          <div className="front flap"></div>
          <div className="front pocket"></div>

          <div className="letter">
            <div className="words line1"></div>
            <div className="words line2"></div>
            <div className="words line3"></div>
            <div className="words line4"></div>
          </div>

          <div className="hearts">
            <div className="heart a1"></div>
            <div className="heart a2"></div>
            <div className="heart a3"></div>
          </div>
        </div>
      </div>

      {/* 비밀번호 팝업 */}
      {showPopup && (
        <div className="popup-bg">
          <div className="popup-box">
            <h4>우혁이가 불러주는 애칭 중에서 내가 제일 좋아하는 애칭은?</h4>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="애칭 입력"
            />
            <button onClick={checkAnswer}>편지 보기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Letter;
