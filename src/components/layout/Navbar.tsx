import {navigation} from '@/lib/navigation'
import { useEffect, useState } from 'react';
interface NavbarProps {
    isClicked: boolean;
    toggleNavClick: () => void;
}
const Navbar = ({ isClicked, toggleNavClick }: NavbarProps) => {
    const [active, setActive] = useState("");
    useEffect(()=>{
        setActive(window.location.pathname);
    },[])
    const handleNavClick =(href:string)=>{
        setActive(href);
        toggleNavClick();
    }
  return (
    <>
      {/**Mobile Navgiation */}
      <nav
        className={` ${isClicked ? "translate-x-0" : " translate-x-[-190.25rem]"} fixed top-0 left-0 flex h-screen w-full items-center justify-start translate-all duration-500 lg:hidden`}
      >
        <ul className="border-muted bg-background h-full w-[70%] border-r pt-36 pl-4">
          {navigation.map(({ name, href }) => (
            <li key={name} className="text-200 font-500 mb-4 capitalize">
              <a
                href={href}
                className={`${active === href ? "text-primary" : ""} hover:text-primary text-foreground transition-colors duration-300`}
                onClick={() => handleNavClick(href)}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/**Desktop Navigation */}
      <nav className="hidden lg:inline-block">
        <ul className="md:flex md:gap-6 capitalize">
          {navigation.map(({ name, href }) => (
            <li key={name} className="text-100 font-500 mb-4 capitalize">
              <a
                href={href}
                className={`${active === href ? "bg-primary rounded-md px-2 py-1 text-white" : ""}  transition-colors duration-300`}
                onClick={() => setActive(href)}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
