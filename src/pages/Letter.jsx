import { useState } from "react";

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [nickname, setNickname] = useState("");
  const [showLetter, setShowLetter] = useState(false);

  const correctAnswer = ["마눌", "갈릭", "garlic"];

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
      setShowPopup(false);
      setShowLetter(true);
    } else {
      alert("애칭이 틀렸어! 다시 생각해봐 🥺");
    }
  };

  return (
    <>
      <div className="envlope-wrapper">
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

      {/* 편지 내용 */}
      {showLetter && (
        <div className="letter-modal-bg">
          <div className="letter-modal">
            <button className="close-btn" onClick={() => setShowLetter(false)}>
              닫기
            </button>
            <p>
              우혁이 안녕~ 음성 편지는 처음이라 너무 떨린다 ㅎㅎ<br />
              내가 준비한 편지는 잘 읽었어? 전에 우혁이가 내 사이트도 만들어줘! 했던 게 생각이 나서, 이번에는 생일사이트를 만들어봤어! <br />
              우리 1000일 넘게 지내면서 어떤 추억들이 있었는지 같이 보면 좋을 것 같았는데, 어때? 되돌아보면 우리 항상 풋풋했던 것 같아. <br />
              아직도 너무 보고싶고, 붙어있고 싶고, 서로 꽁냥꽁냥 행복한 걸 보면 말이야~ <br/>
              우리가 살아온 환경이 다르다보니 다투는 날들도 많지만, 나는 그래도 우혁이를 너무 사랑하고 우혁이랑 있으면 행복해!!! <br />
              1000일 때 편지에도 적었지만, 싸우면 힘들고 슬프고 그렇지만 그 과정에서 우리가 분명 서로를 이해하고, 더 가까워지고 있을거라고 생각해! 의견이 좁혀지지 않아도 그 과정에서 서로 싫어하는 걸 알게되고 이해해보려고 하니까! <br/>
              우리 지금까지 행복했던 것처럼 앞으로도 행복한 날들이 가득하면 좋겠어. 태어나줘서 고맙고, 잘 커서 내 옆에 와줘서 고맙고, 항상 내 옆에 있어줘서 고마워 ♡ <br/>
              우혁이 생일 내가 제일 축하하고, 내가 많이많이 사랑해~
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Letter;
