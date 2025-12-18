"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function BackgroundGrid() {
  // 1. Initialize mouse position at the center of the screen initially
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Efficiently update mouse position on move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Updates the motion value directly (no re-renders!)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3. Create the "Flashlight" mask
  // The '250px' controls how large the spotlight is.
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
       {/* LAYER: The Grid Pattern 
         This div is technically full-screen, but the 'maskImage' 
         hides everything except the circle around your mouse.
       */}
       <motion.div 
         className="absolute inset-0 bg-transparent opacity-20"
         style={{ 
            maskImage, 
            WebkitMaskImage: maskImage, // Safari support
            // This creates the dot pattern using CSS gradients
            backgroundImage: `radial-gradient(var(--color-tertiary) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", // Distance between dots
         }} 
       />
    </div>
  );
}