/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
// import Button from "./Button";
import Profilebox from "./Profilebox";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);

  const menuItems = [
    { name: "Ticket Booking", hasDropdown: true },
    { name: "Recharge & Bills", hasDropdown: true },
    { name: "Payments & Services", hasDropdown: true },
    { name: "Paytm for Business", hasDropdown: true },
    { name: "Company", hasDropdown: true },
  ];

  const NavItem = ({ name, hasDropdown }) => (
    <li className="flex justify-between items-center gap-3">
      <a className="hover:text-gray-600" href="#">
        {name}
      </a>
      {hasDropdown && <IoIosArrowDown />}
    </li>
  );

  const toggleHamburger = () => {
    setOpenHamburger(!openHamburger);
  };

  return (
    <>
      <div className="h-16 w-full p-5 flex md:justify-around justify-between items-center bg-white shadow shadow-gray-200 fixed top-0 z-10">
        <div className="flex items-center justify-center gap-6">
          <button className="text-3xl hover:cursor-pointer md:hidden w-5">
            {openHamburger ? (
              <span className="text-2xl">
                <GrClose onClick={toggleHamburger} />
              </span>
            ) : (
              <RxHamburgerMenu onClick={toggleHamburger} />
            )}
          </button>

          <span className="hover:cursor-pointer">
            <a href="/">
              <img
                src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo_new.svg"
                alt="paytmLogo"
                width={169}
              />
            </a>
          </span>
        </div>

        {/* ?desktop navigation */}
        <div className="hidden md:flex">
          <ul className="flex gap-3 items-center">
            {menuItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </ul>
        </div>

        {/* <Button lable={"Signup"} /> */}
        <Profilebox lable={"Aditya"} />
      </div>

      {/* Hamburger logic */}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white transform transition-transform duration-300 ease-in-out mt-5 ${
          openHamburger ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-6 p-5 mt-15">
          {menuItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
