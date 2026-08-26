import React from 'react';
import StoreCard from './StoreCard';

const CardDrawStep = ({
  selectedCategory,
  initialCategory,
  pickedCardIndex,
  pickedStore,
  isFlipped,
  onCardClick,
  onBackToCategory,
  onResetAll,
  onRetry,
}) => {
  return (
    <div className="step-container card-section">
      <div className="step-header">
        <button className="back-btn" onClick={onBackToCategory}>
          ← {initialCategory ? '처음으로' : '카테고리 재선택'}
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
            <StoreCard
              key={index}
              index={index}
              isSelected={isSelected}
              isHidden={isHidden}
              isFlipped={isFlipped}
              pickedStore={pickedStore}
              onClick={() => onCardClick(index)}
            />
          );
        })}
      </div>

      {pickedCardIndex !== null && isFlipped && (
        <div className="bottom-controls">
          <button className="ctrl-btn home-btn" onClick={onResetAll}>
            🏠 처음으로
          </button>
          <button className="ctrl-btn retry-btn" onClick={onRetry}>
            🔄 다시 뽑기
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDrawStep;