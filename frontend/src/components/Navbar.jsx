/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import Button from "./Button";
import { IoIosArrowDown } from "react-icons/io";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Profilebox from "./Profilebox";

import { useRecoilState } from "recoil";
import authState from "../store/authState";

import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useRecoilState(authState);

  const menuItems = [
    { name: "Ticket Booking", hasDropdown: true },
    { name: "Recharge & Bills", hasDropdown: true },
    { name: "Payments & Services", hasDropdown: true },
    { name: "Paytm for Business", hasDropdown: true },
    { name: "Company", hasDropdown: true },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(`Error while fetching user: ${error.message}`);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  const toggleModal = () => {
    setShowModal(true);
    setIsSignup(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleSignupSignin = () => {
    setIsSignup(!isSignup);
  };

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
      <div className="h-16 w-full p-5 flex md:justify-around justify-between items-center bg-white shadow shadow-gray-200 fixed top-0 z-40">
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
        {/* User data condition */}
        {user ? (
          <Profilebox lable={user.firstName} />
        ) : (
          <Button lable="Signin" onclick={toggleModal} />
        )}
      </div>

      {/* Hamburger logic */}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white transform transition-transform duration-300 ease-in-out mt-5 z-20 ${
          openHamburger ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-6 p-5 mt-15">
          {menuItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/[.40] z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-black hover:bg-gray-200 p-2 hover:rounded-full transition-all duration-500 ease-in-out hover:cursor-pointer"
              onClick={closeModal}
            >
              <GrClose size={20} />
            </button>

            {isSignup ? (
              <Signup toggleSignin={toggleSignupSignin} onClose={closeModal} />
            ) : (
              <Signin toggleSignup={toggleSignupSignin} onClose={closeModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
