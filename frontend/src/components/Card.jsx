/* eslint-disable react/prop-types */
import MiniCard from "./MiniCard";

const Card = ({ title, items }) => {
  return (
    <div className="bg-white w-[30rem] md:min-w-auto h-64 rounded-2xl mt-20 shadow-2xl border border-gray-100">
      <h2 className="text-xl font-bold p-4">{title}</h2>
      <div className="flex justify-center items-center gap-4 p-4">
        {items.map((item, index) => (
          <MiniCard key={index} image={item.image} lable={item.label} />
        ))}
      </div>
    </div>
  );
};

export default Card;
