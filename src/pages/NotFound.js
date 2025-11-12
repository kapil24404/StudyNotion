import React from "react";
import CTAbutton from "../components/core/homePage/CTAbutton";

const NotFound = () => {
  return (
    <div className=" mt-14 text-white w-full h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-4xl w-full sm:w-[300px] text-blue-300 font-semibold">
          <span className=" text-caribbeangreen-100">Congratulations</span>,
          you've found the 404 page!
        </h1>
        <CTAbutton active={true} linkto="/">
          Go to Home page
        </CTAbutton>
      </div>
    </div>
  );
};

export default NotFound;
