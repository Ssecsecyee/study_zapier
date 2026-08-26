import React, { useState, useEffect } from 'react';
import CategorySelectStep from './CategorySelectStep';
import CardDrawStep from './CardDrawStep';
import './CategoryChoose.css';

const CategoryChoose = ({ storesData = {}, onGoHome, initialCategory = null }) => {
  const [step, setStep] = useState(initialCategory ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [pickedCardIndex, setPickedCardIndex] = useState(null);
  const [pickedStore, setPickedStore] = useState(null);
  const [history, setHistory] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setStep(2);
    }
  }, [initialCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPickedCardIndex(null);
    setPickedStore(null);
    setIsFlipped(false);
    setHistory([]);
    setStep(2);
  };

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

  const handleCardClick = (cardIndex) => {
    if (pickedCardIndex !== null) return;

    const store = getRandomStore(selectedCategory);
    setPickedCardIndex(cardIndex);
    setPickedStore(store);

    setTimeout(() => {
      setIsFlipped(true);
    }, 100);
  };

  const handleRetry = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setPickedCardIndex(null);
      setPickedStore(null);
    }, 400);
  };

  const handleBackToCategory = () => {
    if (initialCategory) {
      if (onGoHome) onGoHome();
      return;
    }
    setIsFlipped(false);
    setTimeout(() => {
      setStep(1);
      setSelectedCategory(null);
      setPickedCardIndex(null);
      setPickedStore(null);
      setHistory([]);
    }, 200);
  };

  const handleResetAll = () => {
    handleBackToCategory();
    if (onGoHome) onGoHome();
  };

  return (
    <div className="category-choose-container">
      {step === 1 && (
        <CategorySelectStep onSelectCategory={handleCategorySelect} />
      )}

      {step === 2 && (
        <CardDrawStep
          selectedCategory={selectedCategory}
          initialCategory={initialCategory}
          pickedCardIndex={pickedCardIndex}
          pickedStore={pickedStore}
          isFlipped={isFlipped}
          onCardClick={handleCardClick}
          onBack={handleBackToCategory}
          onResetAll={handleResetAll}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default CategoryChoose;