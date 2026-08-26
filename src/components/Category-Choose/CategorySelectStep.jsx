import React from 'react';
import CategoryButton from './CategoryButton';

const SEARCH_CATEGORIES = [
  "맛집", "한식", "일식", "중식", "양식", "카페", 
  "분식", "치킨", "피자", "햄버거", "고기", "해산물"
];

const CATEGORY_ICONS = {
  "맛집": "⭐", "한식": "🍚", "일식": "🍣", "중식": "🥟",
  "양식": "🍝", "카페": "☕", "분식": "🍢", "치킨": "🍗",
  "피자": "🍕", "햄버거": "🍔", "고기": "🥩", "해산물": "🐟"
};

const CategorySelectStep = ({ onSelectCategory }) => {
  return (
    <div className="step-container">
      <h2 className="section-title">카테고리 선택</h2>
      <p className="section-subtitle">원하는 카테고리를 고르면 카드를 뽑으실 수 있습니다!</p>

      <div className="category-grid">
        {SEARCH_CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            icon={CATEGORY_ICONS[category]}
            onClick={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelectStep;