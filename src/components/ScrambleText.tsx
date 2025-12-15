'use client';
import { useRef, useState, useEffect } from "react";

const CYCLES_PER_LETTER = 2; // How many "scrambles" before fixing a letter
const SHUFFLE_SPEED = 30; // Milliseconds between updates (lower = faster)
const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  autoStart?: boolean; // Added: Trigger on load (Darkroom style)
}

export const ScrambleText = ({ text, className = "", autoStart = false }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;

    // Clear previous interval if user hovers again quickly
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("").map((char, index) => {
        // 1. PRESERVE SPACES (The "Darkroom" Polish)
        // If the original char is a space, keep it a space. 
        // This maintains the word shape while scrambling.
        if (char === " ") return " ";

        // 2. RESOLVE LOGIC
        // If we've passed this index, show the real character
        if (pos / CYCLES_PER_LETTER > index) {
          return char;
        }

        // 3. RANDOM CHAR
        const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        return randomChar;
      }).join("");

      setDisplayText(scrambled);
      pos++;

      // Stop condition: If we've cycled past the entire length
      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_SPEED);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text); // Ensure we end on the clean text
  };

  // Handle autoStart prop
  useEffect(() => {
    if (autoStart) {
      scramble();
    }
    // Cleanup on unmount
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoStart]);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
    >
      {displayText}
    </span>
  );
};