import React from 'react';

const CATEGORY_ICONS = {
  "맛집": "⭐", "한식": "🍚", "일식": "🍣", "중식": "🥟",
  "양식": "🍝", "카페": "☕", "분식": "🍢", "치킨": "🍗",
  "피자": "🍕", "햄버거": "🍔", "고기": "🥩", "해산물": "🐟"
};

const CategoryButton = ({ category, onClick }) => {
  return (
    <button className="category-btn" onClick={() => onClick(category)}>
      <span className="icon">{CATEGORY_ICONS[category] || "🍽️"}</span>
      <span className="name">{category}</span>
    </button>
  );
};

export default CategoryButton;