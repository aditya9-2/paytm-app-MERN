import { forwardRef } from "react";

/* eslint-disable react/prop-types */
const Input = forwardRef(({ type, placeholder }, ref) => {
  return (
    <div className="w-80">
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-3xl px-4 py-2 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
