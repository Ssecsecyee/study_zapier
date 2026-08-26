import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import CategoryChoose from "./components/Category-Choose/CategoryChoose";
import StorePickerPage from "./pages/StorePickerPage";
import CategoryRandomPage from "./pages/CategoryRandomPage";

function App() {
  // 현재 페이지 상태: 'home', 'random', 'choose', 'store'
  const [currentPage, setCurrentPage] = useState("home");

  const handleGoHome = () => {
    setCurrentPage("home");
  };

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "40px 0",
      }}
    >
      {/* 상단 홈 이동 네비게이션 (홈 화면이 아닐 때만 표시) */}
      {currentPage !== "home" && (
        <nav style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={handleGoHome}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1f2937",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ← 메인으로 돌아가기
          </button>
        </nav>
      )}

      {/* 조건부 페이지 렌더링 */}
      {currentPage === "home" && <MainPage onNavigate={setCurrentPage} />}
      
      {/* 1번: CategoryRandomPage */}
      {currentPage === "random" && <CategoryRandomPage />}
      
      {/* 2번: CategoryChoose */}
      {currentPage === "choose" && <CategoryChoose onGoHome={handleGoHome} />}
      
      {/* 3번: StorePickerPage */}
      {currentPage === "store" && <StorePickerPage />}
    </div>
  );
}

export default App;