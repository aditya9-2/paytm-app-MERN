import MiniCard from "./MiniCard";
import phone from "../../assets/phone.png";
import DTH from "../../assets/dth.png";
import car from "../../assets/car.png";
import viewAll from "../../assets/viewAll.png";

const Card = () => {
  return (
    <div className="bg-white w-[30rem] md:min-w-auto h-64 rounded-2xl mt-20 shadow-2xl border border-gray-100">
      <h2 className="text-xl font-bold p-4">Recharges</h2>
      <div className="flex justify-center items-center gap-4 p-4">
        <MiniCard image={phone} lable={"Mobile Recharge"} />
        <MiniCard image={DTH} lable={"DTH Reacherge"} />
        <MiniCard image={car} lable={"FasTag Reacherge"} />
        <MiniCard image={viewAll} lable={"View All Products"} />
      </div>
    </div>
  );
};

export default Card;
