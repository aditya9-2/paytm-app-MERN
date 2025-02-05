/* eslint-disable react/prop-types */
const Input = ({ type, placeholder }) => {
  return (
    <div className="w-80">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-3xl px-4 py-2 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
      />
    </div>
  );
};

export default Input;
