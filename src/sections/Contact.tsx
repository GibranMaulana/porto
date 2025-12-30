import { ScrambleText } from "@/components/ScrambleText"
import { motion, number } from "framer-motion"
import CommandLineMail from "@/components/CommandLineMail"
import ScanlineOverlay from "@/components/ScanlineOverlay"

interface linkData {
   id: string  
   name: string,
   link: string
}

const CONTACT : linkData[] = [
   {
      id: "linkedIn",
      name: 'LINKEDIN',
      link: 'https://www.linkedin.com/in/gibran-maulana-azmi'
   },
   {
      id: "email",
      name: 'EMAIL',
      link: "mailto:narbiganaluam@gmail.com"
   },
   {
      id: "whatsapp",
      name: 'WHATSAPP',
      link: 'https://wa.me/6281385927668'
   },
   
]

const SOSMED : linkData[] = [
   {
      id: "1",
      name: "INSTAGRAM",
      link: 'https://instagram.com/gbrn_zm'
      
   },
   {
      id: "2",
      name: "X / TWITTER",
      link: "https://x.com/azmi_nkm"
   },
   {
      id:"3",
      name: "GITHUB",
      link: 'https://github.com/GibranMaulana'
   }
]

const INSPIRATION: linkData[] = [
   {
      id: '1',
      name: "DARKROOM.ENGINEER",
      link: "https://darkroom.engineering/" 
   }
]

const TECHSTACK: linkData[] = [
   {
      id: '1',
      name: "FRAMER_MOTION",
      link: "https://motion.dev/"
   },
   {
      id: '2',
      name: "GSAP",
      link: "https://gsap.com/"
   },
   {
      id: '3',
      name: "NEXTJS",
      link: "https://nextjs.org/"
   },
   {
      id: '4',
      name: "LARAVEL",
      link: "https://laravel.com/"
   },
   {
      id: '5',
      name: "REACT",
      link: "https://react.dev/"
   }
]

export default function Contact() {
   return (
      <section className="z-0 sticky inset-0 scroll-mt-[-200dvh]" id="contact">
         <div className="flex flex-col min-h-screen">
            <div className="flex-1/2 flex flex-col sm:flex-row px-2">
               <div className="flex items-center justify-center flex-1/3 px-4">
                  <p className="font-inset-0space text-tertiary uppercase">whats on your mind, make it true</p>
               </div>
               <div className="flex flex-2/3 flex-col justify-evenly text-xs sm:text-base gap-3">
                  <div className=" flex flex1/2 flex-col justify-ends">
                     <CommandLineMail />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12 justify-center">
                     <div className="flex flex-col gap-5 sm:gap-10">
                        <p className="">CONTACT</p>
                        <div className="flex flex-col gap-2">
                        {(
                           CONTACT.map((x) => (
                              <a key={x.id} href={x.link} className="w-fit text-tertiary font-space hover:text-accent" target="_blank" rel="noopener noreferrer">
                                 <ScrambleText text={x.name} /> 
                              </a>
                           ))
                        )}
                        </div>
                     </div>
                     <div className="flex flex-col gap-5 sm:gap-10">
                        <p className="">SOCIAL MEDIA</p>
                        <div className="flex flex-col gap-2">
                        {(
                           SOSMED.map((x) => (
                              <a key={x.id} href={x.link} className="w-fit text-tertiary font-space hover:text-accent" target="_blank" rel="noopener noreferrer">
                                 <ScrambleText text={x.name} /> 
                              </a>
                           ))
                        )}
                        </div>
                     </div>
                     <div className="flex flex-col gap-5 sm:gap-10">
                        <p className="">INSPIRATION</p>
                        <div className="flex flex-col gap-2">
                        {(
                           INSPIRATION.map((x) => (
                              <a key={x.id} href={x.link} className="w-fit text-tertiary font-space hover:text-accent" target="_blank" rel="noopener noreferrer">
                                 <ScrambleText text={x.name} /> 
                              </a>
                           ))
                        )}
                        </div>
                     </div>
                     <div className="flex flex-col gap-5 sm:gap-10">
                        <p className="">TECH STACK</p>
                        <div className="flex flex-col gap-2">
                        {(
                           TECHSTACK.map((x) => (
                              <a key={x.id} href={x.link} className="w-fit text-tertiary font-space hover:text-accent" target="_blank" rel="noopener noreferrer">
                                 <ScrambleText text={x.name} /> 
                              </a>
                           ))
                        )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="relative flex-1/2 flex flex-row justify-center items-center bg-tertiary">
               <ScanlineOverlay />
               <ScrambleText className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[12rem] font-space z-0 " text="MAKE_IT_HAPPEN" /> 
            </div>
         </div>
      </section>
   )
}