export default function StoreHistory({
  history,
  onClear,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center space-y-4">
      <h3 className="font-bold text-slate-700 flex items-center justify-center gap-1">
        <span>🍽️</span>
        추천 가게 기록
      </h3>

      <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
        {history.length === 0 ? (
          <span className="text-xs text-slate-400 self-center">
            추천받은 가게가 여기에 기록됩니다.
          </span>
        ) : (
          history.map((store, index) => (
            <span
              key={`${store.id}-${index}`}
              className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
            >
              {store.name}
            </span>
          ))
        )}
      </div>

      {history.length > 0 && (
        <button
          onClick={onClear}
          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium py-1.5 px-4 rounded-lg transition"
        >
          기록 지우기
        </button>
      )}
    </div>
  );
}