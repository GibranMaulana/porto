import BackgroundGrid from "@/components/BackgroundGrid";
import Button from "@/components/Button";
import { ScrambleText } from "@/components/ScrambleText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HomeHeroProps {
   isPageLoaded: number
}

export default function HomeHero({isPageLoaded}: HomeHeroProps) {

   const titleContainer = {
      hidden: { 
         opacity: 0,
         display: "none"
      },
      visible: { 
         opacity: 1,
         display: "",
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

   const sectionRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ['start start', 'end start']
   });

   const titleMove = useTransform(scrollYProgress,[0.1, 0.3],["0px", "-100px"])
   const titleFade = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
   const heroButtonFade = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
   const subtitleFade = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
   const subtitleMove = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-200%"]);
   // const debug = useTransform(scrollYProgress, [0, 1], [0, 1])


   return (
      <section className="min-h-screen flex items-center" ref={sectionRef}>
         {/* <motion.h1 className="text-white fixed inset-0">{debug}</motion.h1> */}
         <BackgroundGrid />
         <div className="">
            <div>
               <motion.h1
                  initial="hidden" 
                  variants={titleContainer}
                  animate={isPageLoaded ? 'visible' : 'hidden'}
                  style={{y: titleMove, opacity: titleFade}}
                  viewport={{
                     once: false,
                     amount: 0.8
                  }}
               >
                  <motion.div className="pb-3 overflow-hidden gap-4">
                     <motion.div variants={titleItem} className="flex items-center gap-3">
                        <motion.div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></motion.div>
                        <motion.span className="block">
                           <ScrambleText text="AVAILABLE_FOR_FREELANCE" className="font-space text-accent block font-normal" />
                        </motion.span>
                     </motion.div>
                  </motion.div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-7xl block" >Design driven.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-8xl block">Logic backed.</motion.span></div>
                  <div className="pb-3 overflow-hidden"><motion.span variants={titleItem} className="text-9xl block ">User <span className="font-normal font-space text-tertiary">FOCUSED.</span></motion.span></div>
               </motion.h1>
               <div className="overflow-hidden">
                  <motion.div 
                     className="flex gap-6 text-lg py-10 overflow-hidden" 
                     style={{ opacity: heroButtonFade}}
                     initial={{ y: "120%"}}
                     animate={isPageLoaded ? { y:0} : {} }
                     transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3 ,1] as const}}>
                     <Button
                        text="INITIATE_COLLAB"
                        href="#footer"
                        className="font-space text-primary bg-tertiary inline-block"
                     />
                     <Button 
                        text="VIEW_PROJECTS" 
                        href="#projectsSection"
                        className="font-space border border-tertiary text-tertiary inline-block"
                     />
                  </motion.div>
               </div>
            </div>
         </div>
         <div className="absolute inset-x-0 bottom-0 px-10">
            <motion.p 
               style={{ opacity: subtitleFade, y: subtitleMove}}
               className="text-end text-xl"
               initial={{ y:"200%" }}
               animate={{ y:0}}
               transition= {{ duration: 1, ease: [0.16, 1, 0.3 ,1] as const , delay: 1.5}} 
               >
               Specializing in <span className="font-space text-tertiary">UI</span>, and <span className="font-space text-tertiary">CREATIVE_MOTION</span>. Pushing the limits of motion while respecting user focus.
            </motion.p>
         </div>
      </section>
   );
}
   