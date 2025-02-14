/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { GrClose } from "react-icons/gr";

const PinModal = ({ onClose, onSubmit }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow single-digit numbers
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");
    if (enteredPin.length === 4) {
      onSubmit(enteredPin);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/[.40] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem] relative">
        <button
          className="absolute top-3 right-3 text-black hover:bg-gray-200 p-2 hover:rounded-full transition-all"
          onClick={onClose}
        >
          <GrClose size={20} />
        </button>
        <h1 className="text-xl font-semibold mb-4 text-center">
          Enter your PIN
        </h1>
        <div className="flex justify-center gap-3 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="password"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PinModal;
