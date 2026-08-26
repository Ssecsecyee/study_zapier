import React from 'react';
import CategoryChoose from '../components/Category-Choose/CategoryChoose';
import { CATEGORIES } from '../data/categories';
import { stores } from '../data/stores';

const CategoryChoosePage = ({ onGoHome, initialCategory = null }) => {
  return (
    <main className="category-choose-page">
      <CategoryChoose 
        categories={CATEGORIES} 
        storesData={stores} 
        onGoHome={onGoHome} 
        initialCategory={initialCategory} 
      />
    </main>
  );
};

export default CategoryChoosePage;