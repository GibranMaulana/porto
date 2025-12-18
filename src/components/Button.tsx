import { ReactNode } from "react";
import { ScrambleText } from "./ScrambleText";

interface ButtonProps {
   href: string,
   className?: string;
   text: string; 
   icon?: ReactNode;
}

export default function Button({text="button", className, href, icon}: ButtonProps) {
   return (
      <a 
         className={`${className} hover:cursor-pointer`}
         href={href}
         
      >
         <ScrambleText text={text} className="px-4 py-2" />
         {icon && (
            <span>
               {icon}
            </span>
         )}
      </a>
   )
}