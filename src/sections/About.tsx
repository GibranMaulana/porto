"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { GoArrowUpRight, GoDownload } from "react-icons/go";
import { ScrambleText } from "@/components/ScrambleText";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import { div } from "motion/react-client";

const SKILLS = [
  "NEXT.JS", "TYPESCRIPT / JAVASCRIPT", "TAILWIND", "FRAMER_MOTION",
  "NODE.JS", "POSTGRESQL", "LARAVEL", "SANITY", "GSAP", 
];

const EXPERIENCE = [
  { year: "DES 2025 - PRES", role: "FREELANCE DEVELOPER", company: "SELF_EMPLOYED" },
  { year: "JUN - AUG | 2025", role: "TECHNOLOGY STAFF", company: "PINGFEST"},
  { year: "JAN - DES | 2025", role: "TECHNOLOGY DEVELOPMENT STAFF", company: "BEM_FATISDA_UNS" },
];

const PROFILE = [
   {label: "NAME", value: "GIBRAN MAULANA AZMI"},
   {label: "ROLE", value: "FRONTEND DEVELOPER"},
   {label: "LOCATION", value: "JAKARTA, ID"},
   {label: "EDUCATION", value: "COMP-SCI, UNS"},
]

interface BioStatData {
   label: string,
   value: string, 
   variants: Variants
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

   const { scrollYProgress: revealFooterProgress } = useScroll({
      target: containerRef,
      offset: ['end end', 'end start'],
   }) 
   
   const revealFooter = useTransform(revealFooterProgress, [0, 1], ["0px", "-100dvh"]);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const [isShowedBio, setIsShowedBio] = useState(true);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      id="about" 
      ref={containerRef} 
      className="min-h-screen py-20 px-4 md:px-10 bg-primary text-secondary overflow-hidden relative z-10 border-b border-tertiary"
      style={{ y: revealFooter }}
    >
      
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-tertiary/30 pb-6 mb-12">
         <motion.div style={{ opacity }} className="flex flex-col">
            <h2 className="text-6xl md:text-8xl font-manrope uppercase leading-none">
               PROFILE
            </h2>
         </motion.div>
         
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
         
         <div className="md:col-span-8 flex flex-col justify-between min-h-[300px] border border-muted/20 p-6 md:p-10 relative group">
            <div className="flex items-center justify-between">
               <ScrambleText className="font-space text-xs text-tertiary uppercase tracking-widest" text="BIO" />
               <div className="flex border border-tertiary text-sm hover:cursor-pointer" >
                  <div onClick={() => setIsShowedBio(false)} className={`font-space ${!isShowedBio ? "bg-tertiary text-primary" : "bg-primary text-tertiary"} px-2`}>
                     <ScrambleText text="PROFILE" />
                  </div>
                  <div onClick={() => setIsShowedBio(true)} className={`font-space ${isShowedBio ? "bg-tertiary text-primary" : "bg-primary text-tertiary"} px-2`} >
                     <ScrambleText text="BIO" hover={true} />
                  </div>
               </div>
            </div>

            {isShowedBio ? (
               <p className="text-2xl md:text-4xl font-manrope leading-tight indent-12">
                  I am a <span className="font-space text-tertiary uppercase">web developer</span> focused on building scalable systems with motion-driven interfaces. 
                  bridging the gap between <span className="font-space uppercase text-tertiary">FUNCTIONALITY</span> and <span className="font-space uppercase text-tertiary">fluid interaction</span>.
               </p>
            ) : (
               <motion.div 
                  className="text-sm sm:text-base lg:text-2xl"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: "all"}}>
                  {PROFILE.map((x, i) => (
                     <BioStat key={i} label={x.label} value={x.value} variants={itemVariants} /> 
                  ))}
               </motion.div>
            )}

            <div className="mt-8 flex gap-4">
               <div className="h-px bg-secondary flex-1 self-center" />
               <span className="font-space text-xs text-tertiary">BASED IN INDONESIA</span>
            </div>
         </div>


         <div className="place-content-center md:col-span-4 border border-muted/20 bg-secondary/5 relative max-h-none sm:max-h-52 lg:max-h-none overflow-hidden group min-h-[300px] max-w-none sm:max-w-52 lg:max-w-none">
            <img 
               src="/images/photo-profile-2.jpeg" 
               alt="Profile" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            />
            
            <ScanlineOverlay />
            <div className="absolute bottom-4 left-4 bg-tertiary text-primary px-3 py-1 font-space text-xs font-bold uppercase z-20">
               Status: Student At Sebelas Maret University
            </div>
         </div>


         <div className="md:col-span-5 border border-muted/20 p-6 md:p-8 flex flex-col">
            <ScrambleText className="font-space text-xs text-tertiary uppercase tracking-widest mb-6" text="TECT_STACK" />
            
            <div className="flex flex-wrap gap-2 content-start">
               {SKILLS.map((skill, i) => (
                  <motion.span 
                     key={skill}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="px-3 py-1.5 border border-secondary/20 text-xs font-space hover:bg-tertiary hover:text-primary hover:border-tertiary cursor-default transition-colors"
                  >
                    <ScrambleText text={skill} />
                  </motion.span>
               ))}
            </div>
         </div>


         <div className="md:col-span-7 border border-muted/20 p-6 md:p-8 flex flex-col justify-between">
            <ScrambleText className="font-space text-xs text-tertiary uppercase tracking-widest mb-6" text="RUNTIME_HISTORY" />
            
            <div className="flex flex-col gap-6">
               {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-muted/10 pb-4 group cursor-default">
                     <div>
                        <h4 className="font-manrope text-xl font-bold group-hover:text-tertiary transition-colors">{exp.role}</h4>
                        <span className="font-space text-xs text-accent">{exp.company}</span>
                     </div>
                     <span className="font-space text-sm font-bold mt-2 md:mt-0">{exp.year}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>
    </motion.section>
  );
}

function BioStat({label, value, variants}: BioStatData) {

   return (
      <motion.div 
         className="flex gap-2"
         variants={variants}
      >
         <p className="font-space">{label + ":"} </p>
         <ScrambleText className="font-space text-tertiary" text={value} />
      </motion.div>
   )
}