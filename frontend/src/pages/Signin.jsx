/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Input from "../components/Input";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ toggleSignup, onClose }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      setError("Please enter your username");
      setTimeout(() => setError(""), 1500);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setTimeout(() => setError(""), 1500);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/signin`,
        {
          username,
          password,
        }
      );

      const data = response.data;
      const token = data.token;

      if (data && token) {
        localStorage.setItem("token", token);

        toast.success("Signin successfull", {
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
          onClose();
          navigate("/dashboard");
        }, 1600);
      }
    } catch (error) {
      toast.error("Signin failed. Please try again!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      console.log("Unexpected error occured while signin", error.message);
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
          Sign In
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              ref={usernameRef}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 mt-3">{error}</p>
        )}

        <button
          className="mt-5 w-[20rem] bg-blue-500 text-white py-2 rounded-3xl 
        hover:bg-blue-600 transition-all duration-300 font-semibold hover:opacity-75 hover:cursor-pointer"
          onClick={handleSignin}
        >
          Sign In
        </button>

        <p className="text-sm text-gray-500 text-center mt-3">
          Don&apos;t have an account?{" "}
          <button
            onClick={toggleSignup}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
