import React from 'react';

const CategoryButton = ({ category, icon, onClick }) => {
  return (
    <button className="category-btn" onClick={() => onClick(category)}>
      <span className="icon">{icon}</span>
      <span className="name">{category}</span>
    </button>
  );
};

export default CategoryButton;