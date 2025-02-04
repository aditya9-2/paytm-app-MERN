/* eslint-disable react/prop-types */
const MiniCard = ({ image, lable }) => {
  return (
    <div className="p-2  hover:shadow-xl hover:rounded-3xl transition-all duration-200 ease-in-out text-center hover:border-gray-200 hover:cursor-pointer">
      <img src={image} alt="cardImage" />
      {lable}
    </div>
  );
};

export default MiniCard;
