import React from 'react';
import CategoryButton from './CategoryButton';

const CategorySelectStep = ({ categories = [], onSelectCategory }) => {
  return (
    <div className="step-container">
      <h2 className="section-title">카테고리 선택</h2>
      <p className="section-subtitle">원하는 카테고리를 고르면 카드를 뽑으실 수 있습니다!</p>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelectStep;