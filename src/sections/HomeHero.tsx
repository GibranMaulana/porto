import { ScrambleText } from "@/components/ScrambleText";
import { easeIn, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HomeHeroProps {
   isPageLoaded: boolean
}

export default function HomeHero({isPageLoaded}: HomeHeroProps) {

   const titleContainer = {
      hidden: { opacity: 0},
      visible: { 
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
         }
      }
   }

   const titleItem = {
      hidden: { y: "200%"},
      visible: { 
         y: 0,
         transition: { duration: 1, ease: [0.16, 1, 0.3 ,1] as const}
      }
   }

   

   return (
      <section className="min-h-screen flex items-center">
         <div className="">
            <div>
               <motion.h1
                  initial="hidden" 
                  variants={titleContainer}
                  animate={isPageLoaded ? 'visible' : 'hidden'}
                  className=""
                  viewport={{
                     once: false,
                     amount: 0.8
                  }}
               >
                  <motion.div className="pb-3 overflow-hidden gap-4">
                     <motion.div variants={titleItem} className="flex items-center gap-3">
                        <motion.div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></motion.div>
                        <motion.span className="block">
                           <ScrambleText text="AVAILABLE FOR FREELANCE" className="font-space text-accent block font-normal" />
                        </motion.span>
                     </motion.div>
                  </motion.div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-7xl block" >Design driven.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-8xl block">Logic backed.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-9xl block ">User <span className="font-normal font-space text-tertiary">FOCUSED.</span></motion.span></div>
               </motion.h1>
            </div>
         </div>
         <div className="absolute inset-x-0 bottom-0 px-10">
            <motion.p 
               className="text-end"
               initial={{ y:"200%" }}
               animate={{ y:0}}
               transition= {{ duration: 1, ease: [0.16, 1, 0.3 ,1] as const , delay: 1.5}} 
               >
               Specializing in <span className="font-space text-tertiary">UI</span>, and <span className="font-space text-tertiary">CREATIVE MOTION</span>. Pushing the limits of motion while respecting user focus.
            </motion.p>
         </div>
      </section>
   );
}
   