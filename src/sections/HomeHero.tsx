import { motion } from "motion/react";

export default function HomeHero() {
   return (
      <section className="min-h-screen flex items-center">
         <div className="min-w-[50%]">
            
            <div className="overflow-hidden py-1">

               <motion.h1
                  initial= {{ y: "100%",  display: '0%'}}
                  animate={{ y: 0, display: "100%"}}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3 ,1]}}
                  className="text-7xl font-bold"
               >
                  Design driven. Logic backed. <span className="text-tertiary">User</span> focused.
               </motion.h1>
            </div>
         </div>
      </section>
   );
}
   