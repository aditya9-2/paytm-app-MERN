/* eslint-disable react/prop-types */
import { useState } from "react";
import { nameSlicer } from "../helper/NameSlice";

const Profilebox = ({ lable }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-10 h-10 border-[1px] border-white bg-blue-900 rounded-full text-white hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center text-center font-semibold text-3xl">
        {nameSlicer(lable)}
      </div>

      {isHovered && (
        <div className="absolute right-2 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
          <ul className="flex flex-col text-black font-semibold">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Pay to a Friend
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer  text-red-400">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profilebox;
