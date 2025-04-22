import React from "react";
import PamkinLogo from "./../../assets/Photobee.png";
import { useNavigate } from "react-router-dom";

interface Props {}

const Main = (props: Props) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/selection");
  };

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-5 overflow-auto">
        <img src={PamkinLogo} className="h-50 w-50 -mt-20" />

        <button
          type="button"
          className="cursor-pointer bg-yellow-600 rounded-lg min-w-50 
                     text-xl border-1 border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold"
          onClick={() => handleStart()}
        >
          GET STARTED
        </button>
      </div>
    </>
  );
};

export default Main;
