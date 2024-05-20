"use client";

import Typing from "@/components/Typing";
import CircularSlider from "@/components/CircularSlider";

import { reciteState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const recite = useRecoilValue(reciteState);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-12 space-y-12">
      <h1>デジタルマニ車</h1>

      <CircularSlider />

      <p>唱えた回数：{recite}</p>

      <Typing />

    </main>
  );
}
