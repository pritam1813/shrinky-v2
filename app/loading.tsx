import Image from "next/image";
import React from "react";
import MainSpinner from "../public/LoadingPageSpinner.svg";

const LodingUI = () => {
  return (
    <div className="w-full h-screen flex justify-center align-middle">
      <Image
        src={MainSpinner}
        alt="Main Loading Screen Image"
        className="w-[24px] h-[24px]"
      />
    </div>
  );
};

export default LodingUI;
