import React from "react";

function MainPage({ onNavigate }) {
  // 1번: CategoryRandomPage, 2번: CategoryChoose, 3번: StorePickerPage
  const menuItems = [
    {
      id: "random", // CategoryRandomPage (1번)
      title: "카테고리 음식점",
      badge: "매장 탐색",
      description: "선택한 카테고리 내의 다양한 음식점 목록을 확인해보세요.",
      icon: "🏪",
      color: "#059669",
      bgHover: "#ecfdf5",
    },
    {
      id: "choose", // CategoryChoose (2번)
      title: "카테고리 선택",
      badge: "직접 선택",
      description: "종류별로 원하는 메뉴 카테고리를 직접 골라보세요.",
      icon: "🍱",
      color: "#2563eb",
      bgHover: "#eff6ff",
    },
    {
      id: "store", // StorePickerPage (3번)
      title: "가게 랜덤",
      badge: "오늘의 추천",
      description: "무엇을 먹을지 고민될 때! 랜덤으로 가게를 추천받아보세요.",
      icon: "🎲",
      color: "#d97706",
      bgHover: "#fffbeb",
    },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px 20px 60px" }}>
      <header style={{ textAlign: "center", marginBottom: "48px" }}>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#2563eb",
            backgroundColor: "#dbeafe",
            padding: "4px 12px",
            borderRadius: "9999px",
            display: "inline-block",
            marginBottom: "12px",
          }}
        >
          Food Finder
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "12px",
            letterSpacing: "-0.025em",
          }}
        >
          오늘 뭐 먹지?
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#6b7280", margin: 0 }}>
          원하는 방식으로 완벽한 식사 메뉴를 찾아보세요.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "28px 24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
              cursor: "pointer",
              transition: "all 0.25s ease-in-out",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = item.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    backgroundColor: item.bgHover,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: item.color,
                    backgroundColor: item.bgHover,
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "1.375rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#6b7280",
                  lineHeight: "1.5",
                  marginBottom: "24px",
                }}
              >
                {item.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: item.color,
              }}
            >
              <span>이동하기</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;