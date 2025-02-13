/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../Button";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedUser && debouncedSearchTerm.trim() !== "") {
      fetchUsers(debouncedSearchTerm);
    } else {
      setFilteredUsers([]);
      setErrorMessage("");
    }
  }, [debouncedSearchTerm, selectedUser]);

  const fetchUsers = async (val) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const token = localStorage.getItem("token");
      const encodedSearch = encodeURIComponent(val.trim());

      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filteredUser=${encodedSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.users && response.data.users.length > 0) {
        setFilteredUsers(response.data.users);
      } else {
        setErrorMessage("Please select a valid user");
        setTimeout(() => setErrorMessage(""), 1500);
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setFilteredUsers([]);
      setErrorMessage("Please select a valid user");
      setTimeout(() => setErrorMessage(""), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm(`${user.firstName} ${user.lastName}`);
    setFilteredUsers([]);
    setErrorMessage("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSelectedUser(null);
      return;
    }

    if (
      selectedUser &&
      value !== `${selectedUser.firstName} ${selectedUser.lastName}`
    ) {
      setSelectedUser(null);
    }
  };

  const handlePayment = async () => {
    if (!selectedUser) {
      setErrorMessage("Please Select valid User first!");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (amount <= 0) {
      setErrorMessage("Please enter a valid amount!");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const to = selectedUser._id;

      const response = await axios.post(
        `http://localhost:3000/api/v1/account/transfer`,
        {
          amount,
          to,
        },
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      if (!response.data) {
        setErrorMessage("unable to transaction, please try again later");
        setTimeout(() => setErrorMessage(""), 2000);
        return;
      }

      navigate("/success");
    } catch (err) {
      console.log(`Error during transaction: ${err.message}`);
      setErrorMessage("Server Error");
      setTimeout(() => setErrorMessage(""), 2000);
    }

    // console.log(
    //   `processing payment for: ${JSON.stringify(selectedUser)} id: ${
    //     selectedUser._id
    //   } amount: ${amount}`
    // );
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
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search user here"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 mb-2 rounded-md border border-gray-300 bg-gray-100 outline-0 shadow-sm text-black"
          />
          {isLoading && (
            <div className="absolute right-3 top-3 text-gray-500 text-sm">
              Loading...
            </div>
          )}
        </div>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-2 rounded-md border border-gray-300 bg-gray-100 outline-0 shadow-sm text-black"
        />

        {errorMessage && (
          <p className="text-red-500 text-center text-sm mb-2">
            {errorMessage}
          </p>
        )}

        {filteredUsers.length > 0 && (
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
            {filteredUsers.map((user) => (
              <p
                key={user._id}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded transition"
                onClick={() => handleSelectUser(user)}
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
