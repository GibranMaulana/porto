"use client"
import { useState, useEffect } from "react"

export default function useIsScrolling(delay = 150) {
   
   const [isScrolling, setIsScrolling] = useState(false);

   useEffect(() => {
      let timeout: NodeJS.Timeout;

      const handleScroll = () => {
         setIsScrolling(true);
         clearTimeout(timeout);

         timeout = setTimeout(() => {
            setIsScrolling(false)
         }, delay);
      }

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
         clearTimeout(timeout);
      }
   }, [delay])

   return isScrolling;
}