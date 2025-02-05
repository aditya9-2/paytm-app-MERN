import Card from "../components/Card";

import phone from "../assets/phone.png";
import DTH from "../assets/dth.png";
import car from "../assets/car.png";
import viewAll from "../assets/viewAll.png";
import credit from "../assets/card.png";
import bill from "../assets/bill.png";
import router from "../assets/router.png";
import Hero from "../components/Hero";
import bigPhone from "../assets/bigPhone.png";
import secondHero from "../assets/hero2.png";
import headerLogo from "../assets/triangle.png";
import paytmLogo from "../assets/paytm.png";
import Footer from "../components/Footer";

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
    <>
      <div className="w-full bg-blue-50 flex flex-col justify-center items-center p-4">
        <div className="flex flex-col md:flex-row md:gap-6">
          <Card title={"Recharges"} items={rechargeItems} />
          <Card title={"Bill Payments"} items={travelItems} />
        </div>
        <div>
          <Hero
            backgroundColor={"bg-white"}
            HeroLogo={headerLogo}
            Heading={"Build Long-term Wealth & Achieve your Goals."}
            paragraph={
              "Investing on Paytm Money is transparent, low-cost and commission-free. Buy stocks & mutual funds that can help you create wealth & realise your dreams."
            }
            mainImage={bigPhone}
          />

          <Hero
            backgroundColor={"bg-gray-100"}
            HeroLogo={paytmLogo}
            Heading={"Pay anyone directly from your bank account."}
            paragraph={
              "Pay anyone, everywhere. Make contactless & secure payments in-stores or online using Paytm UPI or Directly from your Bank Account. Plus, send & receive money from anyone."
            }
            mainImage={secondHero}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
