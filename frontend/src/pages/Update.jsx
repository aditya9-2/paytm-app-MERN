import { useRef, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (password && password.length <= 6) {
      setError("Password must be 6 characters long");
      setTimeout(() => setError(""), 1500);
      return;
    }

    if (firstName && firstName.length < 3) {
      setError("First name must be at least 3 characters long");
      setTimeout(() => setError(""), 1500);
      return;
    }

    if (lastName && lastName.length < 3) {
      setError("Last name must be at least 3 characters long");
      setTimeout(() => setError(""), 1500);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      //   theoretically this will removes empty fields
      const updateData = {};
      if (firstName.length >= 3) updateData.firstName = firstName;
      if (lastName.length >= 3) updateData.lastName = lastName;
      if (password.length >= 6) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        toast.warning("No changes detected.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update`,

        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data) {
        toast.success("details update successfully", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      }
    } catch (err) {
      toast.error("Update failed. Please try again!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      console.log(`Error while updating user details: ${err}`);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-white to-[#66c3ff]/45  h-[calc(100vh-6rem)] overflow-hidden flex justify-center items-center">
        <div className="w-96 bg-white p-8 rounded-2xl shadow-xl border border-gray-300">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Update Details
          </h2>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              ref={firstNameRef}
              placeholder="Enter new first name"
            />
            <Input
              type="text"
              ref={lastNameRef}
              placeholder="Enter new last name"
            />
            <Input
              type="password"
              ref={passwordRef}
              placeholder="Enter new password"
            />
            {error && (
              <p className="text-center text-red-500 text-sm">{error}</p>
            )}
          </div>
          <button
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Update;
