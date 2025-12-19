import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

interface HeaderProps {
   isPageLoaded: number;
}

const LINKS = ['HOME', 'PROJECTS', 'ABOUT', 'LETS_LINK'];


export default function Header({ isPageLoaded }: HeaderProps) {

   const [isScrolled, setIsScrolled] = useState(false);
   const { scrollY } = useScroll();
   useMotionValueEvent(scrollY, 'change', (latest) => {
      const hasScrolled = latest > 20;

      if(isScrolled !== hasScrolled) {
         setIsScrolled(hasScrolled);
      }
   })

   const textStyle = isScrolled ? 'text-primary bg-tertiary px-2' : 'text-tertiary';

   const isFinished = isPageLoaded > 2;

   const [keepScrambling, setKeepScrambling] = useState(true);

   useEffect(() => {

      if (isFinished) {
         const timer = setTimeout(() => {
            setKeepScrambling(false);
         }, 1500);

         return () => clearTimeout(timer);
      }
   }, [isFinished]);

   return (
      <>
         {isPageLoaded >= 2 && (
            <motion.header className="fixed top-0 inset-x-0 mix-blend-difference px-10 z-50">
               <motion.div
                  layout
                  className="relative flex w-full py-10 items-center"
                  style={{ 
                     paddingTop: isScrolled ? "20px" : "40px",
                     paddingBottom: isScrolled ? "20px" : "40px",
                     justifyContent: isFinished ? "space-between" : "center",
                     gap: isFinished ? "0px" : "40px" 
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
               >
                  
                  <AnimatePresence>
                     {isScrolled && (
                        <motion.hr 
                           className="absolute inset-0 text-tertiary scale-x-100 origin-center self-center z-0"
                           initial={{opacity: 0}}
                           animate={{opacity: 1}}
                           exit={{opacity: 0, transition: {duration: 0.2}}}
                           transition={{duration: 0.5, delay: 0.2}} />
                     )}
                  </AnimatePresence>
                  <motion.div 
                     layout 
                     className="whitespace-nowrap z-10" 
                  >
                     <ScrambleText className={`font-space ${textStyle} z-10`} text="GIBRAN_MAULANA" active={keepScrambling} />
                  </motion.div>
                  <motion.div
                     layout
                     className="flex gap-6 whitespace-nowrap" 
                  >
                     {LINKS.map((x, i) => (
                        <ScrambleText 
                           key={i} 
                           className={`font-space ${textStyle} hover:cursor-pointer z-10`} 
                           text={x} 
                           active={keepScrambling} 
                        />
                     ))}
                  </motion.div>

               </motion.div>
            </motion.header>
         )}
      </>
   );
}