import { useEffect, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { motion } from "framer-motion";

interface HeaderProps {
   isPageLoaded: number;
}

const LINKS = ['HOME', 'ABOUT', 'PROJECTS', 'LETS LINK'];

export default function Header({ isPageLoaded }: HeaderProps) {
   
   const isFinished = isPageLoaded > 2;

   const [keepScrambling, setKeepScrambling] = useState(true);

   useEffect(() => {
      // Only start the countdown when the layout starts moving
      if (isFinished) {
         // Duration = Animation Time (1000ms) + Delay (500ms)
         const timer = setTimeout(() => {
            setKeepScrambling(false);
         }, 1500);

         return () => clearTimeout(timer);
      }
   }, [isFinished]);

   return (
      <>
         {isPageLoaded >= 2 && (
            <div className="fixed top-0 inset-x-0 mix-blend-difference px-10 z-50">
               <motion.div
                  layout
                  className="flex w-full py-10 items-center"
                  style={{ 
                     justifyContent: isFinished ? "space-between" : "center",
                     gap: isFinished ? "0px" : "40px" 
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
               >
                  
                  <motion.div 
                     layout 
                     className="whitespace-nowrap" 
                  >
                     <ScrambleText className="font-semibold" text="GIBRAN MAULANA" active={keepScrambling} />
                  </motion.div>

                  <motion.div
                     layout
                     className="flex gap-6 whitespace-nowrap" 
                  >
                     {LINKS.map((x, i) => (
                        <ScrambleText 
                           key={i} 
                           className="font-space text-tertiary hover:cursor-pointer" 
                           text={x} 
                           active={keepScrambling} 
                        />
                     ))}
                  </motion.div>

               </motion.div>
            </div>
         )}
      </>
   );
}