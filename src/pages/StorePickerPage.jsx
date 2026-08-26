import { useState } from 'react';

import { stores } from '../data/stores';

import StoreRecommendCard from '../components/store/StoreRecommendCard';
import StoreResultCard from '../components/store/StoreResultCard';
import StoreHistory from '../components/store/StoreHistory';

export default function StorePickerPage() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomStore = () => {
    setIsLoading(true);

    const randomIndex = Math.floor(
      Math.random() * stores.length
    );

    const pickedStore = stores[randomIndex];

    setSelectedStore(pickedStore);

    setHistory((prev) =>
      [pickedStore, ...prev].slice(0, 10)
    );

    setIsLoading(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800">
      <div className="max-w-md w-full space-y-6">

        <StoreRecommendCard
          onRecommend={getRandomStore}
          isLoading={isLoading}
        />

        <StoreResultCard
          store={selectedStore}
          onRetry={getRandomStore}
          isLoading={isLoading}
        />

        <StoreHistory
          history={history}
          onClear={clearHistory}
        />

      </div>
    </div>
  );
}