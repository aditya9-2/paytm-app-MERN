/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button";
import { GrClose } from "react-icons/gr";

const PaymentModal = ({ onClose }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = () => {
    if (selectedUser) {
      alert(`Payment sent to ${selectedUser}`);
      onClose();
    } else {
      setErrorMessage("Please select a user first!");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/[.40] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-black hover:bg-gray-200 p-2 hover:rounded-full transition-all duration-500 ease-in-out hover:cursor-pointer"
          onClick={onClose}
        >
          <GrClose size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Send Payment</h2>

        <input
          type="text"
          placeholder="Search user here"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-3 mb-2 rounded-md border border-gray-300 bg-gray-100 outline-0 shadow-sm text-black"
        />

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button lable={"Cancel"} onclick={onClose} />
          <Button lable={"Pay"} onclick={handlePayment} />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
