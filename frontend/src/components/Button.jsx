/* eslint-disable react/prop-types */
const Button = ({ lable, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="px-4 py-2 bg-blue-950 text-white rounded-md hover:cursor-pointer hover:opacity-90 hover:scale-103 transition-all duration-100 ease-in-out"
    >
      {lable}
    </button>
  );
};

export default Button;
