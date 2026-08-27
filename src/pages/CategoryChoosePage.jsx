import React from 'react';
import CategoryChoose from '../components/Category-Choose/CategoryChoose';
import { CATEGORIES } from '../data/categories';

const CategoryChoosePage = ({ onGoHome, initialCategory = null }) => {
  return (
    <main className="category-choose-page">
      <CategoryChoose
        categories={CATEGORIES}
        onGoHome={onGoHome}
        initialCategory={initialCategory}
      />
    </main>
  );
};

export default CategoryChoosePage;