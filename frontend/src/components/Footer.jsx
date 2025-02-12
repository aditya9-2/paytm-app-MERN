import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full bg-cyan-500 h-24  overflow-hidden">
      <div className="text-white md:text-xl text-center py-5">
        {" "}
        &copy; All RIghts Reserved - 2025 | Made By{" "}
        <span className="font-semibold font-script text-2xl text-pink-500">
          Aditya
        </span>
        <div className="flex justify-center items-center mx-8 gap-3 text-2xl mt-3">
          <a
            href="https://x.com/aadityaa027"
            target="_blank"
            className=" hover:text-blue-900 hover:cursor-pointer"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/aadityabasak20/"
            target="_blank"
            className=" hover:text-blue-900 hover:cursor-pointer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
