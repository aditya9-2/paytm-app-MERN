import { useState } from "react";
import Navbar from "../components/Navbar";
import WalletCard from "../components/WalletCard";
import PaymentModal from "../components/modal/PaymentModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-[15rem] bg-blue-950 "></div>
      <div className="flex justify-center items-center relative z-0">
        <WalletCard onPayClick={toggleModal} />
      </div>

      {isModalOpen && <PaymentModal onClose={toggleModal} />}
    </>
  );
};

export default Dashboard;
