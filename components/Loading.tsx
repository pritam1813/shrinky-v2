import React from "react";
import Image from "next/image";
import MainSpinner from "../public/LoadingPageSpinner.svg";

const LoadingUI = () => {
  return (
    <Image
      src={MainSpinner}
      alt="Main Loading Screen Image"
      className="w-[24px] h-[24px]"
    />
  );
};

export default LoadingUI;
