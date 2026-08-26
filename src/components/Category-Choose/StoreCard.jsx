import React from 'react';

const StoreCard = ({ index, isSelected, isHidden, isFlipped, pickedStore, onClick }) => {
  return (
    <div
      className={`card-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
      onClick={onClick}
    >
      <div className={`card-inner ${isSelected && isFlipped ? 'flipped' : ''}`}>
        {/* 뒷면 (선택 전) */}
        <div className="card-face card-back">
          <span className="card-question">❓</span>
          <span className="card-label">CARD {index + 1}</span>
        </div>

        {/* 앞면 (가게 정보) */}
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
};

export default StoreCard;