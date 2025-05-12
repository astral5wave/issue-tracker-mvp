import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
const Header = ({member}) => {
  return (
    <header className="bg-dark-background sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500  h-14">
      <Logo />
      <Nav member={member}/>
    </header>
  );
};

export default Header;
