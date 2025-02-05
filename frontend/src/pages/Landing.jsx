import Card from "../components/Card";

import phone from "../assets/phone.png";
import DTH from "../assets/dth.png";
import car from "../assets/car.png";
import viewAll from "../assets/viewAll.png";

import credit from "../assets/card.png";
import bill from "../assets/bill.png";
import router from "../assets/router.png";

const Landing = () => {
  const rechargeItems = [
    { image: phone, label: "Mobile Recharge" },
    { image: DTH, label: "DTH Recharge" },
    { image: car, label: "FasTag Recharge" },
    { image: viewAll, label: "View All Products" },
  ];

  const travelItems = [
    { image: credit, label: "Credit Card Payment" },
    { image: bill, label: "Electricity Bill" },
    { image: router, label: "Broadband Bill" },
    { image: viewAll, label: "View All Products" },
  ];
  return (
    <div className="h-screen w-full bg-blue-50 flex justify-center p-4">
      <div className="flex flex-col md:flex-row md:gap-6">
        <Card title={"Recharges"} items={rechargeItems} />
        <Card title={"Bill Payments"} items={travelItems} />
      </div>
    </div>
  );
};

export default Landing;
