import { motion } from 'framer-motion';
import { ScrambleText } from './ScrambleText';
interface PreloaderProps {
   isPageLoaded: number;
}

const preloader = {
   hidden : {
      display: "none",
      opacity: 0,
   },

   visible : {
      display: 'flex',
      opacity: 1,
   }
}

export default function Preloader({isPageLoaded}: PreloaderProps) {
   
   return (

      <motion.div 
         className="absolute inset-0 font-space text-accent flex justify-center items-center"
         variants={preloader}
         initial="hidden"
         animate={isPageLoaded === 2  ? "visible" : "hidden"}
         >
         <ScrambleText className="text-tertiary font-space" autoStart={true} text={"wait a sec..."} />
      </motion.div>
   )
}