'use client'
import Image from "next/image";
import { motion } from "motion/react";
import HomeHero from "@/sections/HomeHero";
import About from "@/sections/About";

export default function Home() {
   return ( 
      <>
         <HomeHero />
         <About />
      </>
   );
}
