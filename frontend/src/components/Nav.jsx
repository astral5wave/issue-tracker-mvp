import { NavLink } from "react-router-dom";
import React from "react";
import { Menu, X } from "lucide-react";

const NavLinks = () => {
  return (
    <div className="flex flex-col md:flex-row gap-20">
      <NavLink to="section1">Link 1</NavLink>
      <NavLink to="section2">Link 2</NavLink>
      <NavLink to="section1">Link 3</NavLink>
    </div>
  );
};
const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="w-1/3 flex justify-end">
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center basis-full ">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
