"use client";

import React, { useState, useEffect } from 'react';

import { useRecoilValue } from "recoil";
import { angleState, messageState } from "@/atoms/prayerWheelAtom";

// import Typing from "@/components/Typing";
import CircularSlider from "@/components/CircularSlider";

import styles from "./TextRain.module.css";

export default function Home() {
  const angle = useRecoilValue(angleState);
  const message = useRecoilValue(messageState);

  const [letters, setLetters] = useState<{ id: number, char: string, left: number }[]>([]);
  const [index, setIndex] = useState(0);
  const [count, seCount] = useState(0);

  useEffect(() => {
    if (index === 0 && angle === 0) return; // 初回のみ無視する

    setLetters((prevLetters) => {
      if (index < message.length) {
        return [
          ...prevLetters, 
          { id: Date.now(), char: message[index], left: Math.random() * 100 }
        ];
      }
      return prevLetters;
    });

    setIndex((prevIndex) => (prevIndex < message.length - 1 ? prevIndex + 1 : 0));
    seCount((prevCount) => (prevCount + 1));
  }, [angle]);

  useEffect(() => {
    const preventScroll = (event: TouchEvent) => {
      event.preventDefault();
    };

    // スクロール防止用のイベントリスナーを設定
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      // コンポーネントがアンマウントされたときにイベントリスナーを削除
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center p-8 space-y-8 bg-gray-900">

      {/* アイコンの表示 */}
      <div className="select-none flex items-center mb-4">
        <img src="/icon.svg" alt="icon" className="w-10 h-10 mr-2" />
        <h1 className="text-4xl font-bold text-yellow-400">デジタルマニ車</h1>
      </div>

      {/* 円型のスライダーの表示 */}
      <CircularSlider />

      {/* カウンターの表示 */}
      <p className="select-none text-2xl text-gray-200">
        唱えた回数：<span className="font-semibold text-yellow-400">{Math.floor(count / message.length)}</span>
      </p>

      {/* 経文の表示 雨*/}
      {letters.map(({ id, char, left }) => (
        <span
          key={id}
          className={`select-none absolute text-2xl ${
            ['般', '若', '心', '経'].includes(char) ? 'text-yellow-400' : 'text-white'
          } ${styles.fall}`}
          style={{ left: `${left}%`, top: "0%" }}
          onAnimationEnd={() => {
            setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== id));
          }}
        >
          {char}
        </span>
      ))}

      {/* 経文の表示 文*/}
      {/* <Typing /> */}
    </main>
  );
}
