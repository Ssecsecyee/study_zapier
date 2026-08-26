import { useState } from "react";
import "./categoryrandom.css";

const CATEGORIES = [
  "맛집", "한식", "일식", "중식", "양식", "카페",
  "분식", "치킨", "피자", "햄버거", "고기", "해산물"
];

// [수정] App.jsx에서 넘겨준 onNavigate 프로퍼티 받기
function CategoryRandom({ onNavigate }) {
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

    const selectedIndex = Math.floor(Math.random() * CATEGORIES.length);
    const category = CATEGORIES[selectedIndex];

    setPendingCategory(category);

    const targetModulo = (360 - selectedIndex * sliceAngle) % 360;
    const currentModulo = ((rotation % 360) + 360) % 360;
    const correction = (targetModulo - currentModulo + 360) % 360;
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

            {/* [수정] 카테고리 선택 카드 클릭 시 App.jsx를 통해 CategoryChoose 화면으로 이동 */}
            <button 
              className="menuCard"
              onClick={() => {
                if (onNavigate) onNavigate('choose', null);
              }}
            >
              🍽️
              <h2>카테고리 선택</h2>
              <p>
                원하는 카테고리를 직접 선택해요.
              </p>
            </button>

            {/* [수정] 가게 랜덤 카드 클릭 시 App.jsx를 통해 place.jsx 화면으로 이동 */}
            <button 
              className="menuCard"
              onClick={() => {
                if (onNavigate) onNavigate('storePicker', null);
              }}
            >
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

            {/* [수정] 돌림판 결과가 나오면 App.jsx의 CategoryChoose로 선택된 카테고리를 전달하며 이동 */}
            {selectedCategory && (
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('choose', selectedCategory);
                  }
                }}
              >
                {selectedCategory} 가게 추천 보러가기 →
              </button>
            )}

          </section>

          <section>

            <div className="wheelWrap">

              <div className="pointer" />

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

    </div>
  );
}

export default CategoryRandom;