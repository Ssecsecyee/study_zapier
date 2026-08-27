import { useState, useEffect } from 'react';

import { supabase } from '../supabaseClient';
import { stores as defaultStores } from '../data/stores';

import StoreRecommendCard from '../components/store/StoreRecommendCard';
import StoreResultCard from '../components/store/StoreResultCard';
import StoreHistory from '../components/store/StoreHistory';

export default function StorePickerPage() {
  const [storeList, setStoreList] = useState(defaultStores);
  const [selectedStore, setSelectedStore] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchStores() {
      try {
        const { data, error } = await supabase
          .from('place')
          .select('place_id, store_name, image, distance, category_id, category(category_name)');
        
        if (!error && data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.place_id,
            name: item.store_name,
            category: item.category?.category_name || '',
            image: item.image,
            distance: item.distance ? (String(item.distance).includes('m') ? item.distance : `${Math.round(Number(item.distance))}m`) : '',
          }));
          setStoreList(formatted);
        }
      } catch (err) {
        console.error('Supabase fetch error:', err);
      }
    }
    fetchStores();
  }, []);

  const getRandomStore = () => {
    setIsLoading(true);

    const targetList = storeList.length > 0 ? storeList : defaultStores;
    const randomIndex = Math.floor(
      Math.random() * targetList.length
    );

    const pickedStore = targetList[randomIndex];

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