"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, easeInOut, useSpring, useMotionValue } from "framer-motion";
import { ScrambleText } from "@/components/ScrambleText";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { useMediaQuery } from "@/Hooks/useMediaQuery";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  img: string;
  href: string;
  role: string[];
}

const PROJECTS: ProjectData[] = [
  {
    id: "01",
    title: "BEM FATISDA",
    description: "Official profile for the Student Executive Board.",
    category: "NEXT.JS / SANITY",
    year: "2025",
    img: "/images/bemfatisdauns.png", 
    href: "https://bemfatisdauns.id",
    role: ['FRONTEND', 'CMS INTEGRATION']
  },
  {
    id: "02",
    title: "PINGFEST 2025",
    description: "High-traffic concert ticketing platform.",
    category: "LARAVEL / MOTION / LENIS",
    year: "2025",
    img: "/images/pingfest.png",
    href: "https://pingfest.id",
    role: ['FULLSTACK'],
  },
  {
    id: "03",
    title: "FATISDA E-VOTING",
    description: "Secure real-time voting system for campus elections.",
    category: "LARAVEL / GSAP",
    year: "2025",
    img: "/images/pemilubemfatisdauns.png",
    href: "https://pemilu.bemfatisdauns.id",
    role: ["FRONTEND", "INTERACTION DESIGN" ]
  },
];


export default function Project() {
   const isMobile = useMediaQuery("(max-width: 640px)");
   const proConRef = useRef(null);

   const { scrollYProgress: titleScrollProgress} = useScroll({
      target: proConRef,
      offset: ['start end','start center']
   })

   const headerY = useTransform(titleScrollProgress, [0, 1], ["-50px", "0px"]);
   const opacityHeader = useTransform(titleScrollProgress, [0, 1], [0, 1]);

   const [isAsList, setIsAsList] = useState(false);
   const toggleList = (value: boolean) => {
      setIsAsList(value);
   }

   return (
      <motion.section 
         className="py-20 my-10 px-2 sm:px-10"
         initial={{ y: 0}}
         exit={{ y: "200%" }}
         viewport={{ 
            once: false,
            margin: "0px 0px -80% 0px"
         }}
         ref={proConRef}>
         <motion.div 
            layout
            className={`${isAsList ? "" : "sticky top-5"}` + " z-40 py-2 flex justify-between items-center overflow-hidden mb-5"}
            >
            <motion.h1 
               className="text-4xl md:text-8xl font-manrope font-bold uppercase leading-none" 
               style={{
                  y: headerY, 
                  opacity: opacityHeader,
               }}
               initial={{color: "var(--color-secondary)"}}
               whileInView={{
                  backgroundColor: isAsList ? "" : "var(--color-tertiary)", 
                  color: isAsList ? "" : "var(--color-primary)",
               }}
               viewport={{
                  once: false,
                  margin: "0px 0px -90% 0px",
               }}
            >
               PROJECTS 
            </motion.h1>
            <motion.div className="relative flex justify-between hover:cursor-pointer border border-tertiary backdrop-blur-xl" style={{y: headerY, opacity: opacityHeader}} >
               <motion.div 
                  layout
                  className="absolute inset-y-0 bg-tertiary w-1/2  mix-blend-difference border border-tertiary"
                  animate={isAsList ? {right: 0} : {}}
               />
               <motion.div className={`font-space text-tertiary px-2`} onClick={() => toggleList(false)}>
                  <p>
                     GRID
                  </p>
               </motion.div>
               <motion.div className={`font-space text-tertiary px-2`} onClick={() => toggleList(true)}>
                  <p>
                     LIST
                  </p>
               </motion.div>
            </motion.div>    
         </motion.div>
         <div className={`flex flex-col ${isAsList ? "" : "gap-6 sm:gap-50"} px-2 md:px-10`}>
            {isAsList ? (
               PROJECTS.map((x) => (
                  <ProjectList 
                     key={x.id}
                     {...x}
                  />
               ))
               
            ) : (
               PROJECTS.map((x) => (
                  <ProjectGrid
                     key={x.id}
                     {...x}
                  />
               ))
            )}
         </div>
      </motion.section>
   )
}

