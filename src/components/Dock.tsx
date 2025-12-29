import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { AiOutlineSpotify } from "react-icons/ai";
import { GoMoon } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useTheme } from "next-themes";
import useIsScrolling from "@/Hooks/useIsScrolling";

export default function Dock() {
   const [mounted, setMounted] = useState(false);
   const [isDockOpen, setIsDockOpen] = useState(false); 
   const [isGithubOpen, setIsGithubOpen] = useState(false);
   const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
   const { theme, setTheme, resolvedTheme } = useTheme();
   const isScrolling = useIsScrolling(1000);

   
   useEffect(() => {
      const t = setTimeout(() => setMounted(true), 0);
      return () => clearTimeout(t);
   }, []);

   const isDark = resolvedTheme === "dark";
  
   if (!mounted) {
      return <div className="size-6 bg-transparent" />; 
   }
   
   const toggleTheme = () => {
      setTheme(isDark ? "light" : "dark");
   };
   
   const dockContainer = {
      hidden: {
         opacity: 0,
         x: "120%"
      },
      visible: {
         opacity: 1,
         x: 0
      },
      exit: {
         opacity: 0,
         y: 20
      }
   }

   return (
      <motion.div
         layout
         className="flex flex-col fixed right-0 pr-5 justify-center z-30 min-h-screen"
         >
         <AnimatePresence mode="wait">
            {isDockOpen ? (

               <motion.div
                  key="dock-container"
                  initial="hidden"
                  variants={dockContainer}
                  animate="visible"
                  exit="exit"
                  className="bg-tertiary text-tertiary flex flex-col gap-3 p-2 rounded-sm"
                  >
                     
                     <motion.div 
                        className="p-2 bg-tertiary hover:cursor-pointer flex justify-center items-center" 
                        onClick={() => setIsDockOpen(false)}
                        >
                        <IoClose className="text-primary size-6" />
                     </motion.div>

                     <motion.div 
                        className="p-2 bg-primary hover:cursor-pointer overflow-hidden flex" 
                        onClick={() => toggleTheme()}
                        >
                        <AnimatePresence mode="wait">
                           {isDark ? (
                              <motion.div
                                 key="moon"
                                 initial={{ opacity: 0, x: 40}}
                                 animate={{opacity: 1, x: 0}}
                                 exit={{ opacity: 0, x: -40}}>
                                 <GoMoon className="size-6" />
                              </motion.div>

                           ) : (
                              <motion.div
                                 key="sun"
                                 initial={{ opacity: 0, x: 40}}
                                 animate={{opacity: 1, x: 0}}
                                 exit={{ opacity: 0, x: -40}}
                                 >
                                 <GoSun className="size-6"/>
                              </motion.div>
                           )}
                        </AnimatePresence>
                        
                     </motion.div>
                     <motion.div 
                        className="bg-primary p-2"
                        
                        >
                        <FaGithub className="size-6" />
                     </motion.div>
                     <motion.div 
                        className="bg-primary p-2"
                        >
                        <AiOutlineSpotify className="size-6" />
                     </motion.div>      
               </motion.div>
            ) : (
               <motion.p 
                  className="[writing-mode:vertical-rl] font-space text-primary px-2 bg-tertiary hover:cursor-pointer"
                  initial={{ opacity: 0, x:20}}
                  animate={{ opacity: isScrolling ? 0 : 1, x: isScrolling ? 20 : 0}}
                  exit={{ opacity: 0, x:20}}
                  onClick={() => setIsDockOpen(true)}
                  
                  >
                  DOCK
               </motion.p>
            )}
         </AnimatePresence>
            
      </motion.div>
   )
}

