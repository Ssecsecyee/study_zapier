export default function StoreRecommendCard({
  onRecommend,
}) {
  return (
    <div className="bg-gradient-to-r from-teal-100 to-pink-100 rounded-2xl p-6 text-center shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold mb-2">
        🍽️ 맛집 추천
      </h1>

      <p className="text-slate-600 text-sm mb-4">
        오늘 어디서 먹을지 고민이신가요?
        <br />
        랜덤으로 맛집을 추천해드립니다!
      </p>

      <button
        onClick={onRecommend}
        className="w-full bg-pink-400 hover:bg-pink-500 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow transition duration-150"
      >
        🍽️ 맛집 추천받기
      </button>
    </div>
  );
}