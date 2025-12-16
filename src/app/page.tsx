'use client'

import HomeHero from "@/sections/HomeHero";
import About from "@/sections/About";
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";

export default function Home() {
   //harusnya font
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
         <Preloader isPageLoaded={isPageLoaded} />
         <HomeHero isPageLoaded={isPageLoaded} />
         <About />
      </>
   );
}
