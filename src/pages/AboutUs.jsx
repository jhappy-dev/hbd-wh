import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { gallery } from '../data.js';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const scrollRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  // 🆕 이미지 확대 모달 상태
  const [showImgModal, setShowImgModal] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeContentIdx, setActiveContentIdx] = useState(null); // 어떤 gallery 컨텐츠인지

  const handleCardClick = (index) => setSelectedIdx(index);
  const handleClose = () => setSelectedIdx(null);

  useEffect(() => {
    if (selectedIdx !== null) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          const parent = scrollRef.current.closest('.custom-gallery-card');
          if (parent) {
            const elementTop = scrollRef.current.offsetTop;
            const elementHeight = scrollRef.current.offsetHeight;
            const containerHeight = parent.offsetHeight;

            // 중앙 정렬: 요소 상단 위치 - (컨테이너 높이 - 요소 높이) / 2
            const scrollTop = elementTop - (containerHeight - elementHeight) / 2;

            parent.scrollTop = scrollTop;
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [selectedIdx]);

  // 🆕 이미지 클릭 → 확대 모달 열기
  const handleImageClick = (contentIdx, imgIdx) => {
    if (showImgModal && activeContentIdx === contentIdx && activeImgIdx === imgIdx) {
      // 이미 열려있는 같은 이미지 → 닫기
      setShowImgModal(false);
    } else {
      // 새로 열기
      setActiveContentIdx(contentIdx);
      setActiveImgIdx(imgIdx);
      setShowImgModal(true);
    }
  };

  const handleNextClick = () => { navigate('/hbd-wh/present');}

  return (
    <Container fluid className="aboutus-container bg-white rounded shadow-sm">
      <div
        className="aboutus-banner p-4 mb-0 position-relative"
      >
        <div className="d-flex align-items-start">
          {/* 왼쪽: 프로필 이미지 */}
          <div className="me-3">
            <img
              src="img/231014_1.jpg"
              alt="profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ccc',
                backgroundColor: '#fff',
              }}
            />
          </div>

          {/* 오른쪽: 텍스트 + 버튼 */}
          <div className="flex-grow-1 position-relative" style={{ width: '100%' }}>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              <div style={{marginBotton: '30px'}}>@woohyeok_love__jihyeon</div>
              <div>♥ 20230211 ~ing</div>
              <div>♥ 카드를 하나씩 눌러서</div>
              <div>♥ 우리의 추억을 구경해봐 (ง ˙˘˙ )ว</div>
            </div>
          </div>
        </div>
      </div>

      <hr/>
      <Row xs={3} sm={3} md={4} lg={5} xl={6} className="g-2">
        {gallery.map((item, idx) => (
          <Col key={idx}>
            <div className="flip-card" onClick={() => handleCardClick(idx)}>
              <Card className="border-0 bg-transparent p-0">
                <Card.Img variant="top" className="card-img-top" src={item.thumbnail} />
                <Card.Body>
                  <Card.Title className="fs-6 mb-1 text-start card-title">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-0 text-end">{item.date}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        show={selectedIdx !== null}
        onHide={handleClose}
        centered
        dialogClassName="gallery-dialog"
      >
        {selectedIdx !== null && (
          <Modal.Body
            className="custom-gallery-card position-relative"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: '1rem',
            }}
          >
            {/* ✕ 닫기 버튼 */}
            <div
              className="position-sticky top-0 d-flex justify-content-end z-3"
              style={{ background: 'none', paddingTop: '8px', paddingRight: '8px' }}
            >
              <Button
                variant="light"
                onClick={handleClose}
                style={{
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  boxShadow: '0 0 4px rgba(0,0,0,0.15)',
                }}
              >
                ✕
              </Button>
            </div>

            {/* 전체 리스트 렌더링 */}
            {gallery.map((item, idx) => (
              <div
                key={idx}
                ref={idx === selectedIdx ? scrollRef : null}
                className="mb-4 pb-4"
                style={{
                  scrollMarginTop: '12px',
                  borderBottom: 'none',
                  position: 'relative',
                }}
              >
                {/* 점선 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundImage:
                      'repeating-linear-gradient(to right, #F4C7D0 0px, #F4C7D0 5px, transparent 5px, transparent 15px)',
                  }}
                />

                {/* 카드 */}
                <div
                  className="gallery-card-wrapper mb-0"
                  style={{
                    border: '1px solid #FFF5F6',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  {/* 헤더 */}
                  <div
                    className="d-flex align-items-center mb-3 px-3 py-2"
                    style={{
                      margin: 0,
                      backgroundColor: '#FFF5F6',
                      borderBottom: '1px solid #eee',
                      borderRadius: '0px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundImage: item.icon ? `url(${item.icon})` : 'none',
                        backgroundColor: 'transparent',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        flexShrink: 0,
                      }}
                    />
                    <div className="ms-3">
                      <div className="fw-bold">{item.title}</div>
                      <div className="text-muted small">{item.date}</div>
                    </div>
                  </div>
                    
                  {/* 🖼 이미지 + 편지 내용 */}
                  <div className="px-3 pt-3 pb-2">
                    {item.images && item.images.length > 0 && (
                      <Row xs={3} sm={3} md={3} className="g-2 mb-3">
                        {item.images.map((imgSrc, i) => (
                          <Col key={i}>
                            <div
                              className="bg-white shadow-sm p-1 rounded"
                              style={{
                                border: '1px solid #eee',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                aspectRatio: '1 / 1',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleImageClick(idx, i)}
                            >
                              <img
                                src={imgSrc}
                                alt={`img-${i}`}
                                className="img-fluid"
                                style={{
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  width: '100%',
                                  aspectRatio: '1/1',
                                }}
                              />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}

                    <p className="text-body" style={{ whiteSpace: 'pre-line' }}>
                      {item.letter}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Modal.Body>
        )}
      </Modal>

      {/* 🆕 이미지 확대용 Modal */}
      {/* <Modal
        show={showImgModal}
        onHide={() => setShowImgModal(false)}
        size="md"   // lg → md
        centered
        dialogClassName="image-zoom-dialog"
      >   
        <Modal.Body
          className="p-0 d-flex justify-content-center align-items-center"
          style={{ 
            backgroundColor: 'white',
            height: '50vh' }}
        >
          {activeContentIdx !== null && (
            <Carousel
              activeIndex={activeImgIdx}
              onSelect={(i) => setActiveImgIdx(i)}
              interval={null}
              variant="dark"
              style={{
                      maxWidth: '250px',   // ✅ 여기에도 지정 가능
                      maxHeight: '70vh',
                      objectFit: 'contain',
                      padding: "20px"
                    }}
            >
              {gallery[activeContentIdx].images.map((imgSrc, i) => (
                <Carousel.Item key={i}>
                  <img
                    src={imgSrc}
                    alt={`zoom-${i}`}
                    className="d-block mx-auto"
                    style={{
                      maxHeight: '70vh',
                      objectFit: 'contain'
                    }}
                    onClick={() => setShowImgModal(false)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
      </Modal> */}
    </Container>
  );
}

export default AboutUs;
