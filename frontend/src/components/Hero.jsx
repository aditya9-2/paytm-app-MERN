/* eslint-disable react/prop-types */
import Button from "./Button";
const Hero = ({ Heading, paragraph, mainImage, HeroLogo, backgroundColor }) => {
  return (
    <div
      className={`w-[30rem] p-6 h-auto ${backgroundColor} shadow-2xl rounded-3xl mt-10 md:flex md:w-[60rem]`}
    >
      <div className="md:flex md:flex-col">
        <img src={HeroLogo} alt="HeaderLogo" className="w-40 " />
        <div className="">
          <h2 className="text-xl font-bold mt-5">{Heading}</h2>
          <p className="mt-3 text-justify mb-6">{paragraph}</p>

          <Button lable={"Learn More"} />
        </div>
      </div>

      <div className="mt-12 md:mx-8">
        <img src={mainImage} alt="BigPhone" />
      </div>
    </div>
  );
};

export default Hero;
