import { AlignLeft, X } from "lucide-react";
import { ModeToggle } from "../mode/ModeToggle";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Login from "../auth/Login";
import { Show } from "@clerk/astro/react";
import Dashboard from "../auth/Dashboard";

const Header = () => {
    const [isClicked, setIsClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);

    const toggleNavClick = ()=>{
        setIsClicked(!isClicked);
    }
    useEffect(() => {
      const handleScroll = () => {
        const scroll = window.scrollY;
        if (scroll > 100) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    const getTextColor =()=>{
      return scrolling ? "text-foreground" : "text-white";
    }
  return (
    <header
      className={` ${scrolling ? "bg-background animate-in duration-500" : "animate-out duration-500"} fixed top-0 z-500 w-full ${getTextColor()}`}
    >
      <div className="relative container flex items-center justify-between py-5">
        {/**Logo */}
        <a
          href="/"
          className={` ${
            isClicked ? "text-foreground" : ""
          } text-200 font-800 z-10 inline-block`}
        >
          <span className="text-primary">StayLite</span>
          Hotel
        </a>
        {/**Navbar */}
        <Navbar isClicked={isClicked} toggleNavClick={toggleNavClick} />
        <div className="flex items-center gap-4 justify-start ">
          <Login />
          <Show when="signed-in">
            <Dashboard />
          </Show>
          {/**Mode Toggle */}
          <ModeToggle />
          {/**Menu Buttons */}
          <div className="inline-block md:hidden" onClick={toggleNavClick}>
            {isClicked ? (
              <X
                name="close menu"
                size={26}
                className="translate-y-1 md:translate-y-0 cursor-pointer"
              />
            ) : (
              <AlignLeft
                name="open menu"
                size={26}
                className="translate-y-1 md:translate-y-0 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );

}
export default Header
