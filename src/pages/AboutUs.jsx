import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { gallery } from '../data.js';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const scrollRef = useRef(null);
  const modalScrollRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  // 🆕 이미지 확대 모달 상태
  const [showImgModal, setShowImgModal] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeContentIdx, setActiveContentIdx] = useState(null);

  // =========================================================
  // ✅ 3행(12개) 단위 페이징 세팅
  // =========================================================
  const chunkSize = 12;
  const chunkedGallery = [];
  for (let i = 0; i < gallery.length; i += chunkSize) {
    chunkedGallery.push(gallery.slice(i, i + chunkSize));
  }

  // ✅ 메인 화면 페이징 상태
  const [page, setPage] = useState(1);

  // ✅ 모달 내부 페이징 상태
  const [modalPage, setModalPage] = useState(1);

  // ✅ 현재 메인 화면에서 보여줄 데이터
  const visibleCards = chunkedGallery.slice(0, page).flat();

  // ✅ 현재 모달 내부에서 보여줄 데이터
  const modalVisibleItems = chunkedGallery.slice(0, modalPage).flat();

  // =========================================================
  // ✅ 메인 화면 페이징: 스크롤 감지
  // =========================================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setPage(prev => {
          if (prev < chunkedGallery.length) return prev + 1;
          return prev;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chunkedGallery.length]);

  // =========================================================
  // ✅ 모달 열릴 때 modalPage 초기화
  // =========================================================
  useEffect(() => {
    if (selectedIdx !== null) {
      setModalPage(1);
    }
  }, [selectedIdx]);

  // =========================================================
  // ✅ 모달 내부 페이징: 스크롤 감지
  // =========================================================
  useEffect(() => {
    if (!modalScrollRef.current) return;

    const handleModalScroll = () => {
      const el = modalScrollRef.current;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        setModalPage(prev => {
          if (prev < chunkedGallery.length) return prev + 1;
          return prev;
        });
      }
    };

    const el = modalScrollRef.current;
    el.addEventListener('scroll', handleModalScroll);
    return () => el.removeEventListener('scroll', handleModalScroll);
  }, [chunkedGallery.length]);

  // =========================================================
  // ✅ 기존 로직: 카드 클릭/모달 스크롤 중앙 정렬
  // =========================================================
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

            const scrollTop = elementTop - (containerHeight - elementHeight) / 2;
            parent.scrollTop = scrollTop;
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [selectedIdx]);

  // =========================================================
  // ✅ 이미지 클릭 → 확대 모달
  // =========================================================
  const handleImageClick = (contentIdx, imgIdx) => {
    if (showImgModal && activeContentIdx === contentIdx && activeImgIdx === imgIdx) {
      setShowImgModal(false);
    } else {
      setActiveContentIdx(contentIdx);
      setActiveImgIdx(imgIdx);
      setShowImgModal(true);
    }
  };

  const handleNextClick = () => navigate('/hbd-wh/present');

  return (
    <Container fluid className="aboutus-container bg-white rounded shadow-sm">
      <div className="aboutus-banner p-4 mb-0 position-relative">
        <div className="d-flex align-items-start">
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

          <div className="flex-grow-1 position-relative" style={{ width: '100%' }}>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              <div style={{ marginBotton: '30px' }}>@woohyeok_love__jihyeon</div>
              <div>♥ 20230211 ~ing</div>
              <div>♥ 카드를 하나씩 눌러서</div>
              <div>♥ 우리의 추억을 구경해봐 (ง ˙˘˙ )ว</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* ✅ 3행씩 페이징된 카드 목록 */}
      <Row xs={4} sm={4} md={6} lg={6} xl={6} className="g-2">
        {visibleCards.map((item, idx) => (
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

      {/* ✅ 상세 모달 */}
      <Modal
        show={selectedIdx !== null}
        onHide={handleClose}
        centered
        dialogClassName="gallery-dialog"
      >
        {selectedIdx !== null && (
          <Modal.Body
            ref={modalScrollRef}
            className="custom-gallery-card position-relative"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: '1rem',
            }}
          >
            {/* 닫기 버튼 */}
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

            {/* ✅ 모달 내부도 페이징된 목록만 렌더링 */}
            {modalVisibleItems.map((item, idx) => (
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

                  {/* 이미지 + 편지 */}
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
    </Container>
  );
}

export default AboutUs;