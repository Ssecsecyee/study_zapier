import "../components/categoryrandom.css";

function HomePage({ onNavigate }) {

  return (
    <main className="home">

      <h1>
        오늘 먹을 메뉴,
        <br />
        어떻게 정해볼까요?
      </h1>


      <div className="cardGrid">

        {/* 카테고리 랜덤 */}
        <button
          className="menuCard"
          onClick={() =>
            onNavigate("random")
          }
        >
          🎯

          <h2>
            카테고리 랜덤
          </h2>

          <p>
            12개 음식 카테고리 중 랜덤으로 추천해요.
          </p>
        </button>


        {/* 카테고리 선택 */}
        <button
          className="menuCard"
          onClick={() =>
            onNavigate("choose")
          }
        >
          🍽️

          <h2>
            카테고리 선택
          </h2>

          <p>
            원하는 카테고리를 직접 선택해요.
          </p>
        </button>


        {/* 가게 랜덤 */}
        <button
          className="menuCard"
          onClick={() =>
            onNavigate("storePicker")
          }
        >
          🎲

          <h2>
            가게 랜덤
          </h2>

          <p>
            가게를 랜덤으로 추천해요.
          </p>
        </button>

      </div>

    </main>
  );
}

export default HomePage;