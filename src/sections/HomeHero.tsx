import { ScrambleText } from "@/components/ScrambleText";
import { motion } from "motion/react";

export default function HomeHero() {

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
      hidden: { y: 1000},
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
                  animate="visible"
                  className="font-bold"
               >
                  <div className="pb-3 overflow-hidden flex items-center gap-4">
                     <motion.div variants={titleItem} className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></motion.div>
                     <motion.span variants={titleItem} className="block">
                        <ScrambleText text="AVAILABLE FOR FREELANCE" className="font-space text-accent block font-normal" />
                     </motion.span>
                  </div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-7xl block" >Design driven.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-8xl block">Logic backed.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-9xl block ">User <span className="font-normal font-space text-tertiary">FOCUSED.</span></motion.span></div>
               </motion.h1>
            </div>
         </div>
         <div className="absolute inset-x-0 bottom-0 px-10">
            <p className="">
               Specializing in <span className="font-space text-tertiary">UI</span>, and <span className="font-space text-tertiary">CREATIVE MOTION</span>. Pushing the limits of motion while respecting user focus.
            </p>
         </div>
      </section>
   );
}
   