/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button";
import { GrClose } from "react-icons/gr";

const dummyUsers = [
  "Amit Sharma",
  "Rahul Gupta",
  "Sneha Verma",
  "Vikas Singh",
  "Neha Patel",
  "Sourav Roy",
  "Priya Das",
  "Rohan Mehta",
  "Ananya Bose",
  "Kunal Mukherjee",
  "Meera Kapoor",
  "Sanjay Nair",
  "Tina D'Souza",
  "Varun Malhotra",
  "Ishita Ghosh",
];

const PaymentModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  //   const filteredUsers = dummyUsers.filter((user) =>
  //     user.toLowerCase().includes(selectedUser.toLowerCase())
  //   );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter users only when the input is not empty
    if (value.trim() !== "") {
      setFilteredUsers(
        dummyUsers.filter((user) =>
          user.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm(user); // Set selected user to the input field
    setFilteredUsers([]); // Hide the list after selection
  };

  const handlePayment = () => {
    if (selectedUser) {
      alert(`Payment sent to ${selectedUser}`);
      onClose();
    } else {
      setErrorMessage("Please select a user first!");
      setTimeout(() => setErrorMessage(""), 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/[.40] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem] relative">
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
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 mb-2 rounded-md border border-gray-300 bg-gray-100 outline-0 shadow-sm text-black"
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        {/* {selectedUser && filteredUsers.length > 0 && (
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
            {filteredUsers.map((user, index) => (
              <p
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded transition"
                onClick={() => setSelectedUser(user)}
              >
                {user}
              </p>
            ))}
          </div>
        )} */}

        {filteredUsers.length > 0 && (
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
            {filteredUsers.map((user, index) => (
              <p
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded transition"
                onClick={() => handleSelectUser(user)} // Handle name click
              >
                {user}
              </p>
            ))}
          </div>
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
