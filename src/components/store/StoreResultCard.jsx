export default function StoreResultCard({
  store,
  onRetry,
}) {
  if (!store) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(store.name);

    alert(`'${store.name}' 복사되었습니다!`);
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-8 text-center text-white shadow-lg space-y-4">
      <p className="text-sm font-medium opacity-90">
        오늘의 추천 맛집
      </p>

      <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-sm">
        {store.name}
      </h2>

      <p className="text-sm opacity-90">
        {store.category}
      </p>

      <div className="flex justify-center gap-2 pt-2">
        <button
          onClick={copyToClipboard}
          className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg backdrop-blur-sm transition"
        >
          📋 복사
        </button>

        <button
          onClick={onRetry}
          className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg backdrop-blur-sm transition"
        >
          🔄 다시
        </button>
      </div>
    </div>
  );
}