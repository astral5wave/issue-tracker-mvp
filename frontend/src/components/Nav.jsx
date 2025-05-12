import { NavLink } from "react-router-dom";
import React from "react";
import { Menu, X } from "lucide-react";
import { getInitials } from "../utils/getInitials";
import { useNavigate } from "react-router-dom";

// const NavLinks = () => {
//   return (
//     <div className="flex px-20 gap-20">
//       <NavLink to="section1">Link 1</NavLink>
//       <NavLink to="section2">Link 2</NavLink>
//       <NavLink to="section1">Link 3</NavLink>
//     </div>
//   );
// };
// const Nav = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <>
//       <nav className="w-1/3 flex justify-end">
//         <div className="hidden w-full justify-between md:flex">
//           <NavLinks />
//         </div>
//         <div className="md:hidden">
//           <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
//         </div>
//       </nav>
//       {isOpen && (
//         <div className="flex flex-col items-center basis-full ">
//           <NavLinks />
//         </div>
//       )}
//     </>
//   );
// };

// export default Nav;


const Nav = ({member}) => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className=" flex items-center justify-between h-full will-change-contents gap-4 px-4">
      <div className="h-[45px] w-[45px] rounded-full flex items-center justify-center text-2xl font-bold bg-blue-700  border-white border-2">
        {getInitials(member?member.name:"")}
      </div>
      <button type="button"
      className="cursor-pointer underline underline-offset-2 font-bold"
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Nav