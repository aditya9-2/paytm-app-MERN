import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sucessIcon from "../assets/sucess.png";

export default function Success() {
  const [counter, setCounter] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      navigate("/dashboard");
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter, navigate]);

  return (
    <div className="min-h-[calc(100vh_-_6rem)] bg-green-400 flex justify-center items-center">
      <div className="w-96 bg-white rounded-2xl border border-gray-200 shadow-2xl p-8 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Successful
        </h1>

        <div className="relative w-32 h-32">
          <img
            src={sucessIcon}
            alt="Success"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-2 font-semibold text-xl">
            Redirecting in
          </p>
          <span className="text-4xl font-bold text-green-500">{counter}</span>
        </div>
      </div>
    </div>
  );
}
