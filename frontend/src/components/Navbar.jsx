import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);

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
            <img
              src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo_new.svg"
              alt="paytmLogo"
              width={169}
            />
          </span>
        </div>

        {/* ?desktop navigation */}
        <div className="hidden md:flex">
          <ul className="flex gap-3 items-center">
            <li>
              <a className="hover:text-gray-600" href="#">
                Ticket Booking
              </a>
            </li>
            <li>
              <a className="hover:text-gray-600" href="#">
                Reacherg & Bills
              </a>
            </li>
            <li>
              <a className="hover:text-gray-600" href="#">
                Payments & Services
              </a>
            </li>
            <li>
              <a className="hover:text-gray-600" href="#">
                Paytm for Business
              </a>
            </li>
            <li>
              <a className="hover:text-gray-600" href="#">
                Company
              </a>
            </li>
          </ul>
        </div>

        <div className="w-10 h-10 border border-black bg-gray-300 rounded-full"></div>
      </div>

      {/* Hamburger logic */}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white transform transition-transform duration-300 ease-in-out mt-5 ${
          openHamburger ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-6 p-5">
          <li>
            <a className="hover:text-gray-600" href="#">
              Ticket Booking
            </a>
          </li>
          <li>
            <a className="hover:text-gray-600" href="#">
              Reacherg & Bills
            </a>
          </li>
          <li>
            <a className="hover:text-gray-600" href="#">
              Payments & Services
            </a>
          </li>
          <li>
            <a className="hover:text-gray-600" href="#">
              Paytm for Business
            </a>
          </li>
          <li>
            <a className="hover:text-gray-600" href="#">
              Company
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
