'use client'

import HomeHero from "@/sections/HomeHero";
import About from "@/sections/About";
import { useEffect, useState } from "react";

export default function Home() {

   const [isPageLoaded, setIsPageLoaded] = useState(false);

      useEffect(() => {
         const handleLoad = () => {
            setIsPageLoaded(true);
         }

         if(document.readyState == "complete") {
            handleLoad();
         } else {
            window.addEventListener('load', handleLoad)
         }

         return () => {
            window.removeEventListener('load', handleLoad)
         }
      }, [])

   return ( 
      <>
         <HomeHero isPageLoaded={isPageLoaded} />
         <About />
      </>
   );
}
