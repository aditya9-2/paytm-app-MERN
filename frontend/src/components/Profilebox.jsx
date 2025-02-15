/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { nameSlicer } from "../helper/nameSlice";
import { useNavigate } from "react-router-dom";

const Profilebox = ({ lable }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="w-10 h-10 border-[1px] border-white bg-blue-900 rounded-full text-white hover:cursor-pointer flex justify-center items-center text-center font-semibold text-3xl">
        {nameSlicer(lable)}
      </div>

      {isHovered && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
          <ul className="flex flex-col text-black font-semibold">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/update")}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Pay your friend
            </li>

            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-400"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profilebox;
