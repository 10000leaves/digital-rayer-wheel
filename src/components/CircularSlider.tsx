"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./CircularSlider.module.css";

import { angleState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CircularSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const setAngle = useSetRecoilState(angleState);
  const angle = useRecoilValue(angleState);

  const getAngleFromEvent = (event: MouseEvent) => {
    if (sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderRadius = sliderRect.width / 2;
      const x = event.clientX - (sliderRect.left + sliderRadius);
      const y = event.clientY - (sliderRect.top + sliderRadius);
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      return angle < 0 ? angle + 360 : angle;
    }
    return 0;
  };

  const setHandlePosition = (angle: number) => {
    if (sliderRef.current && handleRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderRadius = sliderRect.width / 2;
      const handleRadius = handleRef.current.getBoundingClientRect().width / 2;
      const borderWidth = parseFloat(getComputedStyle(sliderRef.current).borderWidth);
      const innerRadius = sliderRadius - borderWidth / 2;

      const radians = (angle * Math.PI) / 180;
      const x = sliderRadius + (innerRadius * Math.cos(radians)) - handleRadius;
      const y = sliderRadius + (innerRadius * Math.sin(radians)) - handleRadius;
      handleRef.current.style.left = `${x}px`;
      handleRef.current.style.top = `${y}px`;
    }
  };

  useEffect(() => {
    setHandlePosition(angle);
  }, [angle]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      const newAngle = getAngleFromEvent(event);
      // 現在の角度が新しい角度と異なる場合のみ、setAngleを呼び出す
      if (newAngle !== angle) {
        setAngle(newAngle);
      }
    }
  }, [isDragging, angle, setAngle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.handle} ref={handleRef} onMouseDown={handleMouseDown}></div>
      </div>
    </div>
  );
};

export default CircularSlider;
