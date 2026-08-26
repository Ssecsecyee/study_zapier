import { useState } from "react";
import Wheel from "../components/Wheel";
import { CATEGORIES } from "../data/categories";
import "../components/categoryrandom.css";

function CategoryRandomPage() {
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pendingCategory, setPendingCategory] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const sliceAngle = 360 / CATEGORIES.length;

  // =========================
  // 돌림판 시작
  // =========================
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedCategory("");

    // 카테고리 랜덤 선택
    const selectedIndex = Math.floor(
      Math.random() * CATEGORIES.length
    );

    const category = CATEGORIES[selectedIndex];

    setPendingCategory(category);

    // 선택된 카테고리가 화살표 위치에 오도록 계산
    const targetModulo =
      (360 - selectedIndex * sliceAngle) % 360;

    const currentModulo =
      ((rotation % 360) + 360) % 360;

    const correction =
      (targetModulo - currentModulo + 360) % 360;

    // 6~8바퀴 추가 회전
    const extraTurns =
      6 + Math.floor(Math.random() * 3);

    setRotation(
      rotation +
        extraTurns * 360 +
        correction
    );
  };

  // =========================
  // 돌림판 회전 종료
  // =========================
  const handleTransitionEnd = () => {
    if (!isSpinning) return;

    setIsSpinning(false);
    setSelectedCategory(pendingCategory);
  };

  return (
    <main className="randomPage">

      {/* 결과 영역 */}
      <section>

        <h1>
          돌림판으로
          <br />
          오늘의 카테고리를 정해요!
        </h1>

        <div className="resultBox">

          <span>
            오늘의 카테고리
          </span>

          <strong>
            {isSpinning
              ? "두근두근... 🍴"
              : selectedCategory
              ? `${selectedCategory}.`
              : "돌림판을 돌려주세요!"}
          </strong>

        </div>

      </section>

      {/* 돌림판 영역 */}
      <section>

        <Wheel
          rotation={rotation}
          onTransitionEnd={handleTransitionEnd}
        />

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
  );
}

export default CategoryRandomPage;