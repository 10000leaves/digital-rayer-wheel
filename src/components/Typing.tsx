"use client";

import React, { useState, useEffect, useRef } from "react";

import { angleState, reciteState } from "@/atoms/prayerWheelAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Typing: React.FC = () => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [index, setIndex] = useState(0);

  const setRecite = useSetRecoilState(reciteState);
  const angle = useRecoilValue(angleState);
  const roundAngle = Math.round(angle);

  const message =
    "観自在菩薩行深般若波羅蜜多時照見五蘊皆空度一切苦厄舎利子色不異空空不異色色即是空空即是色受想行識亦復如是舎利子是諸法空相不生不滅不垢不浄不増不減是故空中無色無受想行識無眼耳鼻舌身意無色声香味触法無眼界乃至無意識界無無明亦無無明尽乃至無老死亦無老死尽無苦集滅道無智亦無得以無所得故菩提薩埵依般若波羅蜜多故心無罣礙無罣礙故無有恐怖遠離一切顛倒夢想究竟涅槃三世諸仏依般若波羅蜜多故得阿耨多羅三藐三菩提故知般若波羅蜜多是大神呪是大明呪是無上呪是無等等呪能除一切苦真実不虚故説般若波羅蜜多呪即説呪曰羯諦羯諦波羅羯諦波羅僧羯諦菩提薩婆訶般若心経";

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Avoid updating the displayedMessage on initial render
    if (displayedMessage.length !== 0 || index === 0 && roundAngle!== 0) {
      setDisplayedMessage((prev) => prev + message[index]);
      setIndex((prevIndex) => (prevIndex + 1) % message.length);
    }
    if ((index + 1) === message.length) {
      setRecite((prevRecite) => (prevRecite + 1));
    }
    // Scroll the textarea to the bottom
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [roundAngle]); // Only run when roundAngle changes

  return (
    <textarea
      ref={textareaRef}
      className="bg-gray-100 p-4 w-full resize-none outline-none"
      rows={10}
      value={displayedMessage}
      readOnly
    />
  );
};

export default Typing;
