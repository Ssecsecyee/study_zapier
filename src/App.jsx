import React, { useState } from 'react';
import CategoryChoose from './components/CategoryChoose';
import CategoryRandom from './components/categoryrandom';
import StorePicker from "./components/place";

function App() {
  // [수정] 화면 전환 상태 관리 (home, random, choose, store)
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 0' }}>
      {/* [수정] 현재 상태에 따라 컴포넌트 분기 렌더링 */}
      {currentView === 'home' && (
        <CategoryRandom 
          onNavigate={(view, category) => {
            if (category) setSelectedCategory(category);
            setCurrentView(view);
          }}
        />
      )}

      {currentView === 'choose' && (
        <CategoryChoose 
          initialCategory={selectedCategory} 
          onGoHome={handleGoHome} 
        />
      )}

      {currentView === 'storePicker' && (
        <div>
          <button 
            onClick={handleGoHome}
            style={{ margin: '0 20px 20px 20px', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: '#e5e7eb', fontWeight: 'bold' }}
          >
            ← 처음으로 돌아가기
          </button>
          <StorePicker />
        </div>
      )}
    </div>
  );
}

export default App;