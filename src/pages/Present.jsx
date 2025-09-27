import React, { useState, useRef, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { present } from "../data";
import { useNavigate } from 'react-router-dom';

const Present = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // 시작 (빠른 전환 시작)
  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % present.length);
    }, 100);
  };

  // 멈춤
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const handleNextClick = () => { navigate('/hbd-wh/');}

  useEffect(() => {
    handleStart();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
        <div className="d-flex justify-content-end mb-4" style={{padding: "10px"}}>
          <Button onClick={handleNextClick} variant="secondary"> <span> → </span> 처음으로</Button>
        </div>
      <Container
        className="present-page"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",   // 수평 가운데
          justifyContent: "center", // 수직 가운데 (필요시)
          minHeight: "100vh",       // 화면 가운데 배치하려면
          textAlign: "center",
        }}
      >
        <div style={{
          marginBottom: '30px'
        }}>
          이번에는 선물을 고를 시간이야! <br/>
          닌텐도스위치2는 기본 선물이고, 서프라이즈로 하나 더 해주고싶어서 준비해봤어!  <br/>
          기회는 한 번 뿐이니까 신중하게 [Stop] 버튼 눌러봐 ㅎㅎ <br/>
          (실망스러운 것과 우와!! 하는 거 다양하게 있으니까 잘 골라보도록~)
        </div>
        <div
          className="present-card"
          style={{
            width: "200px",
            height: "300px",
            borderRadius: "12px",
            border: "2px solid #ccc",
            backgroundImage: `url(${present[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            margin: "0 auto", // 부모 안에서 가운데 정렬
          }}
        />

        <div className="mt-3">
          <button onClick={handleStop} disabled={!isRunning}>
            Stop
          </button>
        </div>
      </Container>
    </>
  );
};

export default Present;