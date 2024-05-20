"use client";

import React, { useState, useRef, useEffect, useCallback, TouchEvent } from "react";
import styles from "./CircularSlider.module.css";

import { angleState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CircularSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const setAngle = useSetRecoilState(angleState);
  const angle = useRecoilValue(angleState);

  const getAngleFromEvent = (event: MouseEvent | TouchEvent) => {
    if (sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderRadius = sliderRect.width / 2;
      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
      const x = clientX - (sliderRect.left + sliderRadius);
      const y = clientY - (sliderRect.top + sliderRadius);
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

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMouseMove(event);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent | TouchEvent) => {
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
      const moveHandler = (event: MouseEvent | TouchEvent) => handleMouseMove(event);
      const endHandler = () => handleMouseUp();
  
      window.addEventListener("mousemove", moveHandler as EventListener);
      window.addEventListener("mouseup", endHandler as EventListener);
      window.addEventListener("touchmove", moveHandler as EventListener);
      window.addEventListener("touchend", endHandler as EventListener);
  
      return () => {
        window.removeEventListener("mousemove", moveHandler as EventListener);
        window.removeEventListener("mouseup", endHandler as EventListener);
        window.removeEventListener("touchmove", moveHandler as EventListener);
        window.removeEventListener("touchend", endHandler as EventListener);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart ={handleTouchStart}
      >
        <div className={styles.handle} ref={handleRef}></div>
      </div>
    </div>
  );
};

export default CircularSlider;
