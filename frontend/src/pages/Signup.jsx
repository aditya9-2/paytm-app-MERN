/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Input from "../components/Input";
import { GrClose } from "react-icons/gr";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = ({ toggleSignin, onClose }) => {
  const [error, setError] = useState(null);
  const userNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const pinRef = useRef(null);

  const handleSignup = async () => {
    const username = userNameRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const password = passwordRef.current.value;
    const pin = pinRef.current.value;

    try {
      if (!username) {
        setError("Please enter a username");
        setTimeout(() => setError(null), 1500);
        return;
      }

      if (!firstName) {
        setError("Please enter your first name");
        setTimeout(() => setError(null), 1500);
        return;
      }

      if (!lastName) {
        setError("Please enter your last name");
        setTimeout(() => setError(null), 1500);
        return;
      }

      if (!password) {
        setError("Please enter a password");
        setTimeout(() => setError(null), 1500);
        return;
      }

      if (!pin) {
        setError("Please enter a Pin");
        setTimeout(() => setError(null), 1500);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        {
          username,
          firstName,
          lastName,
          password,
          pin,
        }
      );

      const data = response.data;

      if (data) {
        toast.success("Signup successfull", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          toggleSignin(); // swith to signin
        }, 1500);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      console.log("Unexpected error", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/[.40] z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
        <button
          className="absolute top-3 right-3 text-black hover:bg-gray-200 p-2 hover:rounded-full transition-all duration-500 ease-in-out hover:cursor-pointer"
          onClick={onClose}
        >
          <GrClose size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Sign Up
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Username</label>
            <Input
              ref={userNameRef}
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">First Name</label>
            <Input
              ref={firstNameRef}
              type="text"
              placeholder="Enter your first name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Last Name</label>
            <Input
              ref={lastNameRef}
              type="text"
              placeholder="Enter your last name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              Pin for transaction
            </label>
            <Input ref={pinRef} type="password" placeholder="Enter your Pin" />
          </div>
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 mt-3">{error}</p>
        )}

        <button
          className="mt-5 w-[20rem] bg-blue-500 text-white py-2 rounded-3xl 
        hover:bg-blue-600 transition-all duration-300 font-semibold hover:opacity-75 hover:cursor-pointer"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-500 text-center mt-3">
          Already have an account?{" "}
          <button
            onClick={toggleSignin}
            className="text-blue-500 cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
