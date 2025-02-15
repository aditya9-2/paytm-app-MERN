/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "./Button";

import axiosInstance from "../utils/axiosInstance";

const WalletCard = ({ onPayClick, balance }) => {
  const [username, setUsername] = useState("");

  const userData = async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    setUsername(data.user.firstName);
  };
  useEffect(() => {
    userData();
  }, []);
  return (
    <div className="w-[30rem] md:w-full h-64 md:mx-8 rounded-2xl bg-slate-50 relative top-[-8rem] shadow-xl border border-gray-500 p-5">
      <div className="font-bold text-2xl mx-2">
        Hi, <span className="text-cyan-500">{username}</span>
      </div>
      <div className="mt-6">
        <div className="flex gap-3">
          <img
            src="https://pwebassets.paytm.com/frontendcommonweb/static/4cbfc6c4..svg"
            alt="Wallet image"
          />
          <p className="font-semibold text-sm uppercase">Total Balance</p>
        </div>
        <span className="mx-14 absolute top-12 font-bold flex gap-1 items-center text-xl mt-12">
          <span className="text-cyan-500 font-bold">₹</span>{" "}
          {balance ?? "Loading..."}
        </span>
      </div>

      <div className="absolute right-0 mx-5 top-19">
        <Button lable={"Initiate Payment"} onclick={onPayClick} />
      </div>
      <div className="w-full bg-gray-300 h-[1px] mt-8 rounded-2xl"></div>
      <p className="text-gray-400 absolute bottom-0 mb-3 left-35 md:left-[39rem] text-sm">
        &#169; Powered By lakshmi cheat fund!
      </p>
    </div>
  );
};

export default WalletCard;