function ProjectGrid({id, img, title, href, description, role, category } : ProjectData) {
   const isMobile = useMediaQuery("(max-width: 640px)");
   const ref = useRef(null);
   const { scrollYProgress: sectionScroll } = useScroll({
      target: ref,
      offset: ['start end', 'center center'],
   })

   const {scrollYProgress: itemsProgress} = useScroll({
      target:ref,
      offset: ['start end', 'end start']
   })


   const paralaxEffectCard = useTransform(itemsProgress, [0, 1], ["100px", "-100px"])

   const cardRef = useRef(null);
   const { scrollYProgress: cardEffect} = useScroll({
      target:cardRef,
      offset: ['start end', 'end center']
   });

   const lineRef = useRef(null);
   const { scrollYProgress: lineEffect} = useScroll({
      target: lineRef,
      offset: ['start center', 'end center']
   })

   const smoothScale = useSpring(sectionScroll, {
      stiffness: 50, 
      damping: 20,
      restDelta: 0.001
   })

   const [isHoveringSection, setIsHoveringSection] =  useState(false);

   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   const handleMouseMove = (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
   }

   const imageScale = useTransform(smoothScale, [0, 1], [0.8, 1], {ease: easeInOut})
   const overlayOpacity = useTransform(smoothScale, [0, 0.8], [1, 0]);
   const scrambleOverlay = useTransform(smoothScale, [0, 0.7], [false, true])

   const springConfig = { damping: 50, stiffness: 400, mass: 1 };
   const cursorX = useSpring(mouseX, springConfig);
   const cursorY = useSpring(mouseY, springConfig);

   const cardOverlay = useTransform(cardEffect, [0, 0.5], [1, 0]);
   const lineProgress = useTransform(lineEffect, [0, 0.3], [0, 1]);

   return (
      <motion.div ref={ref} className="py-2 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-muted/10">
         <motion.div 
            className="relative flex h-[300px] md:h-[450px] overflow-hidden"
            style={{ y: paralaxEffectCard }}
         >
            <motion.img 
               src={img} 
               alt={title} 
               className="w-full h-full object-cover origin-bottom-right transform-gpu will-change-transform" 
               style={{scale: imageScale}}
            />
            
            <motion.div 
               style={{ opacity: overlayOpacity, scale: imageScale }}
               className="flex justify-center items-center absolute inset-0 z-10 bg-tertiary origin-bottom-right text-primary transform-gpu will-change-transform" 
            >
               {scrambleOverlay && (
                  <ScrambleText text="REDACTED" active={true} className="text-5xl font-space text-primary" />
               )}
            </motion.div>
         </motion.div>

         <Link 
            className="flex flex-col h-full md:pl-10 relative overflow-hidden"
            href={href}
            target="_blank"
            onMouseEnter={() => setIsHoveringSection(true)}
            onMouseLeave={() => setIsHoveringSection(false)}
            onMouseMove={handleMouseMove}> 

            <AnimatePresence>
               {isHoveringSection && (
                  <motion.div
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: -20, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                     style={{
                        position: "fixed", 
                        left: cursorX,
                        top: cursorY,
                        y: "10%",
                        zIndex: 50, 
                        pointerEvents: "none" 
                     }}
                     className="flex items-center justify-centers gap-2 bg-tertiary text-primary border border-tertiary font-space text-xs px-4 py-2 uppercase tracking-widest whitespace-nowrap shadow-xl"
                  >
                     <div className="animate-pulse bg-primary size-2 rounded-full "></div>LIVE DEMO
                  </motion.div>
               )}
            </AnimatePresence>

            <motion.div 
               ref={lineRef}
               className={`absolute left-0 top-0 bottom-0 w-px bg-tertiary origin-top z-30 ${isMobile ? "opacity-0" : ""}`}
               style={{scaleY: lineProgress}}
            />
            <motion.div 
               ref={cardRef}
               className="absolute inset-0 bg-primary z-20 origin-left"
               style={{ scaleX: cardOverlay}}
            />
            
            <div className="flex justify-between items-start mb-4 relative z-0">
               <span className="font-space text-tertiary text-xs sm:text-base">/{id}</span>
               <span className="font-space bg-tertiary px-2 py-0.5 text-primary text-xs sm:text-base">
                  {category}
               </span>
            </div>
            
            <div className="grow flex items-center relative z-0">
               <h2 className="text-3xl md:text-7xl font-manrope uppercase leading-[0.85] text-secondary break-words">
                  {title}
               </h2>
            </div>
            
            <div className="border-t border-tertiary font-space pt-6 mt-6 grid grid-cols-2 gap-4 relative z-0">
               <div>
                  <span className="block uppercase tracking-widest text-accent text-xs sm:text-base mb-1">Roles</span>
                  <div className="flex flex-col font-space text-xs sm:text-base text-secondary">
                     {role.map((r) => <span key={r}>{r}</span>)}
                  </div>
               </div>
               <div className="flex flex-col justify-between">
                  <span className="block uppercase tracking-widest text-accent text-xs sm:text-base mb-1">Brief</span>
                  <p className="font-manrope leading-relaxed text-secondary/80 text-xs sm:text-base">
                     {description}
                  </p>
               </div>
            </div>

         </Link>
      </motion.div>
   )
}

function ProjectList({ id, img, title, href, role, category, year }: ProjectData) {
  return (
    <Link href={href} className="block w-full">
      <motion.div 
        className="group relative w-full border-b border-muted/20 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300 hover:bg-tertiary hover:text-primary px-2 md:px-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-baseline gap-2 md:gap-12 relative z-20">
           <span className="font-space text-xs text-muted group-hover:text-primary/60 transition-colors">
              /{id}
           </span>
           <h3 className="text-3xl md:text-5xl font-manrope uppercase group-hover:translate-x-4 transition-transform duration-300">
              {title}
           </h3>
        </div>

        <div className="flex items-center gap-4 md:gap-12 md:pr-4 relative z-20">
           <div className="hidden md:flex flex-col items-end text-right">
              <span className="font-space text-[10px] uppercase tracking-widest opacity-60">Tech</span>
              <span className="font-space text-xs font-bold">{category}</span>
           </div>
           <div className="hidden lg:flex flex-col items-end text-right">
              <span className="font-space text-[10px] uppercase tracking-widest opacity-60">Role</span>
              <span className="font-space text-xs font-bold">{role[0]}</span>
           </div>
           <span className="font-space text-xs border border-tertiary px-3 py-1 group-hover:border-primary/40">
              {year}
           </span>
           <GoArrowUpRight className="text-3xl transition-transform duration-300 group-hover:rotate-45" />
        </div>

        <div className="absolute right-32 top-1/2 -translate-y-1/2 w-64 h-32 hidden lg:block pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:translate-x-[-20px] rotate-2 group-hover:rotate-0">
            <div className="w-full h-full overflow-hidden border border-primary shadow-2xl bg-gray-900">
                <img 
                    src={img} 
                    alt={title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0" 
                />
            </div>
        </div>

      </motion.div>
    </Link>
  );
}