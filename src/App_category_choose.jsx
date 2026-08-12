<<<<<<< HEAD
import React from 'react';
import CategoryChoose from './components/category_choose/CategoryChoose';

function App() {
  const handleGoHome = () => {
    // 처음으로 버튼 클릭 시 메인 화면 전환 로직 처리
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 0' }}>
      <CategoryChoose onGoHome={handleGoHome} />
    </div>
  );
=======
import CategoryRandom from "./components/categoryrandom";

function App() {
  return <CategoryRandom />;
>>>>>>> 4908b3cc8f8585d0a06d0223ec3c18a941197141
}

export default App;