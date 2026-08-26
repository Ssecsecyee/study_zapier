import React, { useState } from "react";
import CategoryChoose from "./components/Category-Choose/CategoryChoose";
import StorePickerPage from "./pages/StorePickerPage";
import CategoryRandomPage from "./pages/CategoryRandomPage";

function App() {
  // 현재 어떤 페이지를 보여줄지 관리하는 상태 ('choose', 'store', 'random')
  const [currentPage, setCurrentPage] = useState("choose");

  const handleGoHome = () => {
    console.log("홈으로 이동 버튼 클릭됨");
    setCurrentPage("choose"); // 홈으로 갈 때 첫 번째 페이지로 이동
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
      {/* 테스트/개발용 상단 페이지 전환 네비게이션 */}
      <nav style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setCurrentPage("choose")}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            backgroundColor: currentPage === "choose" ? "#2563eb" : "#e5e7eb",
            color: currentPage === "choose" ? "#ffffff" : "#1f2937",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Category Choose
        </button>
        <button
          onClick={() => setCurrentPage("store")}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            backgroundColor: currentPage === "store" ? "#2563eb" : "#e5e7eb",
            color: currentPage === "store" ? "#ffffff" : "#1f2937",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Store Picker Page
        </button>
        <button
          onClick={() => setCurrentPage("random")}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            backgroundColor: currentPage === "random" ? "#2563eb" : "#e5e7eb",
            color: currentPage === "random" ? "#ffffff" : "#1f2937",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Category Random Page
        </button>
      </nav>

      {/* 조건부 렌더링으로 페이지 전환 */}
      {currentPage === "choose" && <CategoryChoose onGoHome={handleGoHome} />}
      {currentPage === "store" && <StorePickerPage />}
      {currentPage === "random" && <CategoryRandomPage />}
    </div>
  );
}

export default App;