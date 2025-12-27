'use client'

import HomeHero from "@/sections/HomeHero";
import About from "@/sections/About";
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Dock from "@/components/Dock";
import ProjectList from "@/sections/Projects";
import ContactSection from "@/sections/Contact";

export default function Home() {
   //NOTE: 1=masih blank, 2=preloader muncul, 3=content muncul 
   const [isPageLoaded, setIsPageLoaded] = useState(1);

      useEffect(() => {
         const startLoadingStage = async () => {

            await document.fonts.ready;
            setTimeout(() => {
               setIsPageLoaded(2);
            }, 200)

            const handleContentLoaded = () => {
               setTimeout(() => {
                  setIsPageLoaded(3);
               }, 3000);
            };

            if(document.readyState == "complete") {
               handleContentLoaded();
            } else {
               window.addEventListener('load', handleContentLoaded);
            }
   
            return () => {
               window.removeEventListener('load', handleContentLoaded);
            }
         };
         
         startLoadingStage();

      }, [])

   return ( 
      <>
         <Preloader isPageLoaded={isPageLoaded} />
         <Header isPageLoaded={isPageLoaded} />
         {isPageLoaded > 2 && (
            <>
               <Dock />
               <HomeHero isPageLoaded={isPageLoaded} />
               <ProjectList />
               <About />
               {/* <ContactSection /> */}
            </>
         )}
      </>
   );
}
