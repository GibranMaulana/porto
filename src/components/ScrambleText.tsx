'use client';
import { useRef, useState, useEffect, useCallback } from "react";

const CYCLES_PER_LETTER = 2; 
const SHUFFLE_SPEED = 40; 
const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  autoStart?: boolean; 
  active?: boolean; 
  hover?: boolean; 
}

export const ScrambleText = ({
  text,
  className = "",
  autoStart = false,
  active = false,
  hover = true,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const scrambleOnce = useCallback(() => {
    let pos = 0;

    clear();

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (pos / CYCLES_PER_LETTER > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        clear();
        setDisplayText(text);
      }
    }, SHUFFLE_SPEED);
  }, [clear, text]);

  const scrambleActive = useCallback(() => {
    clear();

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, SHUFFLE_SPEED);
  }, [clear, text]);

  useEffect(() => {
    if (autoStart) scrambleOnce();
    return clear;
  }, [autoStart, clear, scrambleOnce]);

  useEffect(() => {
    if (active) scrambleActive();
    else scrambleOnce();

    return clear;
  }, [active, clear, scrambleActive, scrambleOnce]);

  return (
    <p
      className={className}
      onMouseEnter={hover ? scrambleOnce : undefined}
      onMouseLeave={undefined}
    >
      {displayText}
    </p>
  );
};