/* eslint-disable react/prop-types */
import Input from "../components/Input";
import { GrClose } from "react-icons/gr";

const Signup = ({ toggleSignin, onClose }) => {
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
            <Input type="text" placeholder="Enter your username" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">First Name</label>
            <Input type="email" placeholder="Enter your first name" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Last Name</label>
            <Input type="email" placeholder="Enter your last name" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <Input type="password" placeholder="Enter your password" />
          </div>
        </div>

        <button
          className="mt-5 w-full bg-blue-500 text-white py-2 rounded-3xl 
        hover:bg-blue-600 transition-all duration-300 font-semibold hover:opacity-75 hover:curpo"
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
    </div>
  );
};

export default Signup;
