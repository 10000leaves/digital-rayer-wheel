"use client";

import React, { useState, useEffect, useRef } from "react";
import { angleState, messageState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue } from "recoil";

const Typing: React.FC = () => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [index, setIndex] = useState(0);

  const angle = useRecoilValue(angleState);
  const message = useRecoilValue(messageState);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (displayedMessage.length !== 0 || index === 0 && angle !== 0) {
      setDisplayedMessage((prev) => prev + message[index]);
      setIndex((prevIndex) => (prevIndex + 1) % message.length);
    }

    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }

  }, [angle]); // Only run when angle changes

  return (
    <textarea
      ref={textareaRef}
      rows={5}
      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder="唱える"
      value={displayedMessage}
      readOnly
    />
  );
};

export default Typing;
