"use client";

import Typing from "@/components/Typing";
import CircularSlider from "@/components/CircularSlider";

import { reciteState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const recite = useRecoilValue(reciteState);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 space-y-8 bg-gray-900">

      {/* アイコンの表示 */}
      <div className="select-none flex items-center mb-4">
        <img src="/icon.svg" alt="icon" className="w-10 h-10 mr-2" />
        <h1 className="text-4xl font-bold text-yellow-400">デジタルマニ車</h1>
      </div>

      {/* 円型のスライダーの表示 */}
      <CircularSlider />

      {/* カウンターの表示 */}
      <p className="select-none text-2xl text-gray-200">唱えた回数：<span className="font-semibold text-yellow-400">{recite}</span></p>

      {/* 経文の表示 */}
      <Typing />
    </main>
  );
}
