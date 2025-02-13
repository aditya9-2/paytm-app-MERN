/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../Button";
import { GrClose } from "react-icons/gr";
import axios from "axios";

const PaymentModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      fetchUsers(debouncedSearchTerm);
    } else {
      setFilteredUsers([]);
    }
  }, [debouncedSearchTerm]);

  const fetchUsers = async (value) => {
    try {
      const token = localStorage.getItem("token");

      const encodedSearch = encodeURIComponent(value.trim());

      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filteredUser=${encodedSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.users) {
        setFilteredUsers(response.data.users);
      } else {
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setFilteredUsers([]);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm(`${user.firstName} ${user.lastName}`); // This will selected user to the input field
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-2 rounded-md border border-gray-300 bg-gray-100 outline-0 shadow-sm text-black"
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        {filteredUsers.length > 0 && (
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
            {filteredUsers.map((user) => (
              <p
                key={user._id}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded transition"
                onClick={() => handleSelectUser(user)} // Handle name click
              >
                {user.firstName} {user.lastName}
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
