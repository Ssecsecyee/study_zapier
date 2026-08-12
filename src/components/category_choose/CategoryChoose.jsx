import React, { useState } from 'react';
import './CategoryChoose.css';

const SEARCH_CATEGORIES = [
  "맛집", "한식", "일식", "중식", "양식", "카페", 
  "분식", "치킨", "피자", "햄버거", "고기", "해산물"
];

const CATEGORY_ICONS = {
  "맛집": "⭐", "한식": "🍚", "일식": "🍣", "중식": "🥟",
  "양식": "🍝", "카페": "☕", "분식": "🍢", "치킨": "🍗",
  "피자": "🍕", "햄버거": "🍔", "고기": "🥩", "해산물": "🐟"
};

const CategoryChoose = ({ storesData = {}, onGoHome }) => {
  // step: 1 (카테고리 선택) -> 2 (카드 뽑기)
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pickedCardIndex, setPickedCardIndex] = useState(null);
  const [pickedStore, setPickedStore] = useState(null);
  const [history, setHistory] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // 1단계: 카테고리 클릭 시 다음 페이지(Step 2)로 이동
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPickedCardIndex(null);
    setPickedStore(null);
    setIsFlipped(false);
    setHistory([]);
    setStep(2); // 2단계 화면으로 전환
  };

  // 가게 추출 함수
  const getRandomStore = (category) => {
    const stores = storesData[category] || [];
    if (stores.length === 0) return null;

    let candidates = stores.filter(
      (s) => !history.includes(typeof s === 'string' ? s : s.name || s.id)
    );

    if (candidates.length === 0) {
      candidates = stores;
      setHistory([]);
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selected = candidates[randomIndex];
    const storeKey = typeof selected === 'string' ? selected : selected.name || selected.id;

    setHistory((prev) => [...prev, storeKey]);
    return selected;
  };

  // 카드 클릭 시
  const handleCardClick = (cardIndex) => {
    if (pickedCardIndex !== null) return;

    const store = getRandomStore(selectedCategory);
    setPickedCardIndex(cardIndex);
    setPickedStore(store);

    setTimeout(() => {
      setIsFlipped(true);
    }, 100);
  };

  // 다시 뽑기
  const handleRetry = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setPickedCardIndex(null);
      setPickedStore(null);
    }, 400);
  };

  // 카테고리 다시 선택 (1단계로 돌아가기)
  const handleBackToCategory = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setStep(1);
      setSelectedCategory(null);
      setPickedCardIndex(null);
      setPickedStore(null);
      setHistory([]);
    }, 200);
  };

  // 처음으로 (홈 이동)
  const handleResetAll = () => {
    handleBackToCategory();
    if (onGoHome) onGoHome();
  };

  return (
    <div className="category-choose-container">
      {/* Step 1: 카테고리 선택 페이지 */}
      {step === 1 && (
        <div className="step-container">
          <h2 className="section-title">카테고리 선택</h2>
          <p className="section-subtitle">원하는 카테고리를 고르면 카드를 뽑으실 수 있습니다!</p>

          <div className="category-grid">
            {SEARCH_CATEGORIES.map((category) => (
              <button
                key={category}
                className="category-btn"
                onClick={() => handleCategorySelect(category)}
              >
                <span className="icon">{CATEGORY_ICONS[category]}</span>
                <span className="name">{category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: 카드 뽑기 페이지 */}
      {step === 2 && (
        <div className="step-container card-section">
          <div className="step-header">
            <button className="back-btn" onClick={handleBackToCategory}>
              ← 카테고리 재선택
            </button>
            <h2 className="category-heading">
              [{selectedCategory}] 카드를 하나 선택하세요!
            </h2>
          </div>

          <div className="cards-wrapper">
            {[0, 1, 2, 3].map((index) => {
              const isSelected = pickedCardIndex === index;
              const isHidden = pickedCardIndex !== null && !isSelected;

              return (
                <div
                  key={index}
                  className={`card-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className={`card-inner ${isSelected && isFlipped ? 'flipped' : ''}`}>
                    {/* 카드 뒷면 */}
                    <div className="card-face card-back">
                      <span className="card-question">❓</span>
                      <span className="card-label">CARD {index + 1}</span>
                    </div>

                    {/* 카드 앞면 */}
                    <div className="card-face card-front">
                      <div className="store-detail">
                        {pickedStore ? (
                          <>
                            {pickedStore.image && (
                              <img src={pickedStore.image} alt={pickedStore.name} className="store-img" />
                            )}
                            <div className="store-info">
                              <h4 className="store-name">{pickedStore.name || pickedStore}</h4>
                              {pickedStore.rating && <p className="store-rating">⭐ {pickedStore.rating}</p>}
                              {pickedStore.address && <p className="store-address">📍 {pickedStore.address}</p>}
                              {(pickedStore.distance || pickedStore.duration) && (
                                <p className="store-meta">
                                  🚶 {pickedStore.distance || ''} ({pickedStore.duration || ''})
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="empty-card-placeholder">
                            <span className="empty-icon">🍽️</span>
                            <p className="empty-title">가게 이름</p>
                            <p className="empty-sub">별점 / 주소 / 소요시간</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 컨트롤 버튼 */}
          {pickedCardIndex !== null && isFlipped && (
            <div className="bottom-controls">
              <button className="ctrl-btn home-btn" onClick={handleResetAll}>
                🏠 처음으로
              </button>
              <button className="ctrl-btn retry-btn" onClick={handleRetry}>
                🔄 다시 뽑기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryChoose;