"use client";

import Typing from "@/components/Typing";
import CircularSlider from "@/components/CircularSlider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-12 space-y-12">
      <h1>デジタルマニ車</h1>

      <CircularSlider/>

      <Typing/>

    </main>
  );
}
