import { useState } from "react";
import "./categoryrandom.css";

const CATEGORIES = [
  "맛집", "한식", "일식", "중식", "양식", "카페",
  "분식", "치킨", "피자", "햄버거", "고기", "해산물"
];

function CategoryRandom() {
  const [page, setPage] = useState("home");
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pendingCategory, setPendingCategory] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const sliceAngle = 360 / CATEGORIES.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedCategory("");

    // 12개 중 랜덤 선택
    const selectedIndex = Math.floor(Math.random() * CATEGORIES.length);
    const category = CATEGORIES[selectedIndex];

    setPendingCategory(category);

    // 선택된 카테고리가 화살표 위치에 오도록 회전
    const targetModulo = (360 - selectedIndex * sliceAngle) % 360;
    const currentModulo = ((rotation % 360) + 360) % 360;
    const correction = (targetModulo - currentModulo + 360) % 360;

    // 6~8바퀴 정도 돌기
    const extraTurns = 6 + Math.floor(Math.random() * 3);

    setRotation(
      rotation + extraTurns * 360 + correction
    );
  };

  const handleTransitionEnd = () => {
    if (!isSpinning) return;

    setIsSpinning(false);
    setSelectedCategory(pendingCategory);
  };

  return (
    <div className="page">

      {/* ================= 첫 화면 ================= */}
      {page === "home" && (
        <main className="home">

          <h1>
            오늘 먹을 메뉴,
            <br />
            어떻게 정해볼까요?
          </h1>

          <div className="cardGrid">

            <button
              className="menuCard"
              onClick={() => setPage("random")}
            >
              🎯
              <h2>카테고리 랜덤</h2>
              <p>
                12개 음식 카테고리 중 랜덤으로 추천해요.
              </p>
            </button>

            <button className="menuCard">
              🍽️
              <h2>카테고리 선택</h2>
              <p>
                원하는 카테고리를 직접 선택해요.
              </p>
            </button>

            <button className="menuCard">
              🎲
              <h2>가게 랜덤</h2>
              <p>
                가게를 랜덤으로 추천해요.
              </p>
            </button>

          </div>
        </main>
      )}

      {/* ================= 카테고리 랜덤 ================= */}
      {page === "random" && (
        <main className="randomPage">

          <section>

            <button onClick={() => setPage("home")}>
              ← 처음으로
            </button>

            <h1>
              돌림판으로
              <br />
              오늘의 카테고리를 정해요!
            </h1>

            {/* 결과 네모칸 */}
            <div className="resultBox">

              <span>오늘의 카테고리</span>

              <strong>

                {isSpinning
                  ? "두근두근... 🍴"

                  : selectedCategory
                  ? `${selectedCategory}.`

                  : "돌림판을 돌려주세요!"}

              </strong>

            </div>

            {/* 결과가 나오면 버튼 표시 */}
            {selectedCategory && (
              <button
                onClick={() => setPage("categorySelect")}
              >
                {selectedCategory} 가게 추천 보러가기 →
              </button>
            )}

          </section>

          <section>

            <div className="wheelWrap">

              {/* 위쪽 화살표 */}
              <div className="pointer" />

              {/* 돌림판 */}
              <div
                className="wheel"
                style={{
                  transform: `rotate(${rotation}deg)`
                }}
                onTransitionEnd={handleTransitionEnd}
              >

                {CATEGORIES.map((category, index) => {

                  const angle =
                    index * sliceAngle;

                  return (
                    <span
                      key={category}
                      className="wheelLabel"
                      style={{
                        "--angle": `${angle}deg`
                      }}
                    >
                      {category}
                    </span>
                  );

                })}

              </div>

            </div>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
            >

              {isSpinning
                ? "돌리는 중..."

                : selectedCategory
                ? "다시 돌리기 🎯"

                : "돌림판 돌리기 🎯"}

            </button>

          </section>

        </main>
      )}

      {/* ================= 팀원 파트 연결 ================= */}
      {page === "categorySelect" && (
  <main className="categorySelectPage">

    {/* 왼쪽 위 돌아가기 버튼 */}
    <button
      className="categoryBackButton"
      onClick={() => setPage("home")}
    >
      ← 돌아가기
    </button>

    <div className="categorySelectContent">
      <h1>
        카테고리 선택 페이지
      </h1>

      <h2>
        선택된 카테고리: {selectedCategory}
      </h2>

      <p>
        여기에 친구가 만든 카테고리별
        가게 추천 컴포넌트를 넣으면 됩니다.
      </p>
    </div>

  </main>
)}

    </div>
  );
}

export default CategoryRandom;