/* eslint-disable react/prop-types */
import Input from "../components/Input";
import { GrClose } from "react-icons/gr";

const Signin = ({ toggleSignup, onClose }) => {
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
            <Input type="text" placeholder="Enter your username" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <Input type="password" placeholder="Enter your password" />
          </div>
        </div>

        <button
          className="mt-5 w-[20rem] bg-blue-500 text-white py-2 rounded-3xl 
        hover:bg-blue-600 transition-all duration-300 font-semibold hover:opacity-75 hover:curpo"
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
    </div>
  );
};

export default Signin;
