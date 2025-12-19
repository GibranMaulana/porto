"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { ScrambleText } from "@/components/ScrambleText";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  img: string;
  href: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "01",
    title: "FATISDA ORG. PROFILE",
    description: "Official profile for the Student Executive Board.",
    category: "NEXT.JS / SANITY",
    year: "2025",
    img: "/images/bemfatisdauns.png", 
    href: "/project/bem-profile"
  },
  {
    id: "02",
    title: "PINGFEST 2025 TICKETING",
    description: "High-traffic concert ticketing platform.",
    category: "LARAVEL / INERTIA / MOTION",
    year: "2025",
    img: "/images/pingfest.png",
    href: "/project/pingfest"
  },
  {
    id: "03",
    title: "FATISDA E-VOTING",
    description: "Secure real-time voting system for campus elections.",
    category: "LARAVEL / GSAP",
    year: "2025",
    img: "/images/pemilubemfatisdauns.png",
    href: "/project/evoting"
  },
];



export default function ProjectList() {

   const [projectOpened, setProjectOpened] = useState(false);
   const proConRef = useRef(null);

   const { scrollYProgress} = useScroll({
      target: proConRef,
      offset:  ['start end','end start']
   })

   const headerY = useTransform(scrollYProgress, [0, 0.5], ["-50px", "0px"]);
   const opacityHeader = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
   const hrScale = useTransform(scrollYProgress, [0, 0.5], ["0%" , "100%"]);


   
   return (
      <section className="min-h-screen py-20" ref={proConRef}>
         <div className="flex justify-between items-center overflow-hidden">
            <motion.h1 className="text-6xl" style={{y: headerY, opacity: opacityHeader}}>
               PROJECTS 
            </motion.h1>
            <motion.div style={{y: headerY, opacity: opacityHeader}} >
               <ScrambleText className="text-2xl font-space max-w-md text-end text-muted" text="LIST OF PROJECTS I BEEN WORKING ON" />
            </motion.div>    
         </div>
         <motion.hr className="text-tertiary" initial={{scaleX: 0}}style={{scaleX: hrScale}}/>
         <div className="border-y border-muted py-10 flex flex-col justify-center">
            <img src="/images/pemilubemfatisdauns.png" alt="images" className="w-50 sticky bottom-0 "/>
         </div>
      </section>
   )
}
