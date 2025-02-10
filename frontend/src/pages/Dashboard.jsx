import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WalletCard from "../components/WalletCard";
import PaymentModal from "../components/modal/PaymentModal";
import axios from "axios";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/v1/account/balance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (!data) {
          console.log(`user not found`);
          return;
        }

        setBalance(data.balance.toFixed(2));
      } catch (error) {
        console.log(`Error while fetching balance: ${error.message}`);
      }
    };
    fetchBalance();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-[15rem] bg-blue-950 "></div>
      <div className="flex justify-center items-center relative z-0">
        <WalletCard onPayClick={toggleModal} balance={balance} />
      </div>

      {isModalOpen && <PaymentModal onClose={toggleModal} />}
    </>
  );
};

export default Dashboard;
