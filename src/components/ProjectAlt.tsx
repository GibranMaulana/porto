"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, easeIn, easeInOut, useSpring } from "framer-motion";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { ScrambleText } from "@/components/ScrambleText";
import { PixelateFilter, PixelatedBackground } from "@/components/Pixelated";

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
    href: "/project/bem-profile",
    role: ['FRONTEND', 'CMS INTEGRATION']
  },
  {
    id: "02",
    title: "PINGFEST 2025",
    description: "High-traffic concert ticketing platform.",
    category: "LARAVEL / INERTIA / MOTION",
    year: "2025",
    img: "/images/pingfest.png",
    href: "/project/pingfest",
    role: ['FULLSTACK'],
  },
  {
    id: "03",
    title: "FATISDA E-VOTING",
    description: "Secure real-time voting system for campus elections.",
    category: "LARAVEL / GSAP",
    year: "2025",
    img: "/images/pemilubemfatisdauns.png",
    href: "/project/evoting",
    role: ["FRONTEND", "INTERACTION DESIGN" ]
  },
];



export default function ProjectList() {

   const [projectOpened, setProjectOpened] = useState(false);
   const proConRef = useRef(null);
   const projectItemRef = useRef(null);

   const { scrollYProgress: titleScrollProgress} = useScroll({
      target: proConRef,
      offset:  ['start end','start center']
   })

   
   const headerY = useTransform(titleScrollProgress, [0, 1], ["-50px", "0px"]);
   const opacityHeader = useTransform(titleScrollProgress, [0, 1], [0, 1]);
   const hrScale = useTransform(titleScrollProgress, [0, 0, 1], [0, 0, 1]);

   // const debug = useTransform(scrollYProgress, [0, 1], [0, 1], {ease: easeInOut});
   
   return (
      <motion.section layout className="min-h-screen" ref={proConRef}
                      


                     //  whileInView={{ position: "sticy"}}
                      >
         {/* some debug shit
         {/* <motion.h1 className="text-white fixed inset-0">{debug}</motion.h1> */}
         {/* <motion.div className="flex flex-col sticky top-32 z-30">
            <div className="flex justify-between items-center overflow-hidden">
               <motion.h1 className="text-6xl" style={{y: headerY, opacity: opacityHeader}}>
                  PROJECTS 
               </motion.h1>
               <motion.div style={{y: headerY, opacity: opacityHeader}} >
                  <h2 className="text-2xl font-space max-w-md text-end text-muted">
                     PROJECTS LOG
                  </h2>
               </motion.div>    
            </div>
            <motion.hr className="text-tertiary text-center my-10" initial={{scaleX: 0}} style={{scaleX: hrScale}}/>
         </motion.div>
         <div className="flex flex-col gap-10">
            {PROJECTS.map((x) => (
               <ProjectItem 
                  key={x.id}
                  id={x.id}
                  img={x.img}
                  title={x.title}
                  href={x.href}
                  description={x.description}
                  category={x.category}
                  year={x.year}
                  role={x.role} />
            ))}
         </div> */} 
            {PROJECTS.map((x) => (
               <ProjectItem 
                  key={x.id}
                  id={x.id}
                  img={x.img}
                  title={x.title}
                  href={x.href}
                  description={x.description}
                  category={x.category}
                  year={x.year}
                  role={x.role} />
            ))}
      </motion.section>
   )

   function ProjectItem({id, img, title, href, description, role, category } : ProjectData, ) {
      const { scrollYProgress: sectionScroll } = useScroll({
         target: projectItemRef,
         offset: ['end end', 'center center'],
      })

      const smoothScale = useSpring(sectionScroll, {
         stiffness: 100,
         damping: 20,
         restDelta: 0.001
      })

      const imageScale = useTransform(smoothScale, [0, 0.7], [0.2,1], {ease: easeInOut})
      const overlayOpacity = useTransform(smoothScale, [0, 0.7], [0.8, 0]);

      return (
         <motion.div key={id} ref={projectItemRef} className="relative min-h-screen py-10 grid grid-cols-2 gap-10 top-32"
                     layout
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1, position: "sticky"}}
                     viewport={{
                        once: false,
                        amount: 0.2,
                     }}>
            {/* <div className="absolute inset-0 min-h-screen z-10">
               <motion.img src={img} alt={title} className="w-full origin-bottom-right"/>
            </div> */}
            <div className="flex flex-col justify-between text-end z-20">
               <h2 className="text-5xl text-center bg-tertiary font-space text-primary inline-block">{title}</h2>
               <div className="flex flex-row justify-between">
                  <div className="font-space text-accent">{role.join(" // ")}</div>
                  <div className="font-space">{category}</div>
               </div>
               {/* <div className="">
                  <p className="">{description}</p>
               </div> */}
               <div>
                  <p className="font-space uppercase">{description}</p>
               </div>
            </div>
         </motion.div>
      )
   }
}

