import { ScrambleText } from "./ScrambleText";

const LINKS = ['HOME', 'ABOUT', 'PROJECTS', 'LETS LINK'];

export default function Header() {
   return (
      <div className="fixed top-0 inset-x-0 mix-blend-difference px-10">
         <div className="flex justify-between py-10">
            <h3 className="flex flex-1/2 font-semibold">GIBRAN MAULANA</h3>
            <div className="flex flex-1/2 justify-between">
               {LINKS.map((x, i) => (
                  <ScrambleText key={i} className="font-space text-tertiary hover:cursor-pointer" text={x} />
               ))}
            </div>
         </div>
      </div>
   )
}