import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정 (환경 변수 또는 실제 값 입력)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function StorePicker() {
  const [storeName, setStoreName] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // DB 테이블명과 가게 이름 컬럼명
  const TABLE_NAME = 'stores';
  const COLUMN_NAME = 'name';

  const getPick = async () => {
    setIsLoading(true);

    try {
      // 1. 전체 데이터 개수 조회
      const { count, error: countError } = await supabase
        .from(TABLE_NAME)
        .select('*', { count: 'exact', head: true });

      if (countError || count === null || count === 0) {
        throw countError || new Error('데이터를 찾을 수 없습니다.');
      }

      // 2. 랜덤 index 계산 후 해당 location의 1개 Row 추출
      const randomIndex = Math.floor(Math.random() * count);
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(COLUMN_NAME)
        .range(randomIndex, randomIndex)
        .single();

      if (error) throw error;

      const pickedName = data[COLUMN_NAME];
      setStoreName(pickedName);

      // 3. 최근 추천 기록 업데이트 (최대 10개까지 저장)
      setHistory((prev) => [pickedName, ...prev].slice(0, 10));

    } catch (err) {
      alert('추천을 불러오는 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!storeName) return;
    navigator.clipboard.writeText(storeName).then(() => {
      alert(`'${storeName}' 복사되었습니다!`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800">
      <div className="max-w-md w-full space-y-6">
        
        {/* 메인 버튼 카드 */}
        <div className="bg-gradient-to-r from-teal-100 to-pink-100 rounded-2xl p-6 text-center shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold mb-2">🍽️ 맛집 추천</h1>
          <p className="text-slate-600 text-sm mb-4">
            오늘 어디서 먹을지 고민이신가요?<br />
            랜덤으로 맛집을 추천해드립니다!
          </p>
          <button
            onClick={getPick}
            disabled={isLoading}
            className="w-full bg-pink-400 hover:bg-pink-500 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? '추천 중...' : '🍽️ 맛집 추천받기'}</span>
          </button>
        </div>

        {/* 뽑기 결과 영역 */}
        {storeName && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-8 text-center text-white shadow-lg space-y-4">
            <p className="text-sm font-medium opacity-90">오늘의 추천 맛집</p>
            <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-sm">{storeName}</h2>
            
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={copyToClipboard}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg backdrop-blur-sm transition"
              >
                📋 복사
              </button>
              <button
                onClick={getPick}
                disabled={isLoading}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg backdrop-blur-sm transition"
              >
                🔄 다시
              </button>
            </div>
          </div>
        )}

        {/* 추천 가게 기록 영역 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center space-y-4">
          <h3 className="font-bold text-slate-700 flex items-center justify-center gap-1">
            <span>🍽️</span> 추천 가게 기록
          </h3>
          <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
            {history.length === 0 ? (
                <span className="text-xs text-slate-400 self-center">추천받은 가게가 여기에 기록됩니다.</span>
             ) : (
                 history.map((item, index) => (
                 <span
                 key={`${item}-${index}`}
                 className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
                 >
                    {item}{index < history.length - 1 ? ', ' : ''}
                    </span>
                    ))
                    )}
                    </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium py-1.5 px-4 rounded-lg transition"
            >
              기록 지우기
            </button>
          )}
        </div>

      </div>
    </div>
  );
}