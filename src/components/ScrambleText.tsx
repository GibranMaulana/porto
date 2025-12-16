'use client';
import { useRef, useState, useEffect, useCallback } from "react";

const CYCLES_PER_LETTER = 2; // How many "scrambles" before fixing a letter
const SHUFFLE_SPEED = 30; // Milliseconds between updates (lower = faster)
const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  autoStart?: boolean; // Start once on mount (still respects stop)
  active?: boolean; // If true, keep scrambling until you set it false
  hover?: boolean; // Enable/disable hover triggers
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

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(text);
  }, [text]);

  const scramble = useCallback(() => {
    let pos = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";

          // If active, never "resolve" characters permanently.
          // This keeps the text visibly scrambling forever.
          if (!active && pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);

      // Only progress the resolve position in one-shot mode
      if (!active) pos++;

      if (!active && pos >= text.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_SPEED);
  }, [active, stopScramble, text]);

  useEffect(() => {
    if (autoStart) scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoStart, scramble]);

  useEffect(() => {
    if (active) scramble();
    else stopScramble();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active, scramble, stopScramble]);

  return (
    <span
      className={className}
      onMouseEnter={hover ? scramble : undefined}
      onMouseLeave={hover ? stopScramble : undefined}
    >
      {displayText}
    </span>
  );
};