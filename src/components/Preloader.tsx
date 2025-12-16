import { motion } from 'framer-motion';
interface PreloaderProps {
   isPageLoaded: boolean;
}

const preloader = {
   hidden : {
      opacity: 0,
      transition: {
         duration: 3
      }
      
   },

   visible : {
      opacity: 1,
   }
}

export default function Preloader({isPageLoaded}: PreloaderProps) {
   
   return (

      <motion.div 
         className="font-space text-accent"
         variants={preloader}
         initial="visible"
         animate={isPageLoaded ? "hidden" : "visible"}
         >
         Preparing
      </motion.div>
   )
}